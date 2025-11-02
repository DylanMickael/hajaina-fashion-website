"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Grid, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import collections from "@/data/collections.json";

export default function CollectionsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const categories = ["all", "Couture", "Durable", "Streetwear", "Fusion", "Avant-garde"]
  const filteredCollections =
    selectedCategory === "all"
      ? collections
      : collections.filter((collection) => collection.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">Ma boutique</h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
                Gérer votre propre boutique en ligne.
            </p>
          </div>
        </div>
      </section>
      {/* Filters and View Controls */}
      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs tracking-[0.1em] font-light uppercase ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-transparent border-gray-300 hover:border-black"
                  }`}
                >
                  {category === "all" ? "Toutes" : category}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-light">
                {filteredCollections.length} collection{filteredCollections.length > 1 ? "s" : ""}
              </span>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="p-2"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Collections Grid/List */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredCollections.map((collection) => (
                <Card
                  key={collection.id}
                  className="group cursor-pointer border-0 shadow-none hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <Link href={`/collections/${collection.id}`}>
                      <div className="relative h-96 overflow-hidden">
                        <Image
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <Badge className="mb-2 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                            {collection.pieces} pièces
                          </Badge>
                        </div>
                      </div>
                    </Link>
                    <div className="p-8">
                      <Badge variant="outline" className="mb-4 text-xs tracking-[0.15em] font-light uppercase">
                        {collection.category}
                      </Badge>
                      <h3 className="text-2xl font-light mb-2 serif-font tracking-wide">{collection.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 tracking-wide font-light">Par {collection.designer}</p>
                      <p className="text-gray-700 text-sm leading-relaxed font-light mb-4">{collection.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-light">{collection.price}</span>
                        <Link href={`/collections/${collection.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="tracking-[0.1em] font-light uppercase bg-transparent"
                          >
                            Découvrir
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {filteredCollections.map((collection) => (
                <Card
                  key={collection.id}
                  className="group cursor-pointer border-0 shadow-none hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-8">
                      <Link href={`/collections/${collection.id}`} className="relative h-64 overflow-hidden rounded-lg">
                        <Image
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <div className="md:col-span-2 p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge variant="outline" className="text-xs tracking-[0.15em] font-light uppercase">
                            {collection.category}
                          </Badge>
                          <span className="text-sm text-gray-500 font-light">{collection.pieces} pièces</span>
                        </div>
                        <h3 className="text-3xl font-light mb-3 serif-font tracking-wide">{collection.title}</h3>
                        <p className="text-gray-600 mb-4 tracking-wide font-light">Par {collection.designer}</p>
                        <p className="text-gray-700 leading-relaxed font-light mb-6">{collection.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-light">{collection.price}</span>
                          <Link href={`/collections/${collection.id}`}>
                            <Button variant="outline" className="tracking-[0.1em] font-light uppercase bg-transparent">
                              Découvrir la Collection
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer /> {/* Added Footer */}
    </div>
  )
}
