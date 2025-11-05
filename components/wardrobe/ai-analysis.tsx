"use client"

import { useState } from "react"
import { Sparkles, TrendingUp, AlertCircle, Download, RefreshCw } from "lucide-react"
import { Card } from "@/components/ui/card"
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

interface AIAnalysisProps {
  items: WardrobeItem[]
}

export default function AIAnalysis({ items }: AIAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)

  // Mock AI insights
  const insights = {
    colorBalance: {
      dominant: "Neutral (Black, White, Cream)",
      recommendation: "Considérez d'ajouter des touches de couleur comme bleu marine ou bourgogne",
      items: items.filter((i) => ["Black", "White", "Cream"].includes(i.color)).length,
    },
    categoryBalance: {
      gaps: ["Accessories", "Outerwear"],
      recommendation: "Vos pièces d'accessoires sont limitées. Des écharpes et chapeaux pourraient enrichir vos tenues",
    },
    sustainability: {
      score: Math.min(95, 60 + items.length * 5),
      recommendation:
        "Excellent! Vous réutilisez vos pièces régulièrement. Continuez à favoriser les basiques intemporels",
    },
    styling: {
      suggestion: "Essayez de combiner les pièces de couleurs différentes pour créer des contrastes intéressants",
      trend: "Les combinaisons neutre + texture sont tendance cette saison",
    },
  }

  const mostWorn =
    items.length > 0 ? items.reduce((prev, current) => (prev.timesWorn > current.timesWorn ? prev : current)) : null
  const leastWorn =
    items.length > 0 ? items.reduce((prev, current) => (prev.timesWorn < current.timesWorn ? prev : current)) : null

  const colorCounts: Record<string, number> = {}
  items.forEach((item) => {
    colorCounts[item.color] = (colorCounts[item.color] || 0) + 1
  })
  const sortedColors = Object.entries(colorCounts).sort(([, a], [, b]) => b - a)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  return (
    <div className="p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-light serif-font tracking-wide mb-2 flex items-center gap-3">
          <Sparkles className="h-8 w-8" /> Analyse de votre Garde-Robe
        </h2>
        <p className="text-gray-600 font-light">Insights personnalisés pour optimiser votre collection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Color Balance */}
        <Card
          className="p-6 border-0 shadow-sm bg-gradient-to-br from-stone-50 to-stone-100 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedInsight(selectedInsight === "color" ? null : "color")}
        >
          <h3 className="font-light serif-font text-lg mb-4">Palette de Couleurs</h3>
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-600 font-light mb-2">Couleur Dominante</p>
              <p className="font-light text-base">{insights.colorBalance.dominant}</p>
            </div>
            {selectedInsight === "color" && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-light text-gray-600 mb-3 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{insights.colorBalance.recommendation}</span>
                </p>
                <div className="space-y-2">
                  {sortedColors.slice(0, 5).map(([color, count]) => (
                    <div key={color} className="flex justify-between items-center">
                      <span className="text-sm font-light">{color}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-black transition-all"
                            style={{ width: `${(count / items.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-light text-gray-600 w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {["black", "white", "#d4cfc9", "#4a90e2", "#8b4513"].map((color, idx) => (
              <div key={idx} className="flex-1 h-12 rounded" style={{ backgroundColor: color }} />
            ))}
          </div>
        </Card>

        {/* Sustainability Score */}
        <Card
          className="p-6 border-0 shadow-sm bg-gradient-to-br from-stone-50 to-stone-100 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedInsight(selectedInsight === "sustainability" ? null : "sustainability")}
        >
          <h3 className="font-light serif-font text-lg mb-4">Score de Durabilité</h3>
          <div className="mb-6">
            <div className="text-5xl font-light mb-2">{insights.sustainability.score}%</div>
            <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all"
                style={{ width: `${insights.sustainability.score}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 font-light mt-2">
              {items.length} pièces • {items.reduce((sum, i) => sum + i.timesWorn, 0)} fois portées
            </p>
          </div>
          {selectedInsight === "sustainability" && (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm font-light text-gray-600 flex items-start gap-2">
                <TrendingUp className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{insights.sustainability.recommendation}</span>
              </p>
            </div>
          )}
        </Card>

        {/* Category Balance */}
        <Card
          className="p-6 border-0 shadow-sm bg-gradient-to-br from-stone-50 to-stone-100 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedInsight(selectedInsight === "category" ? null : "category")}
        >
          <h3 className="font-light serif-font text-lg mb-4">Équilibre des Catégories</h3>
          <div className="space-y-3 mb-6">
            {Array.from(new Set(items.map((i) => i.category)))
              .sort(
                (a, b) =>
                  (items.filter((i) => i.category === b).length || 0) -
                  (items.filter((i) => i.category === a).length || 0),
              )
              .map((cat) => (
                <div key={cat}>
                  <div className="flex justify-between text-sm font-light mb-1">
                    <span>{cat}</span>
                    <span className="text-gray-600">{items.filter((i) => i.category === cat).length}</span>
                  </div>
                  <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-black h-full transition-all"
                      style={{ width: `${(items.filter((i) => i.category === cat).length / items.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
          {selectedInsight === "category" && (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm font-light text-gray-600 mb-2">
                <strong className="font-medium">Lacunes détectées:</strong> {insights.categoryBalance.gaps.join(", ")}
              </p>
              <p className="text-sm font-light text-gray-600 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{insights.categoryBalance.recommendation}</span>
              </p>
            </div>
          )}
        </Card>

        {/* Styling Suggestions */}
        <Card
          className="p-6 border-0 shadow-sm bg-gradient-to-br from-stone-50 to-stone-100 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedInsight(selectedInsight === "styling" ? null : "styling")}
        >
          <h3 className="font-light serif-font text-lg mb-4">Suggestions de Style</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="font-light text-base mb-2">Tendance Actuelle</p>
              <p className="text-sm text-gray-600 font-light">{insights.styling.trend}</p>
            </div>
            {selectedInsight === "styling" && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-light text-base mb-2">Combinaison Suggérée</p>
                <p className="text-sm text-gray-600 font-light">{insights.styling.suggestion}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {mostWorn && (
          <Card className="p-6 border-0 shadow-sm bg-blue-50">
            <h4 className="font-light serif-font text-lg mb-3">Pièce la Plus Portée</h4>
            <div className="flex gap-4">
              <img
                src={mostWorn.images[0] || "/placeholder.svg"}
                alt={mostWorn.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <p className="font-light text-base">{mostWorn.name}</p>
                <p className="text-sm text-gray-600 font-light">{mostWorn.timesWorn} fois portée</p>
                <Badge className="mt-2 bg-blue-600 text-white font-light">Vos favori absolu!</Badge>
              </div>
            </div>
          </Card>
        )}

        {leastWorn && (
          <Card className="p-6 border-0 shadow-sm bg-orange-50">
            <h4 className="font-light serif-font text-lg mb-3">Pièce à Redécouvrir</h4>
            <div className="flex gap-4">
              <img
                src={leastWorn.images[0] || "/placeholder.svg"}
                alt={leastWorn.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <p className="font-light text-base">{leastWorn.name}</p>
                <p className="text-sm text-gray-600 font-light">{leastWorn.timesWorn} fois portée</p>
                <Badge className="mt-2 bg-orange-600 text-white font-light">À explorer</Badge>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="flex-1 min-w-[250px] bg-black text-white hover:bg-gray-800 py-6 font-light tracking-wide uppercase disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? "animate-spin" : ""}`} />
          {isAnalyzing ? "Analyse en cours..." : "Générer Nouvelles Suggestions"}
        </Button>
        <Button
          variant="outline"
          className="flex-1 min-w-[250px] border-gray-300 py-6 font-light tracking-wide uppercase bg-transparent"
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter Analyse
        </Button>
      </div>
    </div>
  )
}
