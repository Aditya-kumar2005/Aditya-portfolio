const JWT_SECRET = process.env.JWT_SECRET || 'adityalabs-super-secret-key-123456789-quantum';

function base64urlEncode(str: string): string {
  // Convert string to base64 and make it URL-safe
  const base64 = btoa(str);
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64urlDecode(str: string): string {
  // Restore base64 padding and characters
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

const getSecretKey = async () => {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
};

export async function signJWT(payload: any): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(payload));
  
  const key = await getSecretKey();
  const enc = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    enc.encode(`${encodedHeader}.${encodedPayload}`)
  );
  
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureStr = String.fromCharCode(...signatureArray);
  const encodedSignature = base64urlEncode(signatureStr);
  
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

export async function verifyJWT(token: string): Promise<any | null> {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  
  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  try {
    const key = await getSecretKey();
    const enc = new TextEncoder();
    const data = enc.encode(`${encodedHeader}.${encodedPayload}`);
    
    // Decode signature
    const signatureStr = base64urlDecode(encodedSignature);
    const signatureBuffer = new Uint8Array(
      signatureStr.split('').map((c) => c.charCodeAt(0))
    ).buffer;
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer,
      data
    );
    
    if (!isValid) return null;
    
    return JSON.parse(base64urlDecode(encodedPayload));
  } catch (err) {
    return null;
  }
}
