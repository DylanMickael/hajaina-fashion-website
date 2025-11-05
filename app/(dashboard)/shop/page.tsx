"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Leaf, RotateCcw, Eye, Edit2, Trash2 } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

interface Product {
  id: string
  name: string
  category: "vetement" | "recyclable" | "accessoire" | "chaussure"
  price: number
  image: string
  status: "active" | "draft"
  sales: number
  environmentalScore: number
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Robe Malagasy Upcycled",
    category: "recyclable",
    price: 89,
    image: "/malagasy-dress-recycled.jpg",
    status: "active",
    sales: 12,
    environmentalScore: 92,
  },
  {
    id: "2",
    name: "Chemise Linen Éthique",
    category: "vetement",
    price: 65,
    image: "/ethical-linen-shirt.jpg",
    status: "active",
    sales: 8,
    environmentalScore: 85,
  },
  {
    id: "3",
    name: "Sac Tissé Recyclé",
    category: "accessoire",
    price: 45,
    image: "/woven-recycled-bag.jpg",
    status: "draft",
    sales: 0,
    environmentalScore: 88,
  },
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case "recyclable":
      return "bg-green-100 text-green-800"
    case "vetement":
      return "bg-blue-100 text-blue-800"
    case "accessoire":
      return "bg-purple-100 text-purple-800"
    case "chaussure":
      return "bg-amber-100 text-amber-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    vetement: "Vêtement",
    recyclable: "Recyclable",
    accessoire: "Accessoire",
    chaussure: "Chaussure",
  }
  return labels[category] || category
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)

  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.sales, 0)
  const activeProducts = products.filter((p) => p.status === "active").length
  const draftProducts = products.filter((p) => p.status === "draft").length

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">Ma Boutique</h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Partagez vos créations éthiques et durables. Vendez des vêtements, accessoires et même des articles
              recyclables.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <p className="text-gray-600 font-light text-sm mb-2">Produits Actifs</p>
                <p className="text-4xl font-extralight serif-font">{activeProducts}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <p className="text-gray-600 font-light text-sm mb-2">Brouillons</p>
                <p className="text-4xl font-extralight serif-font">{draftProducts}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <p className="text-gray-600 font-light text-sm mb-2">Ventes Totales</p>
                <p className="text-4xl font-extralight serif-font">{products.reduce((sum, p) => sum + p.sales, 0)}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <p className="text-gray-600 font-light text-sm mb-2">Chiffre d'Affaires</p>
                <p className="text-4xl font-extralight serif-font">{totalRevenue.toLocaleString()}€</p>
              </CardContent>
            </Card>
          </div>

          {/* Highlight: Recycled Items */}
          <Card className="mb-12 border-2 border-green-200 bg-gradient-to-r from-green-50 to-transparent">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-xl font-light serif-font mb-2">Mode Recyclable & Durable</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Chez Haj'Aina, nous valorisons les créateurs qui œuvrent pour une mode durable. Vous pouvez vendre
                    des articles recyclés, upcyclés ou fabriqués à partir de matériaux éco-responsables. Ces produits
                    bénéficient d'une meilleure visibilité et d'une badge spécial pour attirer les consommateurs
                    conscients.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Product Button */}
          <div className="mb-12">
            <Link href="/shop/create">
              <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Ajouter un Produit
              </Button>
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="border-0 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.category === "recyclable" && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
                      <Leaf className="h-3 w-3" />
                      Recyclable
                    </div>
                  )}
                  {product.status === "draft" && (
                    <div className="absolute top-3 left-3 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Brouillon
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-light serif-font flex-1">{product.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(product.category)}`}
                    >
                      {getCategoryLabel(product.category)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500 font-light">Prix</p>
                      <p className="text-lg font-light serif-font">{product.price}€</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-light">Ventes</p>
                      <p className="text-lg font-light serif-font">{product.sales}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-600 font-light">Score Environnemental</p>
                      <p className="text-sm font-semibold text-green-600">{product.environmentalScore}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${product.environmentalScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/shop/${product.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 hover:border-black font-light text-xs bg-transparent"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Détails
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-300 hover:border-black font-light text-xs bg-transparent"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Éditer
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-300 hover:border-red-500 text-red-600 font-light text-xs bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
