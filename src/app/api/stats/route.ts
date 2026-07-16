import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const totalInquiries = await prisma.inquiry.count()

    const newCount = await prisma.inquiry.count({ where: { status: 'new' } })
    const reviewedCount = await prisma.inquiry.count({ where: { status: 'reviewed' } })
    const repliedCount = await prisma.inquiry.count({ where: { status: 'replied' } })
    const archivedCount = await prisma.inquiry.count({ where: { status: 'archived' } })

    return NextResponse.json({
      totalInquiries,
      statusCounts: {
        new: newCount,
        reviewed: reviewedCount,
        replied: repliedCount,
        archived: archivedCount,
      },
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
