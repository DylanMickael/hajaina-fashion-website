"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Globe, BookOpen } from 'lucide-react'
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import fondationData from "@/data/fondation-data.json";

export default function EthiquePage() {
  const foundationValues = fondationData.foundationValues;
  const foundationImpacts = fondationData.foundationImpacts;

  const getIcon = (name: string) => {
    switch(name) {
      case "Heart": return <Heart className="h-8 w-8 text-black" />;
      case "Users": return <Users className="h-8 w-8 text-black" />;
      case "Globe": return <Globe className="h-8 w-8 text-black" />;
      case "BookOpen": return <BookOpen className="h-8 w-8 text-black" />;
      default: return null;
    }
  }

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
              <Link href="https://www.leetchi.com/fr/c/cagnotte-hajaina-9201633" target="blank">
                <Button className="bg-white text-black hover:bg-green-500 font-light tracking-[0.1em] uppercase px-10 py-4">
                  Faire un Don
                </Button>
              </Link>
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
                    {getIcon(value.icon)}
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
