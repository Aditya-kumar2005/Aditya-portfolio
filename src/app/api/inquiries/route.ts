import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { createMemoryInquiry } from "@/lib/inquiry-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, service, message } = body

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "All fields are required: name, email, service, message" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    try {
      const inquiry = await db.inquiry.create({
        data: {
          name: String(name).trim(),
          email: String(email).trim().toLowerCase(),
          service: String(service).trim(),
          message: String(message).trim(),
        },
      })

      return NextResponse.json(
        { ...inquiry, _source: "DATABASE" },
        { status: 201 }
      )
    } catch (dbError) {
      console.error("Database error, falling back to memory:", dbError)

      // Fallback to in-memory store
      const inquiry = createMemoryInquiry({
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        service: String(service).trim(),
        message: String(message).trim(),
      })

      return NextResponse.json(inquiry, { status: 201 })
    }
  } catch (error) {
    console.error("Error creating inquiry:", error)
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({
      inquiries: inquiries.map((i) => ({ ...i, _source: "DATABASE" })),
      total: inquiries.length,
      source: "DATABASE",
    })
  } catch (dbError) {
    console.error("Database error:", dbError)

    // Fallback to in-memory store
    const { getMemoryInquiries } = await import("@/lib/inquiry-store")
    const inquiries = getMemoryInquiries()

    return NextResponse.json({
      inquiries,
      total: inquiries.length,
      source: "MEMORY",
    })
  }
}
