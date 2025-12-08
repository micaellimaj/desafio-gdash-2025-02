"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

const API_BASE_URL = "http://localhost:4000";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // 👉 SALVA TOKEN
      localStorage.setItem("token", data.access_token);

      // 👉 SE O BACKEND ENVIAR O USER, SALVA
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Redireciona para o dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Left Panel */}
        <div className="hidden md:flex flex-col items-center justify-center bg-primary rounded-2xl p-12 text-primary-foreground min-h-96">
          <div className="text-6xl mb-6">🌦️</div>
          <h1 className="text-4xl font-bold mb-2 text-center">ClimateBrain</h1>

          <div className="text-xl opacity-90 flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span>AI Weather Insights</span>
          </div>

          <p className="mt-6 text-center text-sm opacity-80">
            Previsão meteorológica avançada com tecnologia de inteligência artificial.
          </p>
        </div>

        {/* Right Panel */}
        <Card className="p-8 md:p-12 shadow-lg">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Acessar Sua Conta</h2>
            <p className="text-muted-foreground">Insira seu e-mail e senha para continuar.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12"
            >
              {isLoading ? "Entrando..." : "ENTRAR"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/sign-up" className="text-primary font-semibold hover:underline">
                CRIAR CONTA
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
