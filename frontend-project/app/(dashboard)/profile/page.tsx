"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit2, AlertCircle, Trash2 } from "lucide-react"

const API_BASE_URL = "http://localhost:4000"

interface User {
  _id: string
  name: string
  email: string
}

export default function Profile() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (!token || !storedUser) {
          router.push("/sign-in")
          return
        }

        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setFormData({
          name: parsedUser.name,
          email: parsedUser.email,
          password: "",
        })
      } catch (err) {
        setError("Failed to load user data")
      } finally {
        setIsFetching(false)
      }
    }

    fetchUser()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")

      if (!user || !token) {
        throw new Error("User not authenticated")
      }

      const updatePayload: any = {
        name: formData.name,
        email: formData.email,
      }

      // Only include password if it was changed
      if (formData.password) {
        updatePayload.password = formData.password
      }

      const response = await fetch(`${API_BASE_URL}/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatePayload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Update failed")
      }

      const updatedUser = await response.json()
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      setFormData((prev) => ({ ...prev, password: "" }))
      setSuccess("Profile updated successfully!")
      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This action cannot be undone.")) {
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")

      if (!user || !token) {
        throw new Error("User not authenticated")
      }

      const response = await fetch(`${API_BASE_URL}/users/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete account")
      }

      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/sign-in")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account information</p>
      </div>

      {/* Profile Header Card with Avatar */}
      <Card className="p-8 bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
              {formData.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{formData.name}</h2>
              <p className="text-muted-foreground">{formData.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="gap-2" disabled={isLoading}>
            <Edit2 size={18} />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </Card>

      {/* Account Information */}
      <Card className="p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Account Information</h3>
          <p className="text-muted-foreground mb-6">
            {isEditing ? "Update your account details below." : "View and manage your account information."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-foreground font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 border-input"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 border-input"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground font-medium">
                New Password (leave empty to keep current)
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 border-input"
                disabled={isLoading}
                placeholder="••••••••"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nome Completo</p>
              <p className="text-foreground font-medium mt-1">{formData.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">E-Mail</p>
              <p className="text-foreground font-medium mt-1">{formData.email}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Danger Zone - Delete Account */}
      <Card className="p-8 border-destructive/50 bg-destructive/5">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-destructive mb-2">Excluir Conta</h3>
            <p className="text-destructive/80 mb-4">
              Esta ação é permanente e resultará na perda de todos os seus dados.
            </p>
            <Button variant="destructive" className="gap-2" onClick={handleDeleteAccount} disabled={isLoading}>
              <Trash2 size={18} />
              {isLoading ? "Deletando..." : "DELETAR CONTA"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
