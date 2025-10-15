"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash, ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer" // Added import

export default function MyBlogPage() {
  const router = useRouter()
  const blogPosts = [
    {
      id: 1,
      title: "Mon premier article sur la mode éthique",
      content: "Ceci est le contenu de mon premier article de blog sur la mode éthique et durable...",
      date: "2024-07-20",
    },
    {
      id: 2,
      title: "Derrière les coulisses de ma dernière collection",
      content: "Découvrez le processus créatif et les inspirations de ma nouvelle collection...",
      date: "2024-07-15",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <Header />
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8 text-sm font-light tracking-wide flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au tableau de bord
          </Button>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">Mon Blog</h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Gérez vos articles de blog, partagez vos inspirations et votre vision de la mode éthique.
            </p>
          </div>

          <div className="flex justify-end mb-8">
            <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel Article
            </Button>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-light mb-2 serif-font tracking-wide">{post.title}</h2>
                      <p className="text-gray-500 text-sm font-light">Publié le: {post.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      <Button variant="destructive" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-light line-clamp-3">{post.content}</p>
                  <Button variant="link" className="mt-4 px-0 text-black hover:text-gray-700 font-light">
                    Lire la suite
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-extralight tracking-[0.1em] mb-6 serif-font">Créer un nouvel article</h2>
            <div className="w-24 h-px bg-black mx-auto mb-8" />
            <form className="space-y-6 max-w-2xl mx-auto">
              <div>
                <label htmlFor="title" className="block text-sm font-light mb-2 tracking-wide text-left">
                  Titre de l'article
                </label>
                <Input id="title" placeholder="Titre de votre article" className="font-light" />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-light mb-2 tracking-wide text-left">
                  Contenu de l'article
                </label>
                <Textarea id="content" placeholder="Écrivez votre article ici..." rows={10} className="font-light" />
              </div>
              <Button
                type="submit"
                className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase px-8 py-3"
              >
                Publier l'Article
                <Plus className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
      <Footer /> {/* Added Footer */}
    </div>
  )
}
