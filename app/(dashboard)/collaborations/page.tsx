"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  MessageCircle,
  Plus,
  Users,
  Package,
  Scissors,
  Send,
  Filter,
  Clock,
  Star,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Shirt,
  Gem,
  Wrench,
  CheckSquare,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Assistant from "@/components/Assistant"
import collaborationData from "@/data/collaboration-data.json"
import Link from "next/link"

export default function CollaborationsPage() {
  type MarketplaceCategoryKey = "matieres-premieres" | "vetements" | "services" | "accessoires"
  const [activeTab, setActiveTab] = useState<"projects" | "marketplace" | "messages">("projects")
  const [activeMarketplaceCategory, setActiveMarketplaceCategory] = useState<MarketplaceCategoryKey>("matieres-premieres")
  const marketplaceCategories = [
    { id: "matieres-premieres", label: "Matières Premières", icon: Package },
    { id: "vetements", label: "Vêtements", icon: Shirt },
    { id: "services", label: "Services", icon: Wrench },
    { id: "accessoires", label: "Accessoires", icon: Gem },
  ]

  return (
    <div className="min-h-screen pt-20">
      <Header />
      <Assistant />
      
      {/* Hero Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">Projets & Marketplace</h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Connectez-vous avec d'autres créateurs, explorez le marketplace et gérez vos projets de mode éthique.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex gap-4 my-6 md:ml-6 flex-wrap">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-6 py-3 tracking-[0.1em] uppercase text-sm font-light transition-all flex items-center gap-2 ${
                activeTab === "projects"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Users className="h-4 w-4" /> Projets
            </button>
            <button
              onClick={() => setActiveTab("marketplace")}
              className={`px-6 py-3 tracking-[0.1em] uppercase text-sm font-light transition-all flex items-center gap-2 ${
                activeTab === "marketplace"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Package className="h-4 w-4" /> Marketplace
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-6 py-3 tracking-[0.1em] uppercase text-sm font-light transition-all flex items-center gap-2 ${
                activeTab === "messages"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <MessageCircle className="h-4 w-4" /> Messagerie
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg p-6 min-h-screen">
            {activeTab === "messages" && (
              <div className="space-y-4">
                <div className="relative w-full max-w-md mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher des conversations..."
                    className="pl-10"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collaborationData.conversations.map((conv) => (
                    <Card key={conv.id} className={`hover:shadow-md transition-all duration-200`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <Image
                              src={conv.avatar || "/collabs/placeholder.svg"}
                              alt={conv.name}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                conv.status === "online" ? "bg-green-500" : "bg-gray-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{conv.name}</h3>
                              <span className="text-xs text-gray-500">{conv.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{conv.lastMessage}</p>
                            <div className="flex items-center justify-between mt-3">
                              <Badge variant="secondary" className="text-xs">
                                {conv.type === "supplier" ? "Fournisseur" : conv.type === "agency" ? "Agence" : "Freelance"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Interface de messagerie */}
                <Card className="mt-6">
                  <CardHeader className="p-4 border-b">
                    <div className="flex items-center space-x-4">
                      <Image
                        src="/collabs/placeholder.svg"
                        alt="Chat actif"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">ÉcoTextile Innovations</h3>
                        <p className="text-sm text-gray-500">En ligne</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative p-10 min-h-[600px] bg-gray-50">
                    <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                      {collaborationData.messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] px-4 py-2 rounded-lg ${
                              message.isOwn
                                ? "bg-black text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            {message.attachments && (
                              <div className="mt-2 p-2 bg-gray-200 rounded flex items-center space-x-2">
                                <Paperclip className="w-4 h-4" />
                                <span className="text-xs">{message.attachments[0]}</span>
                              </div>
                            )}
                            <p className="text-xs opacity-70 mt-1">{message.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 absolute bottom-10 w-[95%]">
                      <Button size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Textarea
                          placeholder="Écrivez votre message..."
                          className="pr-10 border border-gray-200 bg-white"
                          rows={1}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "marketplace" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 flex-wrap">
                    {marketplaceCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveMarketplaceCategory(category.id as MarketplaceCategoryKey)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                          activeMarketplaceCategory === category.id
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        <category.icon className="h-4 w-4" />
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collaborationData.servicesByCategory[activeMarketplaceCategory]?.map((service) => (
                    <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-all">
                      <div className="relative h-48">
                        <Image
                          src={service.image || "/collabs/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                        {!service.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="destructive">Rupture de stock</Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">{service.title}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm">{service.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{service.provider}</p>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-primary">{service.price}</p>
                          <Button
                            size="sm"
                            variant={service.inStock ? "default" : "secondary"}
                            disabled={!service.inStock}
                          >
                            {service.inStock ? "Contacter" : "Indisponible"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="p-6 bg-gray-50">
                    <h3 className="text-2xl font-bold text-primary mb-2">12</h3>
                    <p className="text-sm text-gray-600">Projets actifs</p>
                  </Card>
                  <Card className="p-6 bg-gray-50">
                    <h3 className="text-2xl font-bold text-primary mb-2">8</h3>
                    <p className="text-sm text-gray-600">Collaborateurs</p>
                  </Card>
                  <Card className="p-6 bg-gray-50">
                    <h3 className="text-2xl font-bold text-primary mb-2">24</h3>
                    <p className="text-sm text-gray-600">Tâches en cours</p>
                  </Card>
                  <Card className="p-6 bg-gray-50">
                    <h3 className="text-2xl font-bold text-primary mb-2">6</h3>
                    <p className="text-sm text-gray-600">Deadlines proches</p>
                  </Card>
                </div>

                {/* Liste des projets */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-light serif-font">Projets en cours</h3>
                    <Link href="/collaborations/create-project">
                      <Button className="bg-black text-white font-light hover:bg-gray-800" size="sm">
                        NOUVEAU PROJET <Plus className="h-4 w-4 text-white" />
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        id: "1",
                        title: "Collection Été 2026",
                        progress: 65,
                        collaborators: 4,
                        dueDate: "15 Dec 2025",
                        status: "En cours"
                      },
                      {
                        id: "2",
                        title: "Collaboration Bio-textile",
                        progress: 30,
                        collaborators: 2,
                        dueDate: "1 Jan 2026",
                        status: "En attente"
                      },
                      {
                        id: "3",
                        title: "Ligne Éco-responsable",
                        progress: 85,
                        collaborators: 5,
                        dueDate: "20 Nov 2025",
                        status: "Urgent"
                      },
                      {
                        id: "4",
                        title: "Marketing Digital",
                        progress: 45,
                        collaborators: 3,
                        dueDate: "10 Dec 2025",
                        status: "En cours"
                      }
                    ].map((project) => (
                      <Card key={project.id} className="hover:shadow-md transition-all">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">{project.title}</h4>
                            <Badge
                              variant={
                                project.status === "Urgent"
                                  ? "destructive"
                                  : project.status === "En cours"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <div className="space-y-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {project.collaborators} membres
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {project.dueDate}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Liste des tâches */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-light serif-font">Tâches à faire</h3>
                    <Button className="bg-black text-white font-light hover:bg-gray-800" size="sm">
                      NOUVELLE TACHE <Plus className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {collaborationData.todos.map((todo) => (
                      <Card key={todo.id} className="p-4">
                        <div className="flex items-start gap-3">
                          <CheckSquare className={`w-5 h-5 mt-1 ${todo.completed ? "text-green-500" : "text-gray-400"}`} />
                          <div className="flex-1">
                            <p className={`text-sm ${todo.completed ? "line-through text-gray-400" : ""}`}>
                              {todo.task}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <Badge
                                variant={
                                  todo.priority === "high"
                                    ? "destructive"
                                    : todo.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                                className="text-xs"
                              >
                                {todo.priority}
                              </Badge>
                              <span className="text-xs text-gray-500 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {todo.dueDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}