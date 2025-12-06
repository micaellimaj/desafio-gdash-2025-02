"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader } from "lucide-react"

interface Pokemon {
  name: string
  id: string
}

interface ApiResponse {
  count: number
  next: boolean | null
  previous: boolean | null
  results: Pokemon[]
}

export default function ExplorePage() {
  const router = useRouter()
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 20
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (!token || !user) {
      router.push("/sign-in")
      return
    }

    const fetchPokemon = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `http://localhost:4000/pokemon/list?page=${currentPage}&limit=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon")
        }

        const data: ApiResponse = await response.json()
        setPokemon(data.results || [])
        setTotalCount(data.count || 0)
      } catch (error) {
        console.error("Error fetching Pokemon:", error)
        setError("Failed to load Pokémon. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [currentPage, router])

  const totalPages = Math.ceil(totalCount / itemsPerPage)

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

      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <>
          {/* Pokémon Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pokemon.map((poke) => {
              const pokemonId = poke.id
              const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/pokemon/other/official-artwork/${pokemonId}.png`

              return (
                <Link key={poke.id} href={`/explore/${pokemonId}`}>
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-primary overflow-hidden h-full">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <img
                          src={imageUrl}
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

          {/* Pagination */}
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
