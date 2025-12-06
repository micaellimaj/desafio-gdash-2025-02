"use client"

import type React from "react"

import { useState, Suspense, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  User,
  Bot,
  Bell,
  Search,
  Menu,
  X,
  HelpCircle,
  Zap,
  Compass,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/chatIA", label: "ChatIA", icon: Bot },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 🔥 Função de logout
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/sign-in")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-background transition-all duration-300 overflow-hidden fixed h-screen z-40 md:relative md:w-64 md:translate-x-0 flex flex-col px-4 py-6`}
      >
        {/* Logo */}
        <div className="mb-8 px-2">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-2xl">🌦️</span>
            <span className="text-foreground">ClimateBrain</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div
                  className={`p-2 rounded-md ${
                    isActive ? "bg-primary-foreground/20" : "bg-secondary/50"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Help Card */}
        <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl p-4 text-white mb-3 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle size={18} />
            <p className="font-semibold text-sm">Need help?</p>
          </div>
          <p className="text-xs mb-3 opacity-90">Check our documentation</p>
          <Button
            size="sm"
            variant="secondary"
            className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold text-xs"
          >
            Documentation
          </Button>
        </div>

        {/* Upgrade Card */}
        <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold text-sm">
          <Zap size={16} className="mr-2" />
          Upgrade to Pro
        </Button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Suspense fallback={<div>Loading...</div>}>
              <div className="hidden md:flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg flex-1 max-w-md">
                <Search size={18} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </Suspense>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            

            {/* User Menu */}
            {isMounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
                    <User size={20} /> {/* ÍCONE EM VEZ DE RD */}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
