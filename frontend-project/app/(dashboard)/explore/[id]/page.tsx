"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PokemonStat {
  name: string
  base_stat: number
}

interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  spriteUrl: string
  types: string[]
  abilities: string[]
  stats: PokemonStat[]
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-blue-400",
  psychic: "bg-pink-500",
  bug: "bg-green-600",
  rock: "bg-gray-600",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  steel: "bg-gray-400",
  fairy: "bg-pink-400",
}

export default function PokemonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (!token || !user) {
      router.push("/sign-in")
      return
    }

    const fetchPokemonDetail = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:4000/pokemon/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Falha ao buscar detalhes do Pokémon")
        }

        const data: PokemonDetail = await response.json()
        setPokemon(data)
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error)
        setError("Falha ao carregar detalhes do Pokémon. Por favor, tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonDetail()
  }, [id, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        {/* Ícone de Carregamento */}
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  if (!pokemon || error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-muted-foreground mb-4">{error || "Pokémon não encontrado"}</p>
        <Link href="/explore">
          <Button>Voltar para Explorar</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Botão Voltar */}
      <Link href="/explore">
        <Button variant="outline" size="sm">
          <ArrowLeft size={18} className="mr-2" />
          Voltar para Explorar
        </Button>
      </Link>

      {/* Cartão de Detalhes Principal */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl capitalize mb-2">{pokemon.name}</CardTitle>
              <CardDescription>ID do Pokémon: #{pokemon.id}</CardDescription>
            </div>

            <img
              src={pokemon.spriteUrl}
              alt={pokemon.name}
              className="w-40 h-40 object-contain"
            />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tipos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Classificação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Tipos</p>

              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                  <Badge key={type} className={`${typeColors[type] || "bg-gray-500"} text-white capitalize`}>
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Características Físicas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Características Físicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground">Altura</span>
              <span className="text-lg font-semibold text-foreground">{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-muted-foreground">Peso</span>
              <span className="text-lg font-semibold text-foreground">{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estatísticas Base</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground capitalize">{stat.name}</span>
                  <span className="text-sm font-semibold text-foreground">{stat.base_stat}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(stat.base_stat / 150) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}