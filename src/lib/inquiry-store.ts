// In-memory fallback store for inquiries when database is unavailable

export interface MemoryInquiry {
  id: string
  name: string
  email: string
  service: string
  message: string
  status: "PENDING" | "REVIEWED" | "REPLIED" | "ARCHIVED"
  createdAt: string
  updatedAt: string
  _source: "MEMORY"
}

const memoryStore: MemoryInquiry[] = []

let idCounter = 0

export function createMemoryInquiry(data: {
  name: string
  email: string
  service: string
  message: string
}): MemoryInquiry {
  const now = new Date().toISOString()
  const inquiry: MemoryInquiry = {
    id: `mem_${++idCounter}_${Date.now()}`,
    name: data.name,
    email: data.email,
    service: data.service,
    message: data.message,
    status: "PENDING",
    createdAt: now,
    updatedAt: now,
    _source: "MEMORY",
  }
  memoryStore.unshift(inquiry)
  return inquiry
}

export function getMemoryInquiries(): MemoryInquiry[] {
  return [...memoryStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function updateMemoryInquiry(
  id: string,
  status: "PENDING" | "REVIEWED" | "REPLIED" | "ARCHIVED"
): MemoryInquiry | null {
  const inquiry = memoryStore.find((i) => i.id === id)
  if (!inquiry) return null
  inquiry.status = status
  inquiry.updatedAt = new Date().toISOString()
  return inquiry
}

export function getMemoryStats() {
  const totalInquiries = memoryStore.length
  const statusCounts = {
    PENDING: memoryStore.filter((i) => i.status === "PENDING").length,
    REVIEWED: memoryStore.filter((i) => i.status === "REVIEWED").length,
    REPLIED: memoryStore.filter((i) => i.status === "REPLIED").length,
    ARCHIVED: memoryStore.filter((i) => i.status === "ARCHIVED").length,
  }
  return { totalInquiries, statusCounts, source: "MEMORY" as const }
}
