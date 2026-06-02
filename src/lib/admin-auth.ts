/**
 * @deprecated Admin authentication is no longer used.
 * All authenticated users now have access to the platform.
 * This module is kept for backward compatibility but does nothing.
 */
import { NextResponse } from "next/server"

export function verifyAdmin(): NextResponse | null {
  // No longer enforcing admin auth - all authenticated users have access
  return null
}
