"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Instagram, Mail, MapPin, Award, Users, Palette, Handshake } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer" // Added import

export default function StylisteProfilePage() {
  const { id } = useParams()
  const router = useRouter()
  const [styliste, setStyliste] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Simulate fetching stylist data
  useEffect(() => {
    setLoading(true)
    const allStylistes = [
      {
        id: "1",
        name: "Miora Rasoanaivo",
        specialty: "Couture Traditionnelle",
        image: "/img/Miora.jpg",
        location: "Antananarivo",
        experience: "15 ans",
        collectionsCount: 8,
        awardsCount: 3,
        bio: "Diplômée de l'École de Mode de Paris, Miora a consacré sa carrière à la valorisation des techniques traditionnelles malgaches. Elle travaille exclusivement avec des artisans locaux pour créer des pièces uniques qui racontent l'histoire de Madagascar. Son travail est une ode à l'authenticité et à la transmission du savoir-faire ancestral.",
        philosophy:
          "La mode doit être un pont entre les générations, préservant notre héritage tout en embrassant l'avenir. Chaque fil tissé est une connexion avec nos racines.",
        specialties: ["Tissage traditionnel", "Broderie malgache", "Teintures naturelles", "Haute couture éthique"],
        instagram: "@miora_couture",
        email: "contact@mioracouture.mg",
        featuredCollections: [
          {
            title: "Collection Automne 2024",
            image: "/placeholder.svg?height=400&width=300&text=Miora+Autumn+Collection",
            link: "/collections/1",
          },
          {
            title: "Heritage Moderne",
            image: "/placeholder.svg?height=400&width=300&text=Miora+Heritage+Collection",
            link: "/collections/4",
          },
        ],
      },
      {
        id: "2",
        name: "Hery Andriantsoa",
        specialty: "Mode Durable",
        image: "/img/Hery.jpg",
        location: "Fianarantsoa",
        experience: "12 ans",
        collectionsCount: 6,
        awardsCount: 5,
        bio: "Pionnier de la mode éco-responsable à Madagascar, Hery développe des techniques innovantes de recyclage textile. Son atelier fonctionne entièrement à l'énergie solaire et emploie 50 artisans locaux, garantissant un impact environnemental minimal et un impact social maximal.",
        philosophy: "Créer de la beauté sans compromettre l'avenir de notre planète. La durabilité est notre luxe.",
        specialties: ["Upcycling textile", "Matériaux bio", "Production zéro déchet", "Design circulaire"],
        instagram: "@hery_sustainable",
        email: "hery@ecofashion.mg",
        featuredCollections: [
          {
            title: "Eco-Luxe Series",
            image: "/placeholder.svg?height=400&width=300&text=Hery+Eco-Luxe+Collection",
            link: "/collections/2",
          },
          {
            title: "Soie Sauvage",
            image: "/placeholder.svg?height=400&width=300&text=Hery+Wild+Silk+Collection",
            link: "/collections/5",
          },
        ],
      },
      {
        id: "3",
        name: "Lalaina Rakoto",
        specialty: "Prêt-à-Porter",
        image: "/img/Lalaina.jpg",
        location: "Toamasina",
        experience: "8 ans",
        collectionsCount: 12,
        awardsCount: 2,
        bio: "Jeune créatrice dynamique, Lalaina mélange influences urbaines et identité malgache. Ses créations séduisent une clientèle internationale tout en restant profondément ancrées dans la culture locale. Elle est la voix de la nouvelle génération de la mode malgache.",
        philosophy: "La mode malgache peut conquérir le monde sans perdre son âme. L'audace est notre signature.",
        specialties: ["Design contemporain", "Streetwear chic", "Accessoires innovants", "Mode unisexe"],
        instagram: "@lalaina_design",
        email: "lalaina@urbanmalagasy.com",
        featuredCollections: [
          {
            title: "Urban Malagasy",
            image: "/placeholder.svg?height=400&width=300&text=Lalaina+Urban+Collection",
            link: "/collections/3",
          },
          {
            title: "Nouvelle Vague",
            image: "/placeholder.svg?height=400&width=300&text=Lalaina+New+Wave+Collection",
            link: "/collections/6",
          },
        ],
      },
    ]
    const foundStyliste = allStylistes.find((s) => s.id === id)
    if (foundStyliste) {
      setStyliste(foundStyliste)
    } else {
      router.push("/stylistes") // Redirect if not found
    }
    setLoading(false)
  }, [id, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p>Chargement du profil du styliste...</p>
      </div>
    )
  }

  if (!styliste) {
    return null // Should redirect by now
  }

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
            Retour aux stylistes
          </Button>

          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-1">
              <div className="relative h-[500px] overflow-hidden rounded-lg shadow-lg mb-8">
                <Image src={styliste.image || "/placeholder.svg"} alt={styliste.name} fill className="object-cover" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-extralight tracking-[0.1em] serif-font">{styliste.name}</h2>
                <Badge variant="outline" className="text-sm tracking-[0.15em] font-light uppercase">
                  {styliste.specialty}
                </Badge>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="font-light">{styliste.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="font-light">{styliste.experience} d'expérience</span>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 font-light tracking-wide bg-transparent"
                  >
                    <Instagram className="h-4 w-4" />
                    {styliste.instagram}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 font-light tracking-wide bg-transparent"
                  >
                    <Mail className="h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-4xl font-extralight tracking-[0.1em] serif-font mb-6">Biographie</h2>
                <p className="text-gray-700 leading-relaxed font-light text-lg">{styliste.bio}</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-light mb-4 serif-font">Philosophie</h3>
                <p className="text-gray-600 italic font-light leading-relaxed text-lg">"{styliste.philosophy}"</p>
              </div>

              <div>
                <h3 className="text-2xl font-light mb-4 serif-font">Spécialités</h3>
                <div className="flex flex-wrap gap-3">
                  {styliste.specialties.map((specialty: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-sm font-light">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 py-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Palette className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-3xl font-light serif-font">{styliste.collectionsCount}</div>
                  <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Collections</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-3xl font-light serif-font">{styliste.awardsCount}</div>
                  <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Prix</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-3xl font-light serif-font">{styliste.experience}</div>
                  <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Expérience</div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-light mb-6 serif-font">Collections Phares</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {styliste.featuredCollections.map((col: any, idx: number) => (
                    <Link key={idx} href={col.link} className="group block">
                      <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
                        <Image
                          src={col.image || "/placeholder.svg"}
                          alt={col.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <h4 className="absolute bottom-4 left-4 text-white text-xl font-light serif-font">
                          {col.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-8 border-t border-gray-200">
                <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase px-8 py-3">
                  <Handshake className="mr-2 h-4 w-4" />
                  Manaja
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-gray-300 hover:border-black font-light tracking-[0.1em] uppercase px-8 py-3"
                >
                  Collaborer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer /> {/* Added Footer */}
    </div>
  )
}
