"use client"

import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
  Search,
  MessageCircle,
  Plus,
  Users,
  CheckSquare,
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
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Assistant from "@/components/Assistant";

export default function CollaborationsPage() {
  type MarketplaceCategoryKey = "matieres-premieres" | "vetements" | "services" | "accessoires"
  const [activeTab, setActiveTab] = useState("messages")
  const [selectedConversation, setSelectedConversation] = useState("1")
  const [activeMarketplaceCategory, setActiveMarketplaceCategory] = useState<MarketplaceCategoryKey>("matieres-premieres")

  const conversations = [
    {
      id: "1",
      name: "ÉcoTextile Innovations",
      lastMessage: "Les échantillons de tissus recyclés sont prêts",
      time: "14:30",
      unread: 2,
      avatar: "/collabs/eco-textile-company.jpg",
      status: "online",
      type: "supplier",
    },
    {
      id: "2",
      name: "Atelier Couture Durable",
      lastMessage: "Proposition de collaboration pour upcycling",
      time: "12:15",
      unread: 0,
      avatar: "/collabs/sustainable-fashion-atelier.jpg",
      status: "offline",
      type: "agency",
    },
    {
      id: "3",
      name: "Marie Dubois - Styliste",
      lastMessage: "J'ai terminé les croquis pour la collection",
      time: "10:45",
      unread: 1,
      avatar: "/collabs/fashion-stylist-woman.png",
      status: "online",
      type: "freelancer",
    },
  ]

  const messages = [
    {
      id: "1",
      sender: "ÉcoTextile Innovations",
      content:
        "Bonjour ! Les échantillons de tissus recyclés que vous avez commandés sont maintenant prêts. Nous avons développé 3 nouvelles textures innovantes.",
      time: "14:30",
      isOwn: false,
      attachments: ["echantillons-tissus.pdf"],
    },
    {
      id: "2",
      sender: "Vous",
      content:
        "Parfait ! Pouvez-vous m'envoyer les spécifications techniques ? J'aimerais aussi programmer une réunion pour discuter des quantités.",
      time: "14:32",
      isOwn: true,
    },
    {
      id: "3",
      sender: "ÉcoTextile Innovations",
      content: "Bien sûr, je vous envoie tout ça. Êtes-vous disponible demain à 15h pour un appel vidéo ?",
      time: "14:35",
      isOwn: false,
    },
  ]

  const todos = [
    {
      id: "1",
      task: "Finaliser les spécifications techniques",
      completed: false,
      priority: "high",
      dueDate: "2024-08-30",
    },
    {
      id: "2",
      task: "Organiser shooting photo collection",
      completed: false,
      priority: "medium",
      dueDate: "2024-09-05",
    },
    { id: "3", task: "Réviser contrat avec ÉcoTextile", completed: true, priority: "high", dueDate: "2024-08-25" },
    { id: "4", task: "Rechercher nouveaux fournisseurs bio", completed: false, priority: "low", dueDate: "2024-09-15" },
  ]

  const servicesByCategory = {
    "matieres-premieres": [
      {
        id: "1",
        title: "Coton Bio Certifié GOTS",
        provider: "Green Fabrics Co.",
        category: "Matières Premières",
        price: "25-45€/m",
        rating: 4.8,
        location: "Lyon, France",
        image: "/collabs/organic-fabric-samples.jpg",
        description: "Coton 100% biologique certifié GOTS, disponible en 12 coloris naturels",
        inStock: true,
        minOrder: "50m",
      },
      {
        id: "2",
        title: "Soie Recyclée Premium",
        provider: "Silk Revival",
        category: "Matières Premières",
        price: "80-120€/m",
        rating: 4.9,
        location: "Paris, France",
        image: "/collabs/organic-fabric-samples.jpg",
        description: "Soie recyclée de haute qualité, texture luxueuse",
        inStock: true,
        minOrder: "20m",
      },
      {
        id: "3",
        title: "Lin Français Naturel",
        provider: "Normandie Textiles",
        category: "Matières Premières",
        price: "35-55€/m",
        rating: 4.7,
        location: "Caen, France",
        image: "/collabs/organic-fabric-samples.jpg",
        description: "Lin cultivé en Normandie, fibres longues premium",
        inStock: false,
        minOrder: "30m",
      },
    ],
    vetements: [
      {
        id: "4",
        title: "Robes Vintage Upcyclées",
        provider: "Atelier Renaissance",
        category: "Vêtements",
        price: "150-300€",
        rating: 4.6,
        location: "Bordeaux, France",
        image: "/collabs/sustainable-fashion-atelier.jpg",
        description: "Collection de robes vintage transformées avec techniques modernes",
        inStock: true,
        minOrder: "1 pièce",
      },
      {
        id: "5",
        title: "Blazers Éco-responsables",
        provider: "Mode Durable Paris",
        category: "Vêtements",
        price: "200-450€",
        rating: 4.8,
        location: "Paris, France",
        image: "/collabs/sustainable-fashion-atelier.jpg",
        description: "Blazers confectionnés avec matériaux recyclés",
        inStock: true,
        minOrder: "1 pièce",
      },
    ],
    services: [
      {
        id: "6",
        title: "Patronage 3D Avancé",
        provider: "Digital Fashion Lab",
        category: "Services",
        price: "200-500€",
        rating: 4.9,
        location: "Paris, France",
        image: "/collabs/3d-fashion-design.jpg",
        description: "Création de patrons 3D avec simulation réaliste des tissus",
        inStock: true,
        minOrder: "1 projet",
      },
      {
        id: "7",
        title: "Shooting Photo Mode",
        provider: "Studio Lumière",
        category: "Services",
        price: "800-2000€",
        rating: 4.7,
        location: "Lyon, France",
        image: "/collabs/3d-fashion-design.jpg",
        description: "Shooting professionnel avec équipe créative complète",
        inStock: true,
        minOrder: "1 journée",
      },
    ],
    accessoires: [
      {
        id: "8",
        title: "Boutons Vintage Artisanaux",
        provider: "Vintage Notions",
        category: "Accessoires",
        price: "2-8€/pièce",
        rating: 4.6,
        location: "Marseille, France",
        image: "/collabs/vintage-buttons-collection.jpg",
        description: "Collection unique de boutons vintage et artisanaux",
        inStock: true,
        minOrder: "10 pièces",
      },
      {
        id: "9",
        title: "Fermetures Éclair Bio",
        provider: "EcoZip France",
        category: "Accessoires",
        price: "3-12€/pièce",
        rating: 4.5,
        location: "Toulouse, France",
        image: "/collabs/vintage-buttons-collection.jpg",
        description: "Fermetures éclair en matériaux recyclés et biodégradables",
        inStock: true,
        minOrder: "25 pièces",
      },
    ],
  }

  const marketplaceCategories = [
    { id: "matieres-premieres", label: "Matières Premières", icon: Package },
    { id: "vetements", label: "Vêtements", icon: Shirt },
    { id: "services", label: "Services", icon: Wrench },
    { id: "accessoires", label: "Accessoires", icon: Gem },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Assistant />
      
      <div className="pt-16 h-screen flex">
        {/* Sidebar */}
        <div className="w-80 bg-sidebar border-r flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex">
              <Link href="/dashboard">
                <Button
                    size="sm"
                    className="bg-white text-black focus:ring-gray-700"
                >
                    <ArrowLeft className="text-black h-20 w-20" />
                </Button>
              </Link>
              <h1 className="text-xl font-light serif-font text-sidebar-foreground mb-4">Collaborations</h1>
            </div>
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-muted/50 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("messages")}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "messages"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                }`}
              >
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Messages
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "services"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                }`}
              >
                <Package className="w-4 h-4 inline mr-2" />
                Marketplace
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={activeTab === "messages" ? "Rechercher conversations..." : "Rechercher services..."}
                className="border-gray-200 border-1 pl-10 bg-input dfocus:border-primary/50"
              />
            </div>
          </div>

          {/* Content based on active tab */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "messages" ? (
              <div className="p-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 border ${
                      selectedConversation === conv.id
                        ? "bg-primary/10 shadow-sm"
                        : "hover:bg-muted/50 border-transparent hover"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Image
                          src={conv.avatar || "/collabs/placeholder.svg"}
                          alt={conv.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                            conv.status === "online" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate text-sidebar-foreground">{conv.name}</h3>
                          <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {conv.type === "supplier" ? "Fournisseur" : conv.type === "agency" ? "Agence" : "Freelance"}
                        </Badge>
                      </div>
                      {conv.unread > 0 && (
                        <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2">
                {servicesByCategory[activeMarketplaceCategory]?.map((service) => (
                  <Card
                    key={service.id}
                    className="mb-3 cursor-pointer hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="p-3">
                      <div className="flex space-x-3">
                        <div className="relative">
                          <Image
                            src={service.image || "/collabs/placeholder.svg"}
                            alt={service.title}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          {!service.inStock && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-medium">Rupture</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{service.title}</h3>
                          <p className="text-xs text-muted-foreground">{service.provider}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge className="text-xs border-border/50">
                              {service.minOrder}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{service.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs font-medium text-primary mt-1">{service.price}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t">
            <Button className="w-full mb-2 bg-primary hover:bg-primary/90 shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              {activeTab === "messages" ? "Nouvelle conversation" : "Publier un service"}
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-gray-100">
          {activeTab === "messages" ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/collabs/eco-textile-company.jpg"
                      alt="ÉcoTextile Innovations"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h2 className="font-semibold">ÉcoTextile Innovations</h2>
                      <p className="text-sm text-muted-foreground">En ligne • Fournisseur</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                        message.isOwn
                          ? "bg-gray-200 text-primary-foreground"
                          : "bg-white text-foreground border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.attachments && (
                        <div className="mt-2 p-2 bg-gray-100 rounded flex items-center space-x-2">
                          <Paperclip className="w-4 h-4" />
                          <span className="text-xs">{message.attachments[0]}</span>
                        </div>
                      )}
                      <p className="text-xs opacity-70 mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Tapez votre message..."
                      className="border border-gray-200 resize-none pr-12"
                      rows={1}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-muted/50"
                    >
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 shadow-sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 p-6">
              <div className="mb-6">
                <h2 className="serif-font text-2xl font-light mb-2">Marketplace des Services</h2>
                <p className="text-muted-foreground">
                  Trouvez des services, produits et matières premières pour vos projets de mode
                </p>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button size="sm" className="dbg-transparent">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                  {marketplaceCategories.map((category) => {
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveMarketplaceCategory(category.id as MarketplaceCategoryKey)}
                        className={`p-3 rounded-lg text-xs font-medium transition-all duration-200 border ${
                          activeMarketplaceCategory === category.id
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-card hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {category.label}
                      </button>
                    )
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {servicesByCategory[activeMarketplaceCategory]?.length || 0} résultats
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesByCategory[activeMarketplaceCategory]?.map((service) => (
                  <Card
                    key={service.id}
                    className="hover:shadow-lg bg-white transition-all duration-200 cursor-pointer group"
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={service.image || "/collabs/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                        />
                        {!service.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="destructive">Rupture de stock</Badge>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{service.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{service.provider}</p>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{service.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="border-border/50">
                          {service.minOrder}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{service.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">{service.price}</span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 shadow-sm"
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
        </div>

        {/* Right Sidebar - Dashboard Tools */}
        <div className="w-80 bg-card border-l flex flex-col">
          <div className="p-4 border-b">
            <h3 className="serif-font font-light mb-4">Outils de Projet</h3>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Projets actifs</div>
                </div>
              </Card>
              <Card className="p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">8</div>
                  <div className="text-xs text-muted-foreground">Collaborateurs</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Todo List */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-3">
              <h4 className="serif-font font-light">Tâches à faire</h4>
              <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {todos.slice(0, 4).map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50 border border-transparent hover transition-all duration-200"
                >
                  <CheckSquare className={`w-4 h-4 ${todo.completed ? "text-green-500" : "text-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                      {todo.task}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
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
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {todo.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4">
            <h4 className="serif-font font-light mb-3">Actions rapides</h4>
            <div className="space-y-2">
              <Button
                className="w-full justify-start bg-transparent dhover:bg-muted/50"
                size="sm"
              >
                <Scissors className="w-4 h-4 mr-2" />
                Nouveau projet
              </Button>
              <Button
                className="w-full justify-start bg-transparent dhover:bg-muted/50"
                size="sm"
              >
                <Users className="w-4 h-4 mr-2" />
                Inviter collaborateur
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
