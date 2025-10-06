"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Globe, BookOpen } from 'lucide-react'
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function EthiquePage() {
  //  Replaced ethics content with Haj'Aina Foundation presentation
  const foundationValues = [
    {
      icon: Heart,
      title: "Préservation Culturelle",
      description: "Sauvegarder et valoriser les traditions artisanales malgaches pour les générations futures.",
    },
    {
      icon: Users,
      title: "Autonomisation Communautaire",
      description: "Créer des opportunités économiques durables pour les artisans et leurs familles.",
    },
    {
      icon: Globe,
      title: "Impact Environnemental",
      description: "Promouvoir des pratiques de mode respectueuses de l'environnement et de la biodiversité.",
    },
    {
      icon: BookOpen,
      title: "Éducation & Formation",
      description: "Transmettre les savoir-faire traditionnels et former aux nouvelles techniques durables.",
    },
  ]

  const foundationImpacts = [
    {
      number: "1,200+",
      label: "Artisans Formés",
      description: "Artisans bénéficiant de nos programmes de formation et d'accompagnement",
    },
    {
      number: "25",
      label: "Villages Partenaires",
      description: "Communautés rurales intégrées dans nos programmes de développement",
    },
    {
      number: "€150K",
      label: "Fonds Collectés",
      description: "Montant total des dons collectés pour nos projets en 2024",
    },
    {
      number: "8",
      label: "Projets Actifs",
      description: "Initiatives en cours de développement à travers Madagascar",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <Image
          src="/img/ethique-image.jpg"
          alt="Fondation Haj'Aina"
          fill
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-6 text-white">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-extralight tracking-[0.2em] mb-8 serif-font">
              Fondation Haj'Aina
            </h1>
            <div className="w-32 h-px bg-white mb-10" />
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-3xl">
              Préserver les traditions artisanales malgaches, autonomiser les communautés locales et construire un avenir durable pour la mode éthique à Madagascar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-black hover:bg-green-500 font-light tracking-[0.1em] uppercase px-10 py-4">
                Faire un Don
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black bg-transparent font-light tracking-[0.1em] uppercase px-10 py-4"
              >
                Nos Combats
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">Notre Mission</h2>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              La Fondation Haj'Aina œuvre pour la préservation du patrimoine culturel malgache tout en créant des opportunités économiques durables pour les artisans locaux.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {foundationValues.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-none hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-light mb-4 serif-font tracking-wide">{value.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">Notre Impact</h2>
            <div className="w-32 h-px bg-white mx-auto mb-8" />
            <p className="max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Des résultats concrets qui témoignent de notre engagement pour les communautés malgaches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {foundationImpacts.map((impact, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-extralight mb-4 serif-font">{impact.number}</div>
                <h3 className="text-xl font-light mb-3 tracking-wide">{impact.label}</h3>
                <p className="font-light leading-relaxed text-sm">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fundraising Campaigns */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">Cagnotte en Ligne</h2>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg mb-12">
              Soutenez nos projets en cours et participez à la transformation des communautés artisanales malgaches.
            </p>
            <Link href="https://www.leetchi.com/fr/c/cagnotte-hajaina-9201633" target="blank">
              <Button
                variant="outline"
                className="bg-black text-white font-light tracking-[0.1em] uppercase px-8 py-3"
              >
                Participer à la cagnotte
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
