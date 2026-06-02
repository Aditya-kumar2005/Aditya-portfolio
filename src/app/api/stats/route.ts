import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getMemoryStats } from "@/lib/inquiry-store"

export async function GET() {
  try {
    const totalInquiries = await db.inquiry.count()

    const statusCounts = {
      PENDING: await db.inquiry.count({ where: { status: "PENDING" } }),
      REVIEWED: await db.inquiry.count({ where: { status: "REVIEWED" } }),
      REPLIED: await db.inquiry.count({ where: { status: "REPLIED" } }),
      ARCHIVED: await db.inquiry.count({ where: { status: "ARCHIVED" } }),
    }

    return NextResponse.json({
      totalInquiries,
      statusCounts,
      source: "DATABASE",
    })
  } catch (dbError) {
    console.error("Database error, falling back to memory:", dbError)

    // Fallback to in-memory store
    const stats = getMemoryStats()

    return NextResponse.json(stats)
  }
}
