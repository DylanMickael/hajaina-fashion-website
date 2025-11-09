"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Bell, Globe, Lock, Palette, Save } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SettingsPage() {
  const [userInfo, setUserInfo] = useState({
    name: "Sophie Raharison",
    email: "sophie.raharison@example.com",
    phone: "+261 34 12 345 67",
    location: "Antananarivo, Madagascar",
    bio: "Passionnée de mode éthique et durable. Designer indépendante spécialisée dans la fusion des traditions malgaches avec les tendances contemporaines.",
    avatar: "/placeholder.svg?height=200&width=200&text=User+Avatar",
  })

  const [preferences, setPreferences] = useState({
    language: "fr",
    theme: "light",
    currency: "MGA",
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyNewsletter: true,
    collaborationAlerts: true,
    newFollowers: true,
    comments: true,
    likes: true,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert("Paramètres sauvegardés avec succès !")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-light tracking-wide serif-font">Paramètres</h1>
            </div>
            <Button onClick={handleSave} disabled={isSaving} className="font-light">
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="account" className="font-light">
              <User className="h-4 w-4 mr-2" />
              Compte
            </TabsTrigger>
            <TabsTrigger value="notifications" className="font-light">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="font-light">
              <Globe className="h-4 w-4 mr-2" />
              Préférences
            </TabsTrigger>
            <TabsTrigger value="security" className="font-light">
              <Lock className="h-4 w-4 mr-2" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="appearance" className="font-light">
              <Palette className="h-4 w-4 mr-2" />
              Apparence
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="font-light tracking-wide">Informations du Compte</CardTitle>
                <CardDescription className="font-light">
                  Gérez vos informations personnelles et votre profil public
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <Image
                      src={userInfo.avatar || "/placeholder.svg"}
                      alt={userInfo.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="font-light mb-2 bg-transparent">
                      Changer la photo
                    </Button>
                    <p className="text-xs text-gray-600 font-light">JPG, PNG ou GIF. Max 2MB.</p>
                  </div>
                </div>

                <Separator />

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-light">
                    Nom complet
                  </Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="font-light"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-light">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className="font-light"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-light">
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    className="font-light"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="font-light">
                    Localisation
                  </Label>
                  <Input
                    id="location"
                    value={userInfo.location}
                    onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                    className="font-light"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="font-light">
                    Biographie
                  </Label>
                  <Textarea
                    id="bio"
                    value={userInfo.bio}
                    onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                    rows={4}
                    className="font-light"
                  />
                  <p className="text-xs text-gray-600 font-light">
                    Décrivez-vous en quelques mots. Maximum 200 caractères.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="font-light tracking-wide">Préférences de Notification</CardTitle>
                <CardDescription className="font-light">Choisissez comment vous souhaitez être notifié</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-light">Notifications par Email</Label>
                    <p className="text-sm text-gray-600 font-light">Recevoir des notifications par email</p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                  />
                </div>

                <Separator />

                {/* Push Notifications */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-light">Notifications Push</Label>
                    <p className="text-sm text-gray-600 font-light">Recevoir des notifications sur votre appareil</p>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, pushNotifications: checked })}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Types de Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-light">Nouveaux Abonnés</Label>
                      <p className="text-sm text-gray-600 font-light">Quand quelqu'un vous suit</p>
                    </div>
                    <Switch
                      checked={preferences.newFollowers}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, newFollowers: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-light">Commentaires</Label>
                      <p className="text-sm text-gray-600 font-light">Quand quelqu'un commente vos publications</p>
                    </div>
                    <Switch
                      checked={preferences.comments}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, comments: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-light">J'aime</Label>
                      <p className="text-sm text-gray-600 font-light">Quand quelqu'un aime vos publications</p>
                    </div>
                    <Switch
                      checked={preferences.likes}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, likes: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-light">Opportunités de Collaboration</Label>
                      <p className="text-sm text-gray-600 font-light">Nouvelles annonces de collaboration</p>
                    </div>
                    <Switch
                      checked={preferences.collaborationAlerts}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, collaborationAlerts: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Emails Marketing</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-light">Newsletter Hebdomadaire</Label>
                      <p className="text-sm text-gray-600 font-light">Recevez notre newsletter chaque semaine</p>
                    </div>
                    <Switch
                      checked={preferences.weeklyNewsletter}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, weeklyNewsletter: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-light">Offres Promotionnelles</Label>
                      <p className="text-sm text-gray-600 font-light">Recevez des offres spéciales et promotions</p>
                    </div>
                    <Switch
                      checked={preferences.marketingEmails}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, marketingEmails: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="font-light tracking-wide">Préférences Générales</CardTitle>
                <CardDescription className="font-light">
                  Personnalisez votre expérience sur la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language */}
                <div className="space-y-2">
                  <Label htmlFor="language" className="font-light">
                    Langue
                  </Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                  >
                    <SelectTrigger id="language" className="font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="mg">Malagasy</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600 font-light">Choisissez la langue d'affichage de l'interface</p>
                </div>

                <Separator />

                {/* Currency */}
                <div className="space-y-2">
                  <Label htmlFor="currency" className="font-light">
                    Devise
                  </Label>
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) => setPreferences({ ...preferences, currency: value })}
                  >
                    <SelectTrigger id="currency" className="font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MGA">Ariary Malgache (MGA)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="USD">Dollar US (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600 font-light">Devise utilisée pour l'affichage des prix</p>
                </div>

                <Separator />

                {/* Timezone */}
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="font-light">
                    Fuseau Horaire
                  </Label>
                  <Select defaultValue="indian/antananarivo">
                    <SelectTrigger id="timezone" className="font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indian/antananarivo">Antananarivo (GMT+3)</SelectItem>
                      <SelectItem value="europe/paris">Paris (GMT+1)</SelectItem>
                      <SelectItem value="america/new_york">New York (GMT-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="font-light tracking-wide">Sécurité et Confidentialité</CardTitle>
                <CardDescription className="font-light">Gérez la sécurité de votre compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Change Password */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Changer le Mot de Passe</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="font-light">
                      Mot de passe actuel
                    </Label>
                    <Input id="current-password" type="password" className="font-light" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="font-light">
                      Nouveau mot de passe
                    </Label>
                    <Input id="new-password" type="password" className="font-light" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="font-light">
                      Confirmer le mot de passe
                    </Label>
                    <Input id="confirm-password" type="password" className="font-light" />
                  </div>
                  <Button variant="outline" className="font-light bg-transparent">
                    Mettre à jour le mot de passe
                  </Button>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Authentification à Deux Facteurs</h3>
                  <p className="text-sm text-gray-600 font-light">
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </p>
                  <Button variant="outline" className="font-light bg-transparent">
                    Activer l'authentification à deux facteurs
                  </Button>
                </div>

                <Separator />

                {/* Connected Devices */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Appareils Connectés</h3>
                  <p className="text-sm text-gray-600 font-light">Gérez les appareils connectés à votre compte</p>
                  <Button variant="outline" className="font-light bg-transparent">
                    Voir les appareils
                  </Button>
                </div>

                <Separator />

                {/* Delete Account */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-red-600">Zone Dangereuse</h3>
                  <p className="text-sm text-gray-600 font-light">
                    La suppression de votre compte est irréversible. Toutes vos données seront définitivement
                    supprimées.
                  </p>
                  <Button variant="destructive" className="font-light">
                    Supprimer mon compte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="font-light tracking-wide">Apparence</CardTitle>
                <CardDescription className="font-light">Personnalisez l'apparence de l'interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme */}
                <div className="space-y-2">
                  <Label htmlFor="theme" className="font-light">
                    Thème
                  </Label>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                  >
                    <SelectTrigger id="theme" className="font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="auto">Automatique</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600 font-light">Choisissez le thème de couleur de l'interface</p>
                </div>

                <Separator />

                {/* Font Size */}
                <div className="space-y-2">
                  <Label htmlFor="font-size" className="font-light">
                    Taille de Police
                  </Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="font-size" className="font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Petite</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Compact Mode */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-light">Mode Compact</Label>
                    <p className="text-sm text-gray-600 font-light">Afficher plus de contenu à l'écran</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
