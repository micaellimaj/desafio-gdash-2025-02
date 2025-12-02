"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Panel - Branding */}
        <div className="hidden md:flex flex-col items-center justify-center bg-primary rounded-2xl p-12 text-primary-foreground min-h-[500px]">
          <div className="text-6xl mb-6">🌦️</div>
          <h1 className="text-4xl font-bold mb-2 text-center">ClimateBrain</h1>
          <div className="text-xl opacity-90 flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span>Informações meteorológicas de IA</span>
          </div>
          <p className="mt-6 text-center text-sm opacity-80">
            Previsão meteorológica avançada com tecnologia de inteligência artificial.
          </p>
        </div>

        <Card className="p-8 md:p-12 shadow-lg">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Crie Sua Conta</h2>
            <p className="text-muted-foreground">Preencha seus dados para começar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-foreground font-medium">
                Seu nome
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 border-input"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground font-medium">
                Seu e-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 border-input"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground font-medium">
                Sua senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 border-input"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12"
            >
              {isLoading ? "Registrando..." : "REGISTRAR AGORA"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/sign-in" className="text-primary font-semibold hover:underline">
                IR PARA O LOGIN
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
