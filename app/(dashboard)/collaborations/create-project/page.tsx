"use client"

import type React from "react"

import { useState } from "react"
import { OSMap } from "@/components/ui/map"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Users, Package, Plus, X, Check } from "lucide-react"
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
      location: { lat: -18.8792, lng: 47.5079 },
      country: "Madagascar",
    },
  ])

  const [materials, setMaterials] = useState<Material[]>([
    {
      id: "1",
      name: "Coton Biologique",
      type: "Textile",
      location: { lat: -19.0, lng: 46.0 },
      country: "Madagascar",
      quantity: "50kg",
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

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-light text-sm tracking-wide">Retour aux projets</span>
          </Link>
          <h1 className="text-5xl font-extralight tracking-[0.2em] mb-4 serif-font">Créer un Projet</h1>
          <div className="w-32 h-px bg-black" />
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Progress Indicator */}
          <div className="flex items-center gap-4 mb-12">
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

          <form onSubmit={handleSubmit}>
            {/* Step 1: Project Details */}
            {step === 1 && (
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
            )}

            {/* Step 2: Map with Collaborators & Materials */}
            {step === 2 && (
              <div className="space-y-6">
                {/* Interactive Map */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-light serif-font mb-6">Carte du Projet</h2>

                    {/* Map Container */}
                    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-6">
                      <div className="absolute inset-0">
                        <OSMap
                          latitude={-18.8792}
                          longitude={47.5079}
                          zoom={8}
                          className="w-full h-full"
                        />
                      </div>

                      {/* Legend */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                        <div className="flex items-center gap-4 text-xs font-light">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span>Collaborateurs</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-green-500" />
                            <span>Matières Premières</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 font-light">
                      Visualisez la localisation de vos collaborateurs et matières premières pour optimiser la
                      logistique et réduire l'empreinte carbone.
                    </p>
                  </CardContent>
                </Card>

                {/* Collaborators Section */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-blue-600" />
                        <h3 className="text-xl font-light serif-font">Collaborateurs</h3>
                        <Badge variant="outline" className="font-light">
                          {collaborators.length}
                        </Badge>
                      </div>
                      <Button
                        type="button"
                        onClick={() => setShowAddCollaborator(true)}
                        variant="outline"
                        size="sm"
                        className="font-light"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>

                    {showAddCollaborator && (
                      <CollaboratorForm onAdd={addCollaborator} onCancel={() => setShowAddCollaborator(false)} />
                    )}

                    <div className="space-y-3">
                      {collaborators.map((collab) => (
                        <div
                          key={collab.id}
                          className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <div>
                              <p className="font-light">{collab.name}</p>
                              <p className="text-sm text-gray-600 font-light">
                                {collab.role} • {collab.country}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            onClick={() => removeCollaborator(collab.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Materials Section */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-green-600" />
                        <h3 className="text-xl font-light serif-font">Matières Premières</h3>
                        <Badge variant="outline" className="font-light">
                          {materials.length}
                        </Badge>
                      </div>
                      <Button
                        type="button"
                        onClick={() => setShowAddMaterial(true)}
                        variant="outline"
                        size="sm"
                        className="font-light"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>

                    {showAddMaterial && <MaterialForm onAdd={addMaterial} onCancel={() => setShowAddMaterial(false)} />}

                    <div className="space-y-3">
                      {materials.map((mat) => (
                        <div
                          key={mat.id}
                          className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="font-light">{mat.name}</p>
                              <p className="text-sm text-gray-600 font-light">
                                {mat.type} • {mat.quantity} • {mat.country}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            onClick={() => removeMaterial(mat.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
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
                {step === 2 ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Créer le Projet
                  </>
                ) : (
                  "Suivant"
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

// Collaborator Form Component
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
    lat: -18.8792,
    lng: 47.5079,
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
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Nom du collaborateur"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="font-light"
          required
        />
        <Input
          placeholder="Rôle"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="font-light"
          required
        />
      </div>
      <select
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
      >
        <option value="Madagascar">Madagascar</option>
        <option value="Kenya">Kenya</option>
        <option value="Sénégal">Sénégal</option>
        <option value="Rwanda">Rwanda</option>
      </select>
      <div className="flex gap-2">
        <Button type="submit" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 font-light">
          <Check className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
        <Button type="button" onClick={onCancel} variant="outline" size="sm" className="font-light bg-transparent">
          Annuler
        </Button>
      </div>
    </form>
  )
}

// Material Form Component
function MaterialForm({ onAdd, onCancel }: { onAdd: (mat: Omit<Material, "id">) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "Textile",
    quantity: "",
    country: "Madagascar",
    lat: -19.0,
    lng: 46.0,
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
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Nom de la matière"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="font-light"
          required
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
        >
          <option value="Textile">Textile</option>
          <option value="Teinture">Teinture</option>
          <option value="Accessoire">Accessoire</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Quantité (ex: 50kg)"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="font-light"
          required
        />
        <select
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
        >
          <option value="Madagascar">Madagascar</option>
          <option value="Kenya">Kenya</option>
          <option value="Sénégal">Sénégal</option>
          <option value="Rwanda">Rwanda</option>
        </select>
      </div>
      <div className="flex gap-2">
        <Button type="submit" size="sm" className="bg-green-600 text-white hover:bg-green-700 font-light">
          <Check className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
        <Button type="button" onClick={onCancel} variant="outline" size="sm" className="font-light bg-transparent">
          Annuler
        </Button>
      </div>
    </form>
  )
}
