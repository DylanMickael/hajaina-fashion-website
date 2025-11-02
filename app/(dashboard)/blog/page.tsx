"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, User, ArrowRight, Search } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer" 
import articles from "@/data/articles.json";

export default function MagazinePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const categories = ["all", "Tradition", "Durabilité", "Portrait", "Tendances", "Société", "Matériaux"]
  const filteredArticles =
    selectedCategory === "all" ? articles : articles.filter((article) => article.category === selectedCategory)
  const featuredArticle = articles.find((article) => article.featured)
  const regularArticles = articles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">Mon blog</h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Gérer votre blog.
            </p>
          </div>
        </div>
      </section>
      {/* Search and Filters */}
      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un article..."
                  className="pl-10 border-gray-300 focus:border-black font-light"
                />
              </div>
            </div>
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
                  {category === "all" ? "Tous" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {regularArticles.map((article) => (
                <Card
                  key={article.id}
                  className="group cursor-pointer border-0 shadow-none hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white"
                >
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-8">
                      <Badge variant="outline" className="mb-4 text-xs tracking-[0.15em] font-light uppercase">
                        {article.category}
                      </Badge>
                      <h3 className="text-xl font-light mb-3 serif-font tracking-wide leading-tight">{article.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <span className="font-light">{article.author}</span>
                          <span className="font-light">{article.date}</span>
                        </div>
                        <span className="font-light">{article.readTime}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="tracking-[0.1em] font-light uppercase text-xs bg-transparent"
                      >
                        Lire Plus
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Articles Grid */}

      <Footer /> {/* Added Footer */}
    </div>
  )
}
