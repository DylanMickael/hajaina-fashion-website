"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Mail,
  MapPin,
  Calendar,
  Award,
  Heart,
  Recycle,
  Leaf,
  TrendingUp,
  Star,
  ShoppingBag,
  ArrowLeft,
  Edit,
  Share2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface UserBadge {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  progress?: number
  maxProgress?: number
}

interface FavoriteItem {
  id: string
  title: string
  designer: string
  image: string
  type: "collection" | "designer" | "article"
}

export default function ProfilePage() {
  const [user] = useState({
    name: "Hery Raharison",
    email: "hery.raharison@example.com",
    location: "Antananarivo, Madagascar",
    joinDate: "Janvier 2024",
    bio: "Passionnée de mode éthique et durable. Designer indépendante spécialisée dans la fusion des traditions malgaches avec les tendances contemporaines.",
    avatar: "/img/Hery.jpg",
    coverImage: "/placeholder.svg?height=400&width=1200&text=Profile+Cover",
    manajaCount: 247,
    followersCount: 1234,
    followingCount: 567,
  })

  const [environmentalImpact] = useState({
    itemsRecycled: 23,
    co2Saved: 145, // kg
    waterSaved: 3420, // litres
    treesPlanted: 12,
  })

  const [badges] = useState<UserBadge[]>([
    {
      id: "1",
      name: "Éco-Guerrier",
      description: "Recycler 10 articles",
      icon: "🌿",
      earned: true,
    },
    {
      id: "2",
      name: "Ambassadeur Vert",
      description: "Économiser 100kg de CO2",
      icon: "🌍",
      earned: true,
    },
    {
      id: "3",
      name: "Créateur Inspirant",
      description: "Obtenir 1000 J'aime",
      icon: "⭐",
      earned: true,
    },
    {
      id: "4",
      name: "Pionnier du Recyclage",
      description: "Recycler 50 articles",
      icon: "♻️",
      earned: false,
      progress: 23,
      maxProgress: 50,
    },
    {
      id: "5",
      name: "Influenceur Mode",
      description: "Atteindre 5000 abonnés",
      icon: "💫",
      earned: false,
      progress: 1234,
      maxProgress: 5000,
    },
    {
      id: "6",
      name: "Maître Artisan",
      description: "Créer 20 collections",
      icon: "🎨",
      earned: false,
      progress: 8,
      maxProgress: 20,
    },
  ])

  const [favorites] = useState<FavoriteItem[]>([
    {
      id: "1",
      title: "Collection Automne 2024",
      designer: "Miora Rasoanaivo",
      image: "/placeholder.svg?height=300&width=300&text=Collection",
      type: "collection",
    },
    {
      id: "2",
      title: "Hery Andriantsoa",
      designer: "Mode Durable",
      image: "/placeholder.svg?height=300&width=300&text=Designer",
      type: "designer",
    },
    {
      id: "3",
      title: "Urban Malagasy",
      designer: "Lalaina Rakoto",
      image: "/placeholder.svg?height=300&width=300&text=Collection",
      type: "collection",
    },
    {
      id: "4",
      title: "L'Art du Recyclage",
      designer: "Magazine",
      image: "/placeholder.svg?height=300&width=300&text=Article",
      type: "article",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="font-light bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
              <Link href="/settings">
                <Button variant="outline" size="sm" className="font-light bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image src={user.coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="container mx-auto px-6">
        <div className="relative -mt-20 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
            </div>

            {/* User Info */}
            <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
              <h1 className="text-3xl font-light tracking-wide serif-font mb-2">{user.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="font-light">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="font-light">{user.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-light">Membre depuis {user.joinDate}</span>
                </div>
              </div>
              <p className="text-gray-700 font-light leading-relaxed mb-4">{user.bio}</p>

              {/* Stats */}
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-2xl font-light">{user.manajaCount}</div>
                  <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Manaja</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light">{user.followersCount}</div>
                  <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Abonnés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light">{user.followingCount}</div>
                  <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Abonnements</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="impact" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="impact" className="font-light">
              <Leaf className="h-4 w-4 mr-2" />
              Impact Environnemental
            </TabsTrigger>
            <TabsTrigger value="badges" className="font-light">
              <Award className="h-4 w-4 mr-2" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="favorites" className="font-light">
              <Heart className="h-4 w-4 mr-2" />
              Favoris
            </TabsTrigger>
          </TabsList>

          {/* Environmental Impact Tab */}
          <TabsContent value="impact">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Recycle className="h-8 w-8 text-green-600" />
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-3xl font-light mb-1">{environmentalImpact.itemsRecycled}</div>
                  <div className="text-sm text-gray-600 font-light">Articles Recyclés</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Leaf className="h-8 w-8 text-emerald-600" />
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-light mb-1">{environmentalImpact.co2Saved} kg</div>
                  <div className="text-sm text-gray-600 font-light">CO2 Économisé</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <ShoppingBag className="h-8 w-8 text-blue-600" />
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-light mb-1">{environmentalImpact.waterSaved} L</div>
                  <div className="text-sm text-gray-600 font-light">Eau Économisée</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Star className="h-8 w-8 text-yellow-600" />
                    <TrendingUp className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="text-3xl font-light mb-1">{environmentalImpact.treesPlanted}</div>
                  <div className="text-sm text-gray-600 font-light">Arbres Plantés</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-light tracking-wide">Votre Impact Cette Année</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  Grâce à vos actions éco-responsables, vous avez contribué à réduire l'empreinte carbone de l'industrie
                  de la mode. Continuez ainsi pour atteindre de nouveaux objectifs !
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-light">Objectif Recyclage (50 articles)</span>
                      <span className="font-light">{environmentalImpact.itemsRecycled}/50</span>
                    </div>
                    <Progress value={(environmentalImpact.itemsRecycled / 50) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-light">Objectif CO2 (500 kg)</span>
                      <span className="font-light">{environmentalImpact.co2Saved}/500 kg</span>
                    </div>
                    <Progress value={(environmentalImpact.co2Saved / 500) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <Card
                  key={badge.id}
                  className={`transition-all ${badge.earned ? "border-yellow-400 bg-yellow-50/30" : "opacity-60"}`}
                >
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-3">{badge.icon}</div>
                      <h3 className="font-medium mb-1">{badge.name}</h3>
                      <p className="text-sm text-gray-600 font-light">{badge.description}</p>
                    </div>
                    {badge.earned ? (
                      <Badge className="w-full justify-center bg-yellow-500 hover:bg-yellow-600">
                        <Award className="h-3 w-3 mr-1" />
                        Débloqué
                      </Badge>
                    ) : (
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="font-light">Progression</span>
                          <span className="font-light">
                            {badge.progress}/{badge.maxProgress}
                          </span>
                        </div>
                        <Progress value={((badge.progress || 0) / (badge.maxProgress || 1)) * 100} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((item) => (
                <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-all overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-white/90 hover:bg-white shadow-lg"
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs font-light">
                        {item.type === "collection" ? "Collection" : item.type === "designer" ? "Styliste" : "Article"}
                      </Badge>
                      <h3 className="font-light mb-1 text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-600 font-light">{item.designer}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
