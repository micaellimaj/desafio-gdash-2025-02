"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader } from "lucide-react"

interface Pokemon {
  name: string
  url: string
}

interface ApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export default function ExplorePage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 12

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true)
        const offset = (currentPage - 1) * itemsPerPage
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`)
        const data: ApiResponse = await response.json()
        setPokemon(data.results)
        setTotalCount(data.count)
      } catch (error) {
        console.error("Error fetching Pokemon:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [currentPage])

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  const getPokemonId = (url: string) => {
    const parts = url.split("/")
    return parts[parts.length - 2]
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Explore Pokémon</h1>
        <p className="text-muted-foreground">Discover and learn about different Pokémon from the Pokédex</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pokemon.map((poke) => {
              const pokemonId = getPokemonId(poke.url)
              const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/pokemon/other/official-artwork/${pokemonId}.png`

              return (
                <Link key={poke.name} href={`/explore/${pokemonId}`}>
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-primary overflow-hidden h-full">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt={poke.name}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                      <h3 className="font-semibold text-foreground capitalize mb-1">{poke.name}</h3>
                      <p className="text-sm text-muted-foreground">#{pokemonId}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4 mt-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentPage === 1}>
                <ChevronLeft size={18} />
                Previous
              </Button>
              <div className="px-4 py-2 text-sm font-medium text-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
                Next
                <ChevronRight size={18} />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">Total: {totalCount} Pokémon</div>
          </div>
        </>
      )}
    </div>
  )
}
