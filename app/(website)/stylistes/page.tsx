"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Instagram, Mail, MapPin, Award, Users, Palette } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import stylistes from "@/data/stylistes.json";

export default function StylistesPage() {

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <Header />
      {/* Hero Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">Nos Stylistes</h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Rencontrez les visionnaires qui façonnent l'avenir de la mode malgache. Chaque créateur apporte sa vision
              unique, son savoir-faire et sa passion pour une mode authentique et responsable.
            </p>
          </div>
        </div>
      </section>
      {/* Stylistes Profiles */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {stylistes.map((styliste, index) => (
              <Link key={styliste.id} href={`/stylistes/${styliste.id}`}>
                <div
                  className={`grid lg:grid-cols-2 gap-16 items-center group cursor-pointer ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  <div
                    className={`relative h-[600px] overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-500 ${
                      index % 2 === 1 ? "lg:col-start-2" : ""
                    }`}
                  >
                    <Image
                      src={styliste.image || "/placeholder.svg"}
                      alt={styliste.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <div>
                      <Badge variant="outline" className="mb-4 text-xs tracking-[0.15em] font-light uppercase">
                        {styliste.specialty}
                      </Badge>
                      <h2 className="text-4xl font-extralight tracking-[0.1em] serif-font mb-4">{styliste.name}</h2>
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="font-light">{styliste.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="font-light">{styliste.experience} d'expérience</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed font-light text-lg">{styliste.bio}</p>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-light mb-3 serif-font">Philosophie</h3>
                      <p className="text-gray-600 italic font-light leading-relaxed">"{styliste.philosophy}"</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-light mb-4 serif-font">Spécialités</h3>
                      <div className="flex flex-wrap gap-2">
                        {styliste.specialties.map((specialty: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs font-light">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 py-6 border-t border-gray-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Palette className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="text-2xl font-light serif-font">{styliste.collectionsCount}</div>
                        <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Collections</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Award className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="text-2xl font-light serif-font">{styliste.awardsCount}</div>
                        <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Prix</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="text-2xl font-light serif-font">{styliste.experience}</div>
                        <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Expérience</div>
                      </div>
                    </div>

                    <div className="flex gap-4">
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
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 bg-gray-50 text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extralight tracking-[0.2em] mb-6 serif-font">Rejoignez Notre Communauté</h2>
          <div className="w-32 h-px bg-black mx-auto mb-8" />
          <p className="text-gray-800 max-w-2xl mx-auto font-light leading-relaxed text-lg mb-12">
            Vous êtes styliste ou créateur malgache ? Rejoignez notre plateforme et partagez votre vision de la mode
            éthique.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase px-8 py-3">
            Devenir Partenaire
          </Button>
        </div>
      </section>
      <Footer /> {/* Added Footer */}
    </div>
  )
}
