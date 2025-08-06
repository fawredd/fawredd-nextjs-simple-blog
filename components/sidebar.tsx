"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SidebarData {
  recentPosts: Array<{
    id: number
    title: string
    slug: string
    created_at: string
  }>
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  tags: Array<{
    id: number
    name: string
    slug: string
  }>
}

export default function Sidebar() {
  const [data, setData] = useState<SidebarData>({
    recentPosts: [],
    categories: [],
    tags: [],
  })
  const [currentDate, setCurrentDate] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSidebarData() {
      try {
        const response = await fetch("/api/sidebar-data")
        if (response.ok) {
          const sidebarData = await response.json()
          setData(sidebarData)
        }
      } catch (error) {
        console.error("Error fetching sidebar data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSidebarData()
  }, [])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    const dayNames = ["D", "L", "M", "M", "J", "V", "S"]

    // Day headers
    dayNames.forEach((day, index) => {
      days.push(
        <div key={`day-header-${index}`} className="text-center text-xs font-medium text-gray-500 p-1">
          {day}
        </div>,
      )
    })

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-day-${i}`} className="p-1"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div key={`calendar-day-${day}`} className="text-center text-sm p-1 hover:bg-gray-100 cursor-pointer">
          {day}
        </div>,
      )
    }

    return days
  }

  if (loading) {
    return (
      <aside className="w-full lg:w-80 space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button size="sm" className="absolute right-1 top-1 bg-green-600 hover:bg-green-700">
              <span className="sr-only">Buscar</span>🔍
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600 text-lg">ENTRADAS RECIENTES</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ul className="space-y-3">
            {data.recentPosts.map((post) => (
              <li key={`recent-post-${post.id}`}>
                <Link href={`/blog/${post.slug}`} className="text-sm text-gray-700 hover:text-green-600 line-clamp-2">
                  {post.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{new Date(post.created_at).toLocaleDateString("es-ES")}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Tag Cloud */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600 text-lg">TAG CLOUD</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <Link
                key={`tag-${tag.id}`}
                href={`/blog/tag/${tag.slug}`}
                className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Archives */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600 text-lg">ARCHIVOS</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ul className="space-y-2">
            <li>
              <Link href="/blog/2024" className="text-sm text-gray-700 hover:text-green-600">
                JUNIO 2024
              </Link>
            </li>
            <li>
              <Link href="/blog/2023" className="text-sm text-gray-700 hover:text-green-600">
                OCTUBRE 2023
              </Link>
            </li>
            <li>
              <Link href="/blog/2023/09" className="text-sm text-gray-700 hover:text-green-600">
                SEPTIEMBRE 2023
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600 text-lg">CATEGORÍAS</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ul className="space-y-2">
            {data.categories.map((category) => (
              <li key={`category-${category.id}`}>
                <Link href={`/blog/category/${category.slug}`} className="text-sm text-gray-700 hover:text-green-600">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600 text-lg">CALENDAR</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
              </span>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
