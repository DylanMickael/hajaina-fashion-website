"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, ArrowRight, Check } from "lucide-react"
import Link from "next/link"

export default function CreateExhibitionPage() {
  const [step, setStep] = useState<"info" | "upload" | "storytelling">("info")
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    duration: "1h",
    description: "",
  })
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [model3DReady, setModel3DReady] = useState(false)
  const [narrative, setNarrative] = useState<string[]>([""])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate3D = async () => {
    setIsGenerating(true)
    // Simulated 3D generation - in production, this would call Meshy API
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setModel3DReady(true)
    setIsGenerating(false)
  }

  const addNarrativeParagraph = () => {
    setNarrative([...narrative, ""])
  }

  const updateNarrative = (index: number, value: string) => {
    const updated = [...narrative]
    updated[index] = value
    setNarrative(updated)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-5xl font-light tracking-[0.15em] serif-font mb-2">Créer une Exposition</h1>
          <p className="text-gray-600 font-light text-sm tracking-wide">
            Étape {step === "info" ? "1" : step === "upload" ? "2" : "3"} / 3
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl">
          {/* Step 1: Basic Info */}
          {step === "info" && (
            <Card className="border-0 shadow-none">
              <CardContent className="p-8 space-y-8">
                <div>
                  <label className="block text-sm font-light tracking-wide mb-3">Titre de l'exposition</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Heritage Moderne"
                    className="border-gray-300 font-light tracking-wide"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light tracking-wide mb-3">Date</label>
                    <Input
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="border-gray-300 font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light tracking-wide mb-3">Durée</label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded font-light tracking-wide"
                    >
                      <option>30 min</option>
                      <option>1h</option>
                      <option>2h</option>
                      <option>3h</option>
                      <option>4h</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light tracking-wide mb-3">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez votre exposition..."
                    className="border-gray-300 font-light tracking-wide min-h-24"
                  />
                </div>

                <div className="flex gap-4">
                  <Link href="/dashboard/exhibitions" className="flex-1">
                    <Button variant="outline" className="w-full font-light tracking-wide bg-transparent">
                      Annuler
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setStep("upload")}
                    disabled={!formData.title}
                    className="flex-1 bg-black text-white hover:bg-gray-800 font-light tracking-wide"
                  >
                    Suivant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Upload & Generate 3D */}
          {step === "upload" && (
            <Card className="border-0 shadow-none">
              <CardContent className="p-8 space-y-8">
                <div>
                  <label className="block text-sm font-light tracking-wide mb-3">Upload de l'image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {uploadedImage ? (
                        <div>
                          <img
                            src={uploadedImage || "/placeholder.svg"}
                            alt="Uploaded"
                            className="h-64 mx-auto mb-4 rounded"
                          />
                          <p className="text-sm font-light text-gray-600">Cliquez pour changer l'image</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <p className="font-light tracking-wide mb-2">Déposez votre image ici</p>
                          <p className="text-sm text-gray-600 font-light">ou cliquez pour sélectionner</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {uploadedImage && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                      <div className="flex items-center gap-3">
                        {model3DReady ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : isGenerating ? (
                          <div className="animate-spin">
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                        <span className="font-light tracking-wide">
                          Modèle 3D: {isGenerating ? "Génération..." : model3DReady ? "Prêt" : "En attente"}
                        </span>
                      </div>
                    </div>

                    {!isGenerating && !model3DReady && (
                      <Button
                        onClick={handleGenerate3D}
                        className="w-full bg-black text-white hover:bg-gray-800 font-light tracking-wide"
                      >
                        Générer le modèle 3D
                      </Button>
                    )}

                    {isGenerating && (
                      <div className="p-4 bg-blue-50 text-blue-900 rounded font-light text-sm tracking-wide">
                        Génération en cours... Cela peut prendre quelques minutes. Vous pouvez continuer en cliquant
                        ci-dessous.
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep("info")} className="flex-1 font-light tracking-wide">
                    Retour
                  </Button>
                  <Button
                    onClick={() => setStep("storytelling")}
                    disabled={!uploadedImage}
                    className="flex-1 bg-black text-white hover:bg-gray-800 font-light tracking-wide"
                  >
                    Suivant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Storytelling */}
          {step === "storytelling" && (
            <Card className="border-0 shadow-none">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-light tracking-wide serif-font mb-6">Racontez l'histoire</h2>

                  <div className="space-y-6">
                    {narrative.map((para, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="font-light">
                            Paragraphe {index + 1}
                          </Badge>
                          {para.length > 0 && <Check className="w-4 h-4 text-green-600" />}
                        </div>
                        <Textarea
                          value={para}
                          onChange={(e) => updateNarrative(index, e.target.value)}
                          placeholder={`Écrivez le paragraphe ${index + 1} de votre histoire...`}
                          className="border-gray-300 font-light tracking-wide min-h-24"
                        />
                        <p className="text-xs text-gray-500 font-light">{para.length} caractères</p>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={addNarrativeParagraph}
                    variant="outline"
                    className="w-full mt-6 font-light tracking-wide bg-transparent"
                  >
                    + Ajouter un paragraphe
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep("upload")}
                    className="flex-1 font-light tracking-wide"
                  >
                    Retour
                  </Button>
                  <Link href="/dashboard/exhibitions" className="flex-1">
                    <Button className="w-full bg-black text-white hover:bg-gray-800 font-light tracking-wide">
                      Terminer
                      <Check className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
