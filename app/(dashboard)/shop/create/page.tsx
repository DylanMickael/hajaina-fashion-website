"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Upload, Leaf } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function CreateProductPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    category: "vetement",
    price: "",
    description: "",
    material: "",
    madein: "Madagascar",
    stock: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      alert("Produit créé avec succès!")
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Back Button */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-light text-sm">Retour à la boutique</span>
          </Link>

          {/* Header */}
          <h1 className="text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">Ajouter un Produit</h1>
          <div className="w-32 h-px bg-black mb-12" />

          {/* Progress Indicator */}
          <div className="flex items-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-light transition-all ${
                    s <= step ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && <div className={`h-px flex-1 w-12 ${s < step ? "bg-black" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-light serif-font mb-6">Informations de Base</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Nom du Produit</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
                        placeholder="Ex: Robe Malagasy Upcycled"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Catégorie</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
                      >
                        <option value="vetement">Vêtement</option>
                        <option value="recyclable">Recyclable</option>
                        <option value="accessoire">Accessoire</option>
                        <option value="chaussure">Chaussure</option>
                      </select>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                      <Leaf className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-light text-green-800">
                        Les produits recyclables reçoivent une visibilité prioritaire et attirent les acheteurs
                        éco-conscients!
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-gray-600 mb-2">Prix (€)</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
                          placeholder="0.00"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-600 mb-2">Stock</label>
                        <input
                          type="number"
                          name="stock"
                          value={formData.stock}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
                          placeholder="0"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-light serif-font mb-6">Détails du Produit</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none resize-none"
                        rows={5}
                        placeholder="Décrivez votre produit..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Matière Première</label>
                      <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
                        placeholder="Ex: Coton recyclé, lin biologique"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-gray-600 mb-2">Fabriqué en</label>
                      <select
                        name="madein"
                        value={formData.madein}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
                      >
                        <option value="Madagascar">Madagascar</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Senegal">Sénégal</option>
                        <option value="Rwanda">Rwanda</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Images & Publish */}
            {step === 3 && (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-light serif-font mb-6">Images & Publication</h2>

                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-black transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                      <p className="font-light text-gray-600 mb-2">Cliquez ou glissez pour ajouter des images</p>
                      <p className="text-xs text-gray-500 font-light">PNG, JPG jusqu'à 10MB</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-light text-blue-800">
                        Conseil: Utilisez au minimum 3 images de haute qualité pour un meilleur taux de conversion.
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" defaultChecked />
                        <span className="font-light text-sm">Publier le produit maintenant</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                {step === 3 ? "Créer le Produit" : "Suivant"}
              </Button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  )
}
