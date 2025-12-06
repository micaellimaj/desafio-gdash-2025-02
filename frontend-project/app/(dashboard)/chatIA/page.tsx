"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export default function ChatIA() {
  const router = useRouter()
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (!token || !user) {
      router.push("/sign-in")
    }
  }, [router])

  const handleSend = async () => {
    if (!input.trim()) return

    const question = input.trim()

    // adiciona mensagem do usuário
    setMessages((prev) => [...prev, { sender: "user", text: question }])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8000/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      if (!res.ok) {
        throw new Error("Erro ao comunicar com o serviço de IA")
      }

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.answer || "A IA não retornou uma resposta." },
      ])
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "⚠️ Não foi possível obter resposta da IA. Verifique se o serviço está rodando.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Chat IA</h1>
        <p className="text-muted-foreground mt-1">
          Faça perguntas sobre o clima na cidade de Toritama
        </p>
      </div>

      <Card className="p-6 min-h-[550px] flex flex-col">
        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground mt-20">
              Comece perguntando algo como: <br />
              <span className="italic">"Qual é a temperatura agora em Toritama?"</span>
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-2xl bg-muted text-foreground rounded-bl-none max-w-[80%] text-sm opacity-70">
                IA está digitando...
              </div>
            </div>
          )}
        </div>

        {/* Área de input */}
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Digite sua pergunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
