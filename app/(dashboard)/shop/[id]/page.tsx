"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Leaf, Droplet, Zap, Wind, ShoppingCart } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

interface EnvironmentalMetric {
  name: string
  score: number
  icon: React.ReactNode
  description: string
}

const mockProduct = {
  id: "1",
  name: "Robe Malagasy Upcycled",
  category: "recyclable",
  price: 89,
  image: "/malagasy-dress-recycled-detail.jpg",
  description:
    "Une magnifique robe traditionnelle malgache confectionnée à partir de tissus recyclés et upcyclés. Chaque pièce est unique et raconte l'histoire de la durabilité et de l'artisanat malgache.",
  material: "Coton recyclé, lin biologique",
  madein: "Madagascar",
  artisan: "Ravenna - Créatrice éthique",
  stock: 3,
  sales: 12,
  environmentalMetrics: [
    {
      name: "Durabilité des Matériaux",
      score: 92,
      icon: <Leaf className="h-6 w-6" />,
      description: "Utilisation de matériaux recyclés et biologiques de haute qualité",
    },
    {
      name: "Consommation d'Eau",
      score: 88,
      icon: <Droplet className="h-6 w-6" />,
      description: "Réduit de 85% par rapport à la production textile standard",
    },
    {
      name: "Empreinte Carbone",
      score: 85,
      icon: <Zap className="h-6 w-6" />,
      description: "Production locale minimisant le transport international",
    },
    {
      name: "Conditions de Travail",
      score: 95,
      icon: <Wind className="h-6 w-6" />,
      description: "Fabrication artisanale équitable avec rémunération juste",
    },
  ],
  overallScore: 90,
  story:
    "Cette collection célèbre le patrimoine textile malgache tout en embrassant les principes de durabilité. Chaque vêtement est créé en partenariat avec des artisans locaux qui utilisent des techniques traditionnelles combinées à des matériaux innovants et durables. En achetant cette pièce, vous soutenez directement les communautés créatives malgaches et contribuez à une mode plus responsable.",
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-light text-sm">Retour à la boutique</span>
          </Link>

          {/* Product Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Image */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-96">
              <img
                src={mockProduct.image || "/placeholder.svg"}
                alt={mockProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Leaf className="h-3 w-3" />
                  Recyclable
                </span>
              </div>

              <h1 className="text-5xl font-extralight serif-font mb-4">{mockProduct.name}</h1>

              <p className="text-gray-600 font-light leading-relaxed mb-8">{mockProduct.description}</p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-gray-500 font-light text-sm mb-1">Matière</p>
                  <p className="text-lg font-light">{mockProduct.material}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-light text-sm mb-1">Fabriqué en</p>
                  <p className="text-lg font-light">{mockProduct.madein}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-light text-sm mb-1">Créatrice</p>
                  <p className="text-lg font-light">{mockProduct.artisan}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-light text-sm mb-1">Stock Disponible</p>
                  <p className="text-lg font-light">{mockProduct.stock} pièces</p>
                </div>
              </div>

              {/* Price & Cart */}
              <div className="mb-8">
                <p className="text-5xl font-extralight serif-font mb-6">{mockProduct.price}€</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-light"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      −
                    </button>
                    <span className="px-6 py-2 border-l border-r border-gray-300 font-light">{quantity}</span>
                    <button
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-light"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    className={`flex-1 font-light tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all ${
                      addedToCart ? "bg-green-600 hover:bg-green-600" : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {addedToCart ? "Ajouté au panier" : "Ajouter au Panier"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <Card className="mb-16 border-0 shadow-sm bg-gradient-to-r from-green-50 to-transparent">
            <CardContent className="p-8">
              <h3 className="text-2xl font-light serif-font mb-4">L'Histoire de cette Pièce</h3>
              <p className="text-gray-600 font-light leading-relaxed text-lg">{mockProduct.story}</p>
            </CardContent>
          </Card>

          {/* Environmental Impact Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-extralight serif-font mb-4">Impact Environnemental</h2>
            <div className="w-32 h-px bg-black mb-12" />

            {/* Overall Score */}
            <Card className="mb-12 border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <p className="text-5xl font-extralight text-white serif-font">{mockProduct.overallScore}</p>
                    </div>
                    <p className="text-sm text-gray-600 font-light mt-3">Score Global</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-light serif-font mb-3">Engagement Durable</h3>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Ce produit représente un excellent choix pour les consommateurs éco-conscients. Il combine des
                      matériaux durables, des pratiques de fabrication équitables et un minimum d'impact
                      environnemental.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              {mockProduct.environmentalMetrics.map((metric, idx) => (
                <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                        {metric.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-light serif-font mb-1">{metric.name}</h4>
                        <p className="text-3xl font-extralight serif-font text-green-600">{metric.score}%</p>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light text-sm leading-relaxed">{metric.description}</p>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${metric.score}%` }} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Related Products (Placeholder) */}
          <div className="mb-16">
            <h2 className="text-4xl font-extralight serif-font mb-4">Produits Similaires</h2>
            <div className="w-32 h-px bg-black mb-12" />
            <p className="text-gray-600 font-light">Autres créations durables de la créatrice...</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
