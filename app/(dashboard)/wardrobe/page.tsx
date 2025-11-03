"use client"

import { useState } from "react"
import { Plus, Calendar, Sparkles } from "lucide-react"
import WardrobeUpload from "@/components/wardrobe/wardrobe-upload"
import WardrobeGallery from "@/components/wardrobe/wardrobe-gallery"
import OutfitPlanner from "@/components/wardrobe/outfit-planner"
import AIAnalysis from "@/components/wardrobe/ai-analysis"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function WardrobePage() {
  const [activeTab, setActiveTab] = useState<"upload" | "gallery" | "planner" | "analysis">("gallery")
  const [wardrobeItems, setWardrobeItems] = useState([
    {
      id: "1",
      name: "Linen Dress",
      category: "Dresses",
      color: "Cream",
      images: ["/placeholder.svg?height=400&width=300&text=Cream+Linen+Dress"],
      uploadDate: "2024-11-03",
      timesWorn: 5,
      favorited: true,
    },
    {
      id: "2",
      name: "Black Blazer",
      category: "Jackets",
      color: "Black",
      images: ["/placeholder.svg?height=400&width=300&text=Black+Blazer"],
      uploadDate: "2024-10-28",
      timesWorn: 12,
      favorited: true,
    },
    {
      id: "3",
      name: "White Shirt",
      category: "Tops",
      color: "White",
      images: ["/placeholder.svg?height=400&width=300&text=White+Shirt"],
      uploadDate: "2024-10-15",
      timesWorn: 18,
      favorited: false,
    },
  ])

  return (
    <div className="min-h-screen pt-20">
      <Header />
      {/* Hero Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">Ma garde-robe</h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Gérez votre garde-robe, mettez des vêtements réspectant la mode éthique et durable.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex gap-4 my-6 md:ml-10 flex-wrap">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-3 tracking-[0.1em] uppercase text-sm font-light transition-all ${
                activeTab === "gallery"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Galerie
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-6 py-3 tracking-[0.1em] uppercase text-sm font-light transition-all flex items-center gap-2 ${
                activeTab === "upload"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Plus className="h-4 w-4" /> Ajouter
            </button>
            <button
              onClick={() => setActiveTab("planner")}
              className={`px-6 py-3 tracking-[0.1em] uppercase text-sm font-light transition-all flex items-center gap-2 ${
                activeTab === "planner"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Calendar className="h-4 w-4" /> Planning
            </button>
            <button
              onClick={() => setActiveTab("analysis")}
              className={`px-6 py-3 tracking-[0.1em] uppercase text-sm font-light transition-all flex items-center gap-2 ${
                activeTab === "analysis"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Sparkles className="h-4 w-4" /> IA Analysis
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm">
            {activeTab === "gallery" && <WardrobeGallery items={wardrobeItems} />}
            {activeTab === "upload" && (
              <WardrobeUpload onItemsAdded={(items) => setWardrobeItems([...wardrobeItems, ...items])} />
            )}
            {activeTab === "planner" && <OutfitPlanner items={wardrobeItems} />}
            {activeTab === "analysis" && <AIAnalysis items={wardrobeItems} />}
          </div>
        </div>
      </section>
    </div>
  )
}
