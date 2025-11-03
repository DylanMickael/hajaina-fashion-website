"use client"

import { useState } from "react"
import { Plus, Trash2, Eye, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface WardrobeItem {
  id: string
  name: string
  category: string
  color: string
  images: string[]
  uploadDate: string
  timesWorn: number
  favorited: boolean
}

interface Outfit {
  id: string
  date: string
  name: string
  items: string[]
  weather?: string
  occasion?: string
}

interface OutfitPlannerProps {
  items: WardrobeItem[]
}

export default function OutfitPlanner({ items }: OutfitPlannerProps) {
  const [outfits, setOutfits] = useState<Outfit[]>([
    {
      id: "1",
      date: "2024-11-10",
      name: "Casual Weekend",
      items: ["1", "3"],
      weather: "Sunny",
      occasion: "Weekend",
    },
  ])

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [newOutfitName, setNewOutfitName] = useState("")
  const [newOccasion, setNewOccasion] = useState("Casual")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const occasions = ["Casual", "Work", "Party", "Date", "Sport", "Weekend", "Formal"]

  const handleAddOutfit = () => {
    if (!newOutfitName || selectedItems.length === 0) {
      alert("Complétez les champs")
      return
    }

    if (editingId) {
      setOutfits(
        outfits.map((o) =>
          o.id === editingId
            ? { ...o, date: selectedDate, name: newOutfitName, items: selectedItems, occasion: newOccasion }
            : o,
        ),
      )
      setEditingId(null)
    } else {
      const newOutfit: Outfit = {
        id: Math.random().toString(),
        date: selectedDate,
        name: newOutfitName,
        items: selectedItems,
        occasion: newOccasion,
      }
      setOutfits([...outfits, newOutfit])
    }

    setNewOutfitName("")
    setNewOccasion("Casual")
    setSelectedItems([])
    setShowForm(false)
  }

  const toggleItem = (itemId: string) => {
    setSelectedItems(
      selectedItems.includes(itemId) ? selectedItems.filter((id) => id !== itemId) : [...selectedItems, itemId],
    )
  }

  const deleteOutfit = (id: string) => {
    setOutfits(outfits.filter((o) => o.id !== id))
  }

  const editOutfit = (outfit: Outfit) => {
    setEditingId(outfit.id)
    setSelectedDate(outfit.date)
    setNewOutfitName(outfit.name)
    setNewOccasion(outfit.occasion || "Casual")
    setSelectedItems(outfit.items)
    setShowForm(true)
  }

  const outfitsForDate = outfits.filter((o) => o.date === selectedDate)

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const currentMonth = new Date(selectedDate)
  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)

  const calendarDays = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  return (
    <div className="p-12">
      <h2 className="text-3xl font-light serif-font tracking-wide mb-2">Planificateur de Tenues</h2>
      <p className="text-gray-600 font-light mb-10">Créez et organisez vos combinaisons de vêtements</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Calendar and Outfits */}
        <div className="lg:col-span-2">
          {/* Month/Year Selector */}
          <div className="mb-8">
            <input
              type="month"
              value={selectedDate.slice(0, 7)}
              onChange={(e) => setSelectedDate(e.target.value + "-01")}
              className="p-3 border border-gray-300 rounded font-light focus:border-black outline-none"
            />
          </div>

          {/* Simple Calendar Grid */}
          <div className="mb-8 bg-stone-50 p-6 rounded-lg">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                <div key={day} className="text-center text-xs font-light text-gray-600 uppercase py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, idx) => {
                const dateStr = day ? `${selectedDate.slice(0, 7)}-${String(day).padStart(2, "0")}` : ""
                const hasOutfit = outfits.some((o) => o.date === dateStr)

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (day) setSelectedDate(dateStr)
                    }}
                    className={`p-2 rounded text-sm font-light transition-all ${
                      !day
                        ? ""
                        : dateStr === selectedDate
                          ? "bg-black text-white"
                          : hasOutfit
                            ? "bg-blue-100 text-blue-900 border-2 border-blue-300"
                            : "hover:bg-gray-200"
                    }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Current Day Outfits */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-light serif-font">Tenues pour {selectedDate}</h3>
              <button
                onClick={() => {
                  setShowForm(!showForm)
                  setEditingId(null)
                  setNewOutfitName("")
                  setSelectedItems([])
                }}
                className="text-sm font-light hover:underline"
              >
                {showForm ? "Annuler" : "+ Nouvelle tenue"}
              </button>
            </div>

            {outfitsForDate.length === 0 && !showForm && (
              <p className="text-gray-500 font-light text-center py-6">Aucune tenue programmée</p>
            )}

            <div className="space-y-4">
              {outfitsForDate.map((outfit) => (
                <div
                  key={outfit.id}
                  className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-light serif-font text-lg">{outfit.name}</h4>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs font-light">
                          {outfit.occasion}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => editOutfit(outfit)} className="text-blue-600 hover:text-blue-800">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => deleteOutfit(outfit.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {outfit.items.map((itemId) => {
                      const item = items.find((i) => i.id === itemId)
                      return item ? (
                        <div key={itemId} className="group relative">
                          <img
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-20 object-cover rounded"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded transition-all flex items-center justify-center">
                            <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100" />
                          </div>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        {showForm && (
          <div className="bg-stone-50 p-8 rounded-lg border border-gray-200 h-fit lg:sticky lg:top-24">
            <h3 className="font-light serif-font text-lg mb-6">
              {editingId ? "Modifier la Tenue" : "Créer une Tenue"}
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-light mb-2 uppercase tracking-wide">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded font-light focus:border-black outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-light mb-2 uppercase tracking-wide">Nom de la tenue</label>
              <input
                type="text"
                value={newOutfitName}
                onChange={(e) => setNewOutfitName(e.target.value)}
                placeholder="Ex: Brunch Chic"
                className="w-full p-2 border border-gray-300 rounded font-light focus:border-black outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-light mb-2 uppercase tracking-wide">Occasion</label>
              <select
                value={newOccasion}
                onChange={(e) => setNewOccasion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded font-light focus:border-black outline-none"
              >
                {occasions.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-light mb-3 uppercase tracking-wide">
                Pièces ({selectedItems.length})
              </label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 p-2 hover:bg-white rounded cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className="w-4 h-4"
                    />
                    <img
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span className="font-light text-sm flex-1 truncate">{item.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              onClick={handleAddOutfit}
              disabled={!newOutfitName || selectedItems.length === 0}
              className="w-full bg-black text-white hover:bg-gray-800 py-3 font-light tracking-wide uppercase disabled:opacity-50"
            >
              <Plus className="h-4 w-4 mr-2" /> {editingId ? "Modifier" : "Créer"} la Tenue
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
