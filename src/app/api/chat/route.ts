import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are the AI Consultant for Aditya Labs, a premium digital agency. The agency provides SaaS Development, AI Solutions, and Product Engineering. The founder is Aditya Kumar. Be professional, elite, and technical yet approachable. Encourage the user to book a call for a deep dive into their product idea.`

interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages } = body as { messages?: ChatMessage[] }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required and must not be empty" },
        { status: 400 }
      )
    }

    // Validate message format
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return NextResponse.json(
          { error: "Each message must have 'role' and 'content' fields" },
          { status: 400 }
        )
      }
    }

    try {
      const ZAI = (await import("z-ai-web-dev-sdk")).default
      const zAi = await ZAI.create()

      const response = await zAi.chat.completions.create({
        model: "default",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      })

      const assistantMessage =
        response.choices?.[0]?.message?.content ||
        "I'd love to help you with your project. Could you tell me more about what you're building?"

      return NextResponse.json({
        message: assistantMessage,
        source: "AI",
      })
    } catch (sdkError) {
      console.error("AI SDK error, using fallback:", sdkError)

      // Graceful fallback with a helpful response
      const lastUserMessage = messages[messages.length - 1]?.content || ""
      const fallbackMessage = generateFallbackResponse(lastUserMessage)

      return NextResponse.json({
        message: fallbackMessage,
        source: "FALLBACK",
      })
    }
  } catch (error) {
    console.error("Error in chat endpoint:", error)
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    )
  }
}

function generateFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (
    lowerMessage.includes("saas") ||
    lowerMessage.includes("software") ||
    lowerMessage.includes("platform")
  ) {
    return "At Aditya Labs, we specialize in building scalable SaaS platforms from the ground up. From multi-tenant architecture to subscription billing, we've got you covered. I'd recommend booking a call with our founder Aditya Kumar to dive deep into your SaaS vision and map out a technical roadmap tailored to your needs."
  }

  if (
    lowerMessage.includes("ai") ||
    lowerMessage.includes("machine learning") ||
    lowerMessage.includes("ml") ||
    lowerMessage.includes("intelligence")
  ) {
    return "AI Solutions are at the core of what we do at Aditya Labs. Whether you need custom LLM integrations, computer vision systems, or intelligent automation — our team delivers production-grade AI that drives real business outcomes. Let's schedule a call to explore how AI can transform your product."
  }

  if (
    lowerMessage.includes("product") ||
    lowerMessage.includes("mvp") ||
    lowerMessage.includes("startup") ||
    lowerMessage.includes("build")
  ) {
    return "Product Engineering is our sweet spot at Aditya Labs. We help founders and enterprises go from concept to launch with speed and precision. Our founder Aditya Kumar would love to discuss your product idea in detail — book a call for a deep dive into your vision and we'll craft a plan to bring it to life."
  }

  if (
    lowerMessage.includes("price") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("budget")
  ) {
    return "Our pricing at Aditya Labs is tailored to each project's scope and complexity. We offer flexible engagement models — from fixed-scope builds to retainer partnerships. The best way to get an accurate estimate is to book a call with our team so we can understand your requirements in depth."
  }

  return "Thanks for reaching out to Aditya Labs! We're a premium digital agency specializing in SaaS Development, AI Solutions, and Product Engineering. Our founder Aditya Kumar and the team are passionate about turning bold ideas into exceptional products. I'd encourage you to book a call with us for a deep dive into your product idea — we'd love to explore how we can help bring your vision to life."
}
