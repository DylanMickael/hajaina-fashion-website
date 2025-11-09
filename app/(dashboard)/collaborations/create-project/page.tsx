"use client"

import type React from "react"

import { useState } from "react"
import { MapLibreMap } from "@/components/ui/custom-map" // Assurez-vous que ce composant existe
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Users, Package, Plus, X, Check, Globe } from "lucide-react"
import Link from "next/link"

interface Collaborator {
  id: string
  name: string
  role: string
  location: { lat: number; lng: number }
  country: string
}

interface Material {
  id: string
  name: string
  type: string
  location: { lat: number; lng: number }
  country: string
  quantity: string
}

// Coordonnées de l'IFM Analakely (le point central de l'utilisateur/projet)
const IFM_ANALAKELY = { lat: -18.91128, lng: 47.52690 }

export default function CreateProjectPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "mode-durable",
    budget: "",
    duration: "3-mois",
    impact: "",
  })

  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "Ravenna Artisan",
      role: "Tisserand",
      location: { lat: -18.91328, lng: 47.52890 }, // 200m au nord-est d'IFM
      country: "Madagascar",
    },
    {
      id: "2",
      name: "Lalaina Textiles",
      role: "Couturière",
      location: { lat: -18.90928, lng: 47.52490 }, // 200m au sud-ouest d'IFM
      country: "Madagascar",
    },
  ])

  const [materials, setMaterials] = useState<Material[]>([
    {
      id: "1",
      name: "Coton Biologique",
      type: "Textile",
      location: { lat: -18.91428, lng: 47.52590 }, // 300m au nord d'IFM
      country: "Madagascar",
      quantity: "50kg",
    },
    {
      id: "2",
      name: "Teinture Naturelle",
      type: "Teinture",
      location: { lat: -18.90828, lng: 47.52790 }, // 300m au sud-est d'IFM
      country: "Madagascar",
      quantity: "20L",
    },
  ])

  const [showAddCollaborator, setShowAddCollaborator] = useState(false)
  const [showAddMaterial, setShowAddMaterial] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 2) {
      setStep(step + 1)
    } else {
      console.log("Projet créé:", { formData, collaborators, materials })
      alert("Projet créé avec succès!")
    }
  }

  const addCollaborator = (collab: Omit<Collaborator, "id">) => {
    setCollaborators([...collaborators, { ...collab, id: Date.now().toString() }])
    setShowAddCollaborator(false)
  }

  const removeCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== id))
  }

  const addMaterial = (mat: Omit<Material, "id">) => {
    setMaterials([...materials, { ...mat, id: Date.now().toString() }])
    setShowAddMaterial(false)
  }

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id))
  }

  // Créer les markers pour la carte, **incluant IFM Analakely**
  const mapMarkers = [
    // IFM Analakely (icône rouge/point de projet)
    {
      lat: IFM_ANALAKELY.lat,
      lng: IFM_ANALAKELY.lng,
      label: "IFM Analakely (Votre position)",
      color: '#f0f0f0', // Red 500
      icon: '📍'
    },
    // Collaborateurs (icônes bleus/personnes)
    ...collaborators.map((collab) => ({
      lat: collab.location.lat,
      lng: collab.location.lng,
      label: `${collab.name} - ${collab.role}`,
      color: '#3b82f6', // Blue 500
      icon: '👤'
    })),
    // Matériaux (icônes verts/packages)
    ...materials.map((mat) => ({
      lat: mat.location.lat,
      lng: mat.location.lng,
      label: `${mat.name} (${mat.quantity})`,
      color: '#10b981', // Green 500
      icon: '📦'
    }))
  ]

  // Calculer le centre de la carte basé sur tous les markers (y compris IFM Analakely)
  const allLatitudes = mapMarkers.map(m => m.lat);
  const allLongitudes = mapMarkers.map(m => m.lng);

  // Si pas de markers, utiliser IFM. Sinon, utiliser la moyenne pour centrer la vue.
  const centerLat = allLatitudes.length > 0
    ? allLatitudes.reduce((sum, lat) => sum + lat, 0) / allLatitudes.length
    : IFM_ANALAKELY.lat

  const centerLng = allLongitudes.length > 0
    ? allLongitudes.reduce((sum, lng) => sum + lng, 0) / allLongitudes.length
    : IFM_ANALAKELY.lng

  // Le rendu change radicalement en fonction de l'étape
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header for Step 1, or compact header for Step 2 */}
      {step === 1 && (
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-6 py-6">
            <Link
              href="/collaborations"
              className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-light text-sm tracking-wide">Retour aux projets</span>
            </Link>
            <h1 className="text-5xl font-extralight tracking-[0.2em] mb-4 serif-font">Créer un Projet</h1>
            <div className="w-32 h-px bg-black" />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {step === 1 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            {/* Progress Indicator (Step 1 Layout) */}
            <div className="flex items-center gap-4 mb-12 max-w-4xl mx-auto">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-light transition-all ${
                      s <= step ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {s}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-light ${s <= step ? "text-black" : "text-gray-500"}`}>
                      {s === 1 ? "Détails du Projet" : "Collaborateurs & Matières"}
                    </p>
                  </div>
                  {s < 2 && <div className={`h-px flex-1 ${s < step ? "bg-black" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              {/* Step 1: Project Details */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-light serif-font mb-6">Informations du Projet</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Titre du Projet</label>
                      <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="border-gray-300 font-light"
                        placeholder="Ex: Collection Zéro Déchet 2025"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Description</label>
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border-gray-300 font-light resize-none"
                        rows={5}
                        placeholder="Décrivez votre projet, ses objectifs et son impact..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-gray-600 mb-2">Catégorie</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
                        >
                          <option value="mode-durable">Mode Durable</option>
                          <option value="upcycling">Upcycling</option>
                          <option value="artisanat">Artisanat Local</option>
                          <option value="innovation">Innovation Textile</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-600 mb-2">Durée</label>
                        <select
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
                        >
                          <option value="1-mois">1 mois</option>
                          <option value="3-mois">3 mois</option>
                          <option value="6-mois">6 mois</option>
                          <option value="1-an">1 an</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Budget Estimé (€)</label>
                      <Input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="border-gray-300 font-light"
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Impact Environnemental</label>
                      <Textarea
                        name="impact"
                        value={formData.impact}
                        onChange={handleInputChange}
                        className="border-gray-300 font-light resize-none"
                        rows={3}
                        placeholder="Ex: Réduction de 500kg de déchets textiles, économie de 10000L d'eau..."
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Buttons for Step 1 */}
              <div className="flex gap-4 mt-8 max-w-4xl mx-auto">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    variant="outline"
                    className="flex-1 border-gray-300 hover:border-black font-light tracking-[0.1em] uppercase"
                  >
                    Précédent
                  </Button>
                )}
                <Button
                  type="submit"
                  className="flex-1 bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase"
                >
                  Suivant
                </Button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Step 2: Map and Sidebar Layout - NEW LAYOUT */}
      {step === 2 && (
        <div className="flex h-[calc(100vh)] overflow-hidden">
          {/* Left Side: Full Screen Map */}
          <div className="flex-1 relative">
            <MapLibreMap
              latitude={centerLat}
              longitude={centerLng}
              zoom={13} // Slightly zoomed out to show the cluster
              markers={mapMarkers}
            />

            {/* Map Header Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm z-10 border-b border-gray-200">
              <div className="flex items-center justify-between container mx-auto px-2">
                <div className="flex items-center gap-4">
                  <Link
                    href="#"
                    onClick={() => setStep(1)} // Back to step 1
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="font-light text-sm tracking-wide">Retour aux détails</span>
                  </Link>
                  <div className="h-5 w-px bg-gray-300" />
                  <h2 className="text-xl font-light serif-font flex items-center gap-2">
                    Propositions pour le projet
                  </h2>
                </div>
                {/* Legend in Header for space saving */}
                <div className="flex flex-wrap items-center gap-4 text-sm font-light">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-white text-xs">
                      📍
                    </div>
                    <span>Ma position</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                      👤
                    </div>
                    <span>Collaborations ({collaborators.length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                      📦
                    </div>
                    <span>Produits ({materials.length})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Sidebar for Collaborators and Materials */}
          <div className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col">
            <div className="p-6 space-y-8 flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit}>
                {/* Collaborators Section */}
                <Card className="border-0 shadow-sm mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-blue-600" />
                        <h3 className="text-xl font-light serif-font">Collaborateurs</h3>
                        <Badge variant="outline" className="font-light bg-blue-100 text-blue-700 border-blue-300">
                          {collaborators.length}
                        </Badge>
                      </div>
                      <Button
                        type="button"
                        onClick={() => setShowAddCollaborator(true)}
                        variant="outline"
                        size="sm"
                        className="font-light text-blue-600 hover:bg-blue-50 border-blue-300"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {showAddCollaborator && (
                      <CollaboratorForm onAdd={addCollaborator} onCancel={() => setShowAddCollaborator(false)} />
                    )}

                    <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
                      {collaborators.map((collab) => (
                        <div
                          key={collab.id}
                          className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                              👤
                            </div>
                            <div>
                              <p className="font-light text-sm">{collab.name}</p>
                              <p className="text-xs text-gray-600 font-light">
                                {collab.role} • {collab.country}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            onClick={() => removeCollaborator(collab.id)}
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Materials Section */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-green-600" />
                        <h3 className="text-xl font-light serif-font">Produits</h3>
                        <Badge variant="outline" className="font-light bg-green-100 text-green-700 border-green-300">
                          {materials.length}
                        </Badge>
                      </div>
                      <Button
                        type="button"
                        onClick={() => setShowAddMaterial(true)}
                        variant="outline"
                        size="sm"
                        className="font-light text-green-600 hover:bg-green-50 border-green-300"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {showAddMaterial && <MaterialForm onAdd={addMaterial} onCancel={() => setShowAddMaterial(false)} />}

                    <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
                      {materials.map((mat) => (
                        <div
                          key={mat.id}
                          className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">
                              📦
                            </div>
                            <div>
                              <p className="font-light text-sm">{mat.name}</p>
                              <p className="text-xs text-gray-600 font-light">
                                {mat.type} • {mat.quantity} • {mat.country}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            onClick={() => removeMaterial(mat.id)}
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation Buttons for Step 2 - inside sidebar */}
                <div className="flex gap-4 mt-8">
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      variant="outline"
                      className="flex-1 border-gray-300 hover:border-black font-light tracking-[0.1em] uppercase"
                    >
                      Précédent
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="flex-1 bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Créer le Projet
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Collaborator Form Component (No change, repeated for completeness)
function CollaboratorForm({
  onAdd,
  onCancel,
}: {
  onAdd: (collab: Omit<Collaborator, "id">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    country: "Madagascar",
    lat: IFM_ANALAKELY.lat,
    lng: IFM_ANALAKELY.lng,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      name: formData.name,
      role: formData.role,
      location: { lat: formData.lat, lng: formData.lng },
      country: formData.country,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg border border-blue-200 space-y-3 shadow-inner">
      <div className="grid grid-cols-2 gap-3">
        <Input
          placeholder="Nom du collaborateur"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="font-light text-sm"
          required
        />
        <Input
          placeholder="Rôle"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="font-light text-sm"
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <select
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg font-light text-sm focus:border-black focus:outline-none"
        >
          <option value="Madagascar">Madagascar</option>
          <option value="Kenya">Kenya</option>
          <option value="Sénégal">Sénégal</option>
          <option value="Rwanda">Rwanda</option>
        </select>
        <Input
          type="number"
          step="0.00001"
          placeholder="Latitude"
          value={formData.lat}
          onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
          className="font-light text-sm"
          required
        />
        <Input
          type="number"
          step="0.00001"
          placeholder="Longitude"
          value={formData.lng}
          onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
          className="font-light text-sm"
          required
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" onClick={onCancel} variant="outline" size="sm" className="font-light bg-transparent text-gray-600 hover:bg-gray-100 border-gray-300">
          Annuler
        </Button>
        <Button type="submit" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 font-light">
          <Check className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>
    </form>
  )
}

// Material Form Component (No change, repeated for completeness)
function MaterialForm({ onAdd, onCancel }: { onAdd: (mat: Omit<Material, "id">) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "Textile",
    quantity: "",
    country: "Madagascar",
    lat: IFM_ANALAKELY.lat,
    lng: IFM_ANALAKELY.lng,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      name: formData.name,
      type: formData.type,
      quantity: formData.quantity,
      location: { lat: formData.lat, lng: formData.lng },
      country: formData.country,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg border border-green-200 space-y-3 shadow-inner">
      <div className="grid grid-cols-2 gap-3">
        <Input
          placeholder="Nom de la matière"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="font-light text-sm"
          required
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg font-light text-sm focus:border-black focus:outline-none"
        >
          <option value="Textile">Textile</option>
          <option value="Teinture">Teinture</option>
          <option value="Accessoire">Accessoire</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          placeholder="Quantité (ex: 50kg)"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="font-light text-sm"
          required
        />
        <select
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg font-light text-sm focus:border-black focus:outline-none"
        >
          <option value="Madagascar">Madagascar</option>
          <option value="Kenya">Kenya</option>
          <option value="Sénégal">Sénégal</option>
          <option value="Rwanda">Rwanda</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          type="number"
          step="0.00001"
          placeholder="Latitude"
          value={formData.lat}
          onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
          className="font-light text-sm"
          required
        />
        <Input
          type="number"
          step="0.00001"
          placeholder="Longitude"
          value={formData.lng}
          onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
          className="font-light text-sm"
          required
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" onClick={onCancel} variant="outline" size="sm" className="font-light bg-transparent text-gray-600 hover:bg-gray-100 border-gray-300">
          Annuler
        </Button>
        <Button type="submit" size="sm" className="bg-green-600 text-white hover:bg-green-700 font-light">
          <Check className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>
    </form>
  )
}