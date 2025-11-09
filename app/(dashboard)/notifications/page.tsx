"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  ShoppingBag,
  Recycle,
  Award,
  ArrowLeft,
  Check,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "order" | "recycle" | "badge" | "collaboration"
  title: string
  message: string
  time: string
  read: boolean
  image?: string
  actionUrl?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "like",
      title: "Nouveau J'aime",
      message: "Miora Rasoanaivo a aimé votre collection 'Urban Malagasy'",
      time: "Il y a 5 minutes",
      read: false,
      image: "/placeholder.svg?height=100&width=100&text=User",
      actionUrl: "/collections/3",
    },
    {
      id: "2",
      type: "comment",
      title: "Nouveau Commentaire",
      message: "Hery Andriantsoa a commenté votre article sur la mode durable",
      time: "Il y a 1 heure",
      read: false,
      image: "/placeholder.svg?height=100&width=100&text=User",
      actionUrl: "/blog",
    },
    {
      id: "3",
      type: "follow",
      title: "Nouveau Abonné",
      message: "Lalaina Rakoto a commencé à vous suivre",
      time: "Il y a 2 heures",
      read: false,
      image: "/placeholder.svg?height=100&width=100&text=User",
      actionUrl: "/stylistes/3",
    },
    {
      id: "4",
      type: "badge",
      title: "Nouveau Badge Débloqué",
      message: "Félicitations ! Vous avez obtenu le badge 'Éco-Guerrier' pour 10 articles recyclés",
      time: "Il y a 3 heures",
      read: false,
      actionUrl: "/dashboard",
    },
    {
      id: "5",
      type: "order",
      title: "Commande Confirmée",
      message: "Votre commande #12345 a été confirmée et sera expédiée sous 48h",
      time: "Il y a 5 heures",
      read: true,
      actionUrl: "/shop/cart",
    },
    {
      id: "6",
      type: "recycle",
      title: "Recyclage Accepté",
      message: "Vos 3 vêtements ont été acceptés pour le programme de recyclage",
      time: "Il y a 1 jour",
      read: true,
      actionUrl: "/recyclage",
    },
    {
      id: "7",
      type: "collaboration",
      title: "Nouvelle Opportunité",
      message: "Mode Circulaire recherche un styliste pour un projet zéro déchet",
      time: "Il y a 2 jours",
      read: true,
      actionUrl: "/collaborations",
    },
  ])

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />
      case "comment":
        return <MessageCircle className="h-5 w-5 text-blue-500" />
      case "follow":
        return <UserPlus className="h-5 w-5 text-green-500" />
      case "order":
        return <ShoppingBag className="h-5 w-5 text-purple-500" />
      case "recycle":
        return <Recycle className="h-5 w-5 text-emerald-500" />
      case "badge":
        return <Award className="h-5 w-5 text-yellow-500" />
      case "collaboration":
        return <Bell className="h-5 w-5 text-indigo-500" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const filterNotifications = (filter: "all" | "unread") => {
    if (filter === "unread") {
      return notifications.filter((n) => !n.read)
    }
    return notifications
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-light tracking-wide serif-font">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600 font-light">
                    {unreadCount} notification{unreadCount > 1 ? "s" : ""} non lue{unreadCount > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead} className="font-light bg-transparent">
                <Check className="h-4 w-4 mr-2" />
                Tout marquer comme lu
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="font-light">
              Toutes ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="font-light">
              Non lues ({unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filterNotifications("all").length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 font-light">Aucune notification</p>
                </CardContent>
              </Card>
            ) : (
              filterNotifications("all").map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md ${!notification.read ? "bg-blue-50/50 border-blue-200" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        {getIcon(notification.type)}
                      </div>

                      {/* Image if available */}
                      {notification.image && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image src={notification.image || "/placeholder.svg"} alt="" fill className="object-cover" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-medium text-sm">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="secondary" className="text-xs font-light">
                              Nouveau
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 font-light mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500 font-light">{notification.time}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => markAsRead(notification.id)}
                            title="Marquer comme lu"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteNotification(notification.id)}
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    {/* Action Button */}
                    {notification.actionUrl && (
                      <div className="mt-4 ml-14">
                        <Link href={notification.actionUrl}>
                          <Button variant="outline" size="sm" className="font-light text-xs bg-transparent">
                            Voir plus
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {filterNotifications("unread").length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Check className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p className="text-gray-600 font-light">Toutes les notifications sont lues</p>
                </CardContent>
              </Card>
            ) : (
              filterNotifications("unread").map((notification) => (
                <Card key={notification.id} className="bg-blue-50/50 border-blue-200 transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        {getIcon(notification.type)}
                      </div>

                      {/* Image if available */}
                      {notification.image && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image src={notification.image || "/placeholder.svg"} alt="" fill className="object-cover" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-medium text-sm">{notification.title}</h3>
                          <Badge variant="secondary" className="text-xs font-light">
                            Nouveau
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 font-light mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500 font-light">{notification.time}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => markAsRead(notification.id)}
                          title="Marquer comme lu"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteNotification(notification.id)}
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    {/* Action Button */}
                    {notification.actionUrl && (
                      <div className="mt-4 ml-14">
                        <Link href={notification.actionUrl}>
                          <Button variant="outline" size="sm" className="font-light text-xs bg-transparent">
                            Voir plus
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
