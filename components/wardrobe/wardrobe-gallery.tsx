"use client"

import { useState } from "react"
import { Heart, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WardrobeItem {
  id: string
  name: string
  category: string
  color: string
  images: string[]
  uploadDate: string
  timesWorn: number
  favorited: boolean
}

interface WardrobeGalleryProps {
  items: WardrobeItem[]
}

export default function WardrobeGallery({ items }: WardrobeGalleryProps) {
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.favorited }), {}),
  )
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const categories = ["all", "Tops", "Bottoms", "Dresses", "Jackets", "Accessories", "Shoes", "Outerwear"]

  const filteredItems = filter === "all" ? items : items.filter((item) => item.category === filter)

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "date") return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    if (sortBy === "worn") return b.timesWorn - a.timesWorn
    if (sortBy === "favorites") return (favorites[b.id] ? 1 : 0) - (favorites[a.id] ? 1 : 0)
    return 0
  })

  const topItems = sortedItems.slice(0, 3)
  const mostWorn =
    items.length > 0 ? items.reduce((prev, current) => (prev.timesWorn > current.timesWorn ? prev : current)) : null

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => ({ ...prev, [itemId]: !prev[itemId] }))
  }

  return (
    <div className="p-12">
      {/* Highlights Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-light serif-font tracking-wide mb-8">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedItem(item.id)}
            >
              <img
                src={item.images[0] || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-light text-sm tracking-wide uppercase">{item.category}</p>
                <h3 className="text-lg font-light serif-font">{item.name}</h3>
                <p className="text-sm font-light text-gray-200">
                  {item.timesWorn} port{item.timesWorn > 1 ? "s" : ""}
                </p>
              </div>
              {/* Action buttons for highlights */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(item.id)
                  }}
                  className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <Heart className={`h-4 w-4 ${favorites[item.id] ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-stone-100 p-6 rounded-lg">
          <p className="text-gray-600 font-light text-sm mb-1">Total Pièces</p>
          <p className="text-3xl font-light">{items.length}</p>
        </div>
        <div className="bg-stone-100 p-6 rounded-lg">
          <p className="text-gray-600 font-light text-sm mb-1">Catégories</p>
          <p className="text-3xl font-light">{new Set(items.map((i) => i.category)).size}</p>
        </div>
        <div className="bg-stone-100 p-6 rounded-lg">
          <p className="text-gray-600 font-light text-sm mb-1">Pièces Préférées</p>
          <p className="text-3xl font-light">{Object.values(favorites).filter(Boolean).length}</p>
        </div>
        <div className="bg-stone-100 p-6 rounded-lg">
          <p className="text-gray-600 font-light text-sm mb-1">Le Plus Porté</p>
          <p className="text-lg font-light serif-font">{mostWorn?.name || "N/A"}</p>
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 whitespace-nowrap font-light text-sm uppercase tracking-wide rounded transition-all ${
              filter === cat ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            {cat === "all" ? "Tous" : cat}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded font-light text-sm"
        >
          <option value="date">Récent</option>
          <option value="worn">Les Plus Portés</option>
          <option value="favorites">Favoris</option>
        </select>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedItems.map((item) => (
          <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedItem(item.id)}>
            <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-100">
              <img
                src={item.images[0] || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Improved action buttons with better visibility */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(item.id)
                }}
                className="absolute top-2 right-2 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <Heart className={`h-4 w-4 ${favorites[item.id] ? "fill-red-500 text-red-500" : ""}`} />
              </button>
            </div>
            <h3 className="font-light text-sm serif-font mb-1 truncate">{item.name}</h3>
            <div className="flex gap-2 mb-2 flex-wrap">
              <Badge variant="outline" className="text-xs font-light">
                {item.color}
              </Badge>
              <Badge variant="outline" className="text-xs font-light">
                {item.timesWorn}x
              </Badge>
            </div>
            <p className="text-xs text-gray-500 font-light">
              Ajouté le {new Date(item.uploadDate).toLocaleDateString("fr-FR")}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-light text-lg">Aucun vêtement trouvé dans cette catégorie</p>
        </div>
      )}
    </div>
  )
}
