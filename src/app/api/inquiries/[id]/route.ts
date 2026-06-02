import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { updateMemoryInquiry } from "@/lib/inquiry-store"

const VALID_STATUSES = ["PENDING", "REVIEWED", "REPLIED", "ARCHIVED"] as const

type InquiryStatus = (typeof VALID_STATUSES)[number]

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    // Validate status
    if (!status || !VALID_STATUSES.includes(status as InquiryStatus)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
        },
        { status: 400 }
      )
    }

    try {
      // Check if inquiry exists
      const existing = await db.inquiry.findUnique({ where: { id } })
      if (!existing) {
        return NextResponse.json(
          { error: "Inquiry not found" },
          { status: 404 }
        )
      }

      const updated = await db.inquiry.update({
        where: { id },
        data: { status: status as InquiryStatus },
      })

      return NextResponse.json({ ...updated, _source: "DATABASE" })
    } catch (dbError) {
      console.error("Database error, falling back to memory:", dbError)

      // Fallback to in-memory store
      const updated = updateMemoryInquiry(id, status as InquiryStatus)
      if (!updated) {
        return NextResponse.json(
          { error: "Inquiry not found" },
          { status: 404 }
        )
      }

      return NextResponse.json(updated)
    }
  } catch (error) {
    console.error("Error updating inquiry:", error)
    return NextResponse.json(
      { error: "Failed to update inquiry" },
      { status: 500 }
    )
  }
}
