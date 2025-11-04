"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"

export default function ExhibitionsPage() {
  const [exhibitions, setExhibitions] = useState([
    {
      id: 1,
      title: "Heritage Moderne",
      designer: "Miora Rasoanaivo",
      image: "/img/Collection1.jpg",
      views: 1243,
      likes: 342,
      status: "live",
      createdAt: "2024-11-01",
    },
    {
      id: 2,
      title: "Eco-Luxe Series",
      designer: "Hery Andriantsoa",
      image: "/img/Collection2.jpg",
      views: 892,
      likes: 256,
      status: "draft",
      createdAt: "2024-11-02",
    },
    {
      id: 3,
      title: "Urban Malagasy",
      designer: "Lalaina Rakoto",
      image: "/img/Collection3.jpg",
      views: 1567,
      likes: 421,
      status: "live",
      createdAt: "2024-10-28",
    },
  ])

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      {/* Header */}
        <Header />
        {/* Hero Section */}
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">Expositions en ligne</h1>
                    <div className="w-32 h-px bg-black mx-auto mb-8" />
                    <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
                        Gérez et présentez vos expositions 3D de mode Haj'Aina. Créez, modifiez et partagez vos collections avec le monde entier.
                    </p>
                </div>
            </div>
        </section>

      {/* Exhibitions Grid */}
      <div className="container mx-auto px-6 py-16">
        {exhibitions.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-2xl font-light tracking-wide mb-4">Aucune exposition</h3>
            <p className="text-gray-600 font-light mb-8">Commencez par créer votre première exposition 3D</p>
            <Link href="/expositions/create">
              <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-wide">
                Créer une Exposition
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {exhibitions.map((exhibition) => (
              <Link key={exhibition.id} href={`/expositions/${exhibition.id}`}>
                <Card className="group cursor-pointer border-0 shadow-none hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <Image
                        src={exhibition.image || "/placeholder.svg"}
                        alt={exhibition.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant={exhibition.status === "live" ? "default" : "outline"}
                          className={`font-light tracking-wide ${
                            exhibition.status === "live" ? "bg-black text-white" : "bg-white text-black"
                          }`}
                        >
                          {exhibition.status === "live" ? "● En direct" : "Brouillon"}
                        </Badge>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-light tracking-wide serif-font mb-2">{exhibition.title}</h3>
                      <p className="text-sm text-gray-600 font-light tracking-wide mb-4">{exhibition.designer}</p>

                      {/* Stats */}
                      <div className="flex items-center gap-6 mb-6 text-sm font-light tracking-wide">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-gray-500" />
                          <span>{exhibition.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-gray-500" />
                          <span>{exhibition.likes}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 font-light tracking-wide bg-transparent"
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                        >
                          Modifier
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-black text-white hover:bg-gray-800 font-light tracking-wide"
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                        >
                          Voir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
