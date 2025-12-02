"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit2, AlertCircle, Trash2 } from "lucide-react"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "Richard Davis",
    email: "richard.davis@app.com",
    password: "••••••••",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Perfil</h1>
        <p className="text-muted-foreground mt-1">Gerencie as informações da sua conta</p>
      </div>

      <Card className="p-8 bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
              RD
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{formData.name}</h2>
              <p className="text-muted-foreground">{formData.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="gap-2">
            <Edit2 size={18} />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </Card>

      <Card className="p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Informações da Conta</h3>
          <p className="text-muted-foreground mb-6">
            {isEditing ? "Update your account details below." : "View and manage your account information."}
          </p>
        </div>

        {isEditing ? (
          <form className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-foreground font-medium">
                Nome Completo
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 border-input"
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
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Salvar Mudanças</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
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
            <div>
              <p className="text-sm font-medium text-muted-foreground">Senha</p>
              <p className="text-foreground font-medium mt-1">{formData.password}</p>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-8 border-destructive/50 bg-destructive/5">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-destructive mb-2">Excluir Conta</h3>
            <p className="text-destructive/80 mb-4">
              Esta ação é permanente e resultará na perda de todos os seus dados.
            </p>
            <Button variant="destructive" className="gap-2">
              <Trash2 size={18} />
              DELETAR CONTA
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
