"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Map } from "@/components/ui/map"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, MapPin, Users, Package, Leaf, Target, Calendar } from "lucide-react"
import Image from "next/image"

type ProjectType = "brand" | "collection" | "sustainable" | "recycling"
type ProjectStep = "info" | "materials" | "collaborators"

export default function CreateProjectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<ProjectStep>("info")
  const [projectType, setProjectType] = useState<ProjectType>("brand")
  const [location, setLocation] = useState("")

  const projectTypes = [
    {
      id: "brand" as ProjectType,
      title: "Créer une marque de mode durable",
      description: "Lancez votre propre marque de vêtements éthiques et durables",
      icon: Leaf,
    },
    {
      id: "collection" as ProjectType,
      title: "Créer une collection capsule",
      description: "Concevez une collection limitée avec des matériaux durables",
      icon: Target,
    },
    {
      id: "sustainable" as ProjectType,
      title: "Transformer une marque existante",
      description: "Rendez votre marque plus durable et éthique",
      icon: Package,
    },
    {
      id: "recycling" as ProjectType,
      title: "Projet de recyclage textile",
      description: "Créez un système de recyclage ou upcycling",
      icon: Users,
    },
  ]

  // Exemple de données pour les matériaux
  const suggestedMaterials = [
    {
      id: 1,
      name: "Coton biologique certifié GOTS",
      supplier: "ÉcoTextile Innovations",
      location: "Antananarivo",
      price: "15,000 Ar/m",
      minOrder: "50m",
      image: "/collabs/organic-fabric-samples.jpg",
      sustainability: ["Bio", "Local", "Équitable"],
    },
    {
      id: 2,
      name: "Soie sauvage de Madagascar",
      supplier: "Artisans de la Soie",
      location: "Amoron'i Mania",
      price: "45,000 Ar/m",
      minOrder: "20m",
      image: "/collabs/organic-fabric-samples.jpg",
      sustainability: ["Local", "Artisanal", "Traditionnel"],
    },
  ]

  // Exemple de données pour les collaborateurs
  const potentialCollaborators = [
    {
      id: 1,
      name: "Studio Créatif Malagasy",
      expertise: ["Design", "Production", "Marketing"],
      location: "Antananarivo",
      rating: 4.8,
      projects: 24,
      image: "/img/Hery.jpg",
    },
    {
      id: 2,
      name: "Atelier Ethique & Mode",
      expertise: ["Couture", "Formation", "Conseil"],
      location: "Tamatave",
      rating: 4.6,
      projects: 18,
      image: "/img/Collab1.jpg",
    },
  ]

  const renderStep = () => {
    switch (currentStep) {
      case "info":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-light serif-font mb-6">Informations sur le projet</h2>
            <div className="grid grid-cols-2 gap-6">
              {projectTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all duration-500 hover:shadow-lg ${
                    projectType === type.id ? "bg-gray-50" : "hover:border-gray-300"
                  }`}
                  onClick={() => setProjectType(type.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <type.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{type.title}</CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nom du projet</label>
                <Input placeholder="Ex: Collection Été Durable 2026" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea
                  className="border-gray-200"
                  placeholder="Décrivez votre vision et vos objectifs..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Localisation</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Ville, Région"
                      className="pl-10"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Date de lancement prévue</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="date"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "materials":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-light serif-font mb-6">Matériaux recommandés</h2>
            
            <div className="grid grid-cols-2 gap-6">
              {suggestedMaterials.map((material) => (
                <Card key={material.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="relative h-48">
                    <Image
                      src={material.image}
                      alt={material.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{material.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{material.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Fourni par {material.supplier}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {material.sustainability.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">À partir de</p>
                        <p className="font-semibold text-primary">{material.price}</p>
                      </div>
                      <Button size="sm">
                        Sélectionner
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "collaborators":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-light serif-font mb-6">Collaborateurs potentiels</h2>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <Map
                  center={{ lat: -18.8792, lng: 47.5079 }} // Centre d'Antananarivo
                  zoom={12}
                  markers={potentialCollaborators.map(collaborator => ({
                    position: {
                      lat: collaborator.location === "Antananarivo" ? -18.8792 : -18.1499,
                      lng: collaborator.location === "Antananarivo" ? 47.5079 : 49.4023,
                    },
                    title: collaborator.name,
                    description: `${collaborator.expertise.join(", ")} • ${collaborator.rating}⭐`
                  }))}
                  onMarkerClick={(marker) => {
                    // Vous pouvez ajouter une logique pour filtrer ou mettre en évidence le collaborateur sélectionné
                    console.log(marker)
                  }}
                />

                <div className="mt-6 space-y-4">
                  {potentialCollaborators.map((collaborator) => (
                    <Card key={collaborator.id} className="hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="relative w-16 h-16">
                            <Image
                              src={collaborator.image}
                              alt={collaborator.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{collaborator.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{collaborator.location}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {collaborator.expertise.map((skill) => (
                                <Badge key={skill} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 text-sm">
                                <span>⭐ {collaborator.rating}</span>
                                <span className="text-muted-foreground">{collaborator.projects} projets</span>
                              </div>
                              <Button size="sm">
                                Contacter
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Filtres de recherche</CardTitle>
                    <CardDescription>Affinez votre recherche de collaborateurs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Expertise</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une expertise" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="production">Production</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="couture">Couture</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Zone géographique</label>
                        <Input
                          type="text"
                          placeholder="Ville ou région"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Note minimum</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une note" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="4.5">4.5+ étoiles</SelectItem>
                            <SelectItem value="4">4+ étoiles</SelectItem>
                            <SelectItem value="3.5">3.5+ étoiles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Projets réalisés</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Nombre de projets" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="20">20+ projets</SelectItem>
                            <SelectItem value="10">10+ projets</SelectItem>
                            <SelectItem value="5">5+ projets</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button className="w-full mt-4">
                        Appliquer les filtres
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <Header />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              className="font-light"
              variant="outline"
              onClick={() => {
                if (currentStep === "materials") setCurrentStep("info")
                if (currentStep === "collaborators") setCurrentStep("materials")
              }}
              disabled={currentStep === "info"}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              PRECEDENT
            </Button>
            <Button
              className="bg-black text-white hover:bg-800 font-light"
              onClick={() => {
                if (currentStep === "info") setCurrentStep("materials")
                else if (currentStep === "materials") setCurrentStep("collaborators")
                else router.push("/collaborations")
              }}
            >
              {currentStep === "collaborators" ? "TERMINER" : "SUIVANT"}
              {currentStep !== "collaborators" && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
