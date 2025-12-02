"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  types: Array<{
    type: {
      name: string
    }
  }>
  abilities: Array<{
    ability: {
      name: string
    }
    is_hidden: boolean
  }>
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
  sprites: {
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
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

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data: PokemonDetail = await response.json()
        setPokemon(data)
      } catch (error) {
        console.error("Error fetching Pokemon detail:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonDetail()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-muted-foreground mb-4">Pokémon not found</p>
        <Link href="/explore">
          <Button>Back to Explore</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href="/explore">
        <Button variant="outline" size="sm">
          <ArrowLeft size={18} className="mr-2" />
          Back to Explore
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl capitalize mb-2">{pokemon.name}</CardTitle>
              <CardDescription>Pokémon ID: #{pokemon.id}</CardDescription>
            </div>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default || "/placeholder.svg"}
              alt={pokemon.name}
              className="w-40 h-40 object-contain"
            />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Classification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Types</p>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                  <Badge
                    key={type.type.name}
                    className={`${typeColors[type.type.name] || "bg-gray-500"} text-white capitalize`}
                  >
                    {type.type.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Abilities</p>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <Badge key={ability.ability.name} variant="outline" className="capitalize">
                    {ability.ability.name}
                    {ability.is_hidden && " (Hidden)"}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Physical Characteristics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground">Height</span>
              <span className="text-lg font-semibold text-foreground">{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground">Weight</span>
              <span className="text-lg font-semibold text-foreground">{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-muted-foreground">Base Experience</span>
              <span className="text-lg font-semibold text-foreground">{pokemon.base_experience}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Base Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground capitalize">{stat.stat.name}</span>
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
