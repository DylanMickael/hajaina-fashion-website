"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Tag, Shirt, CheckCircle } from "lucide-react" // Added icons

export default function DepotVetementsPage() {
  const depositedItems = [
    {
      id: 1,
      name: "Robe d'été en lin",
      description: "Robe légère en lin beige, taille M, portée deux fois. Parfait état.",
      category: "Robes",
      condition: "Très bon état",
      date: "2024-07-20",
    },
    {
      id: 2,
      name: "Pantalon en coton bio",
      description: "Pantalon noir coupe droite, taille L, légèrement délavé aux genoux.",
      category: "Pantalons",
      condition: "Bon état",
      date: "2024-07-18",
    },
    {
      id: 3,
      name: "Sac à main en raphia",
      description: "Sac artisanal en raphia, fait main, quelques fils tirés.",
      category: "Accessoires",
      condition: "État correct",
      date: "2024-07-15",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <Header />
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">Espace Dépôt</h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Déposez vos vêtements et accessoires de mode éthique pour qu'ils trouvent une seconde vie. Remplissez le
              formulaire ci-dessous avec les détails de vos articles.
            </p>
          </div>

          <div className="max-w-2xl mx-auto p-8 rounded-lg shadow-none hover:shadow-lg transition-shadow duration-300">
            <form className="space-y-6">
              <div>
                <label htmlFor="item-name" className="block text-sm font-light text-gray-700 mb-2">
                  Nom de l'article
                </label>
                <Input id="item-name" className="border border-gray-300 bg-white/10 placeholder:text-gray-400" placeholder="Ex: Robe en coton bio" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-light text-gray-700 mb-2">
                  Description
                </label>
                <Textarea id="description" className="border border-gray-300 bg-white/10 placeholder:text-gray-400" placeholder="Décrivez l'article, son état, sa taille, etc." rows={4} />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-light text-gray-700 mb-2">
                  Catégorie
                </label>
                <Input id="category" className="border border-gray-300 bg-white/10 placeholder:text-gray-400" placeholder="Ex: Robes, Pantalons, Accessoires" />
              </div>
              <div>
                <label htmlFor="condition" className="block text-sm font-light text-gray-700 mb-2">
                  État
                </label>
                <Input id="condition" className="border border-gray-300 bg-white/10 placeholder:text-gray-400" placeholder="Ex: Neuf avec étiquette, Très bon état, Bon état" />
              </div>
              <div>
                <label htmlFor="photos" className="block text-sm font-light text-gray-700 mb-2">
                  Photos (URL)
                </label>
                <Input id="photos" className="border border-gray-300 bg-white/10 placeholder:text-gray-400" type="url" placeholder="URL de l'image 1, URL de l'image 2..." />
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase"
              >
                Déposer l'article
              </Button>
            </form>
          </div>

          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">Articles Déposés</h2>
              <div className="w-32 h-px bg-black mx-auto mb-8" />
              <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
                Voici la liste des vêtements que vous avez déjà déposés pour recyclage ou transformation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {depositedItems.map((item) => (
                <Card key={item.id} className="border-0 shadow-none hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-light mb-3 serif-font tracking-wide">{item.name}</CardTitle>
                    <p className="text-gray-600 text-sm leading-relaxed font-light mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 font-light">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-gray-500" />
                        <span>Catégorie: {item.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-gray-500" />
                        <span>État: {item.condition}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shirt className="h-4 w-4 text-gray-500" />
                        <span>Déposé le: {item.date}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-6 w-full bg-transparent border-gray-300 hover:border-black font-light tracking-[0.1em] uppercase"
                    >
                      Voir les détails
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
