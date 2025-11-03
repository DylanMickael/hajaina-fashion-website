"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface WardrobeUploadProps {
  onItemsAdded: (items: any[]) => void
}

export default function WardrobeUpload({ onItemsAdded }: WardrobeUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [itemName, setItemName] = useState("")
  const [category, setCategory] = useState("Tops")
  const [color, setColor] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const categories = ["Tops", "Bottoms", "Dresses", "Jackets", "Accessories", "Shoes", "Outerwear"]
  const colors = ["Black", "White", "Cream", "Blue", "Red", "Green", "Brown", "Beige", "Gray", "Pink"]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    const imageFiles = droppedFiles.filter((file) => file.type.startsWith("image/"))
    setFiles([...files, ...imageFiles])
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (files.length < 4) {
      alert("Veuillez ajouter au moins 4 photos")
      return
    }

    if (!itemName || !color) {
      alert("Complétez tous les champs")
      return
    }

    const newItem = {
      id: Math.random().toString(),
      name: itemName,
      category,
      color,
      images: files.map((f) => URL.createObjectURL(f)),
      uploadDate: new Date().toISOString().split("T")[0],
      timesWorn: 0,
      favorited: false,
    }

    onItemsAdded([newItem])
    setFiles([])
    setItemName("")
    setColor("")
    alert("Vêtement ajouté avec succès!")
  }

  return (
    <div className="p-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-light serif-font tracking-wide mb-2">Ajouter un Vêtement</h2>
        <p className="text-gray-600 font-light mb-10">Uploadez au moins 4 photos pour créer un modèle 3D</p>

        {/* Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center mb-8 transition-all ${
            dragActive ? "border-black bg-stone-50" : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 font-light mb-2">Glissez vos photos ici</p>
          <p className="text-sm text-gray-500 font-light mb-4">ou</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && setFiles([...files, ...Array.from(e.target.files)])}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button
              variant="outline"
              className="cursor-pointer border-black text-black hover:bg-stone-50 bg-transparent"
            >
              Parcourir les fichiers
            </Button>
          </label>
        </div>

        {/* Files Preview */}
        {files.length > 0 && (
          <div className="mb-8">
            <p className="text-sm font-light text-gray-600 mb-4">
              {files.length} photo{files.length > 1 ? "s" : ""} ajoutée{files.length > 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-4 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-black text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-light mb-2 uppercase tracking-wide">Nom du vêtement</label>
            <Input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Ex: Robe Linoée Ivoire"
              className="border-gray-300 focus:border-black font-light"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-light mb-2 uppercase tracking-wide">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded font-light focus:border-black outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-light mb-2 uppercase tracking-wide">Couleur</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded font-light focus:border-black outline-none"
              >
                <option value="">Sélectionner</option>
                {colors.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleSubmit}
            disabled={files.length < 4}
            className="flex-1 bg-black text-white hover:bg-gray-800 py-6 font-light tracking-wide uppercase disabled:opacity-50"
          >
            Générer Modèle 3D
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-300 font-light tracking-wide uppercase bg-transparent"
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  )
}
