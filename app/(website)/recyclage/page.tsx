"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Recycle, MapPin, Clock, Gift, Truck, Scissors, Sparkles } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Link from "next/link" // Import Link
import Footer from "@/components/footer" 

export default function RecyclagePage() {
  const steps = [
    {
      icon: Truck,
      title: "Collecte",
      description: "Déposez vos vêtements dans nos points de collecte ou demandez un enlèvement à domicile.",
    },
    {
      icon: Scissors,
      title: "Tri & Analyse",
      description: "Nos experts analysent chaque pièce pour déterminer le meilleur processus de transformation.",
    },
    {
      icon: Sparkles,
      title: "Transformation",
      description: "Nos stylistes reimaginent vos vêtements en créations uniques et contemporaines.",
    },
    {
      icon: Gift,
      title: "Nouvelle Vie",
      description: "Récupérez vos pièces transformées ou découvrez notre collection recyclée.",
    },
  ]

  const collectPoints = [
    {
      name: "Atelier Central Antananarivo",
      address: "67 Avenue de l'Indépendance, Antananarivo",
      hours: "Lun-Ven: 9h-18h, Sam: 9h-16h",
      phone: "+261 20 22 123 45",
    },
    {
      name: "Boutique Antsirabe",
      address: "12 Rue Ratsimilaho, Antsirabe",
      hours: "Mar-Sam: 10h-17h",
      phone: "+261 20 44 567 89",
    },
    {
      name: "Point Relais Fianarantsoa",
      address: "Avenue Rainandriamampandry, Fianarantsoa",
      hours: "Mer-Dim: 8h-16h",
      phone: "+261 20 75 234 56",
    },
  ]

  const transformations = [
    {
      before: "/img/before1.jpg",
      after: "/img/after1.jpg",
      title: "Robe Vintage → Création Moderne",
      description: "Transformation d'une robe vintage en pièce contemporaine avec ajout de détails brodés.",
    },
    {
      before: "/img/before2.jpg",
      after: "/img/after2.jpg",
      title: "Jean Usé → Veste Tendance",
      description: "Upcycling d'un jean abîmé en veste denim avec applications textiles traditionnelles.",
    },
    {
      before: "/img/before3.jpg",
      after: "/img/after3.jpg",
      title: "Chemise → Blouse Élégante",
      description: "Redesign complet avec ajout de détails en soie sauvage malgache.",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10" />
        <Image
          src="/img/Recyclage.jpg"
          alt="Recyclage Mode"
          fill
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-6 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl md:text-7xl font-extralight tracking-[0.2em] mb-8 serif-font">Espace Recyclage</h1>
            <div className="w-32 h-px bg-white mb-10" />
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-3xl">
              Donnez une seconde vie à vos vêtements. Notre programme de recyclage transforme vos anciennes pièces en
              créations uniques dans une démarche circulaire et responsable.
            </p>
            <Link href="/depot-vetements" passHref>
              <Button className="bg-white text-black hover:bg-gray-100 font-light tracking-[0.1em] uppercase px-10 py-4">
                Participer au Programme
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Process Steps */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">Comment ça marche ?</h2>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Un processus simple et transparent pour transformer vos vêtements usagés en pièces uniques.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-none hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-black" />
                  </div>
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-light mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-light mb-4 serif-font tracking-wide">{step.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Transformations Gallery */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">Transformations</h2>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Découvrez quelques exemples de transformations réalisées par nos stylistes.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {transformations.map((transformation, index) => (
              <Card
                key={index}
                className="border-0 shadow-none hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="relative h-48">
                      <Image
                        src={transformation.before || "/placeholder.svg"}
                        alt="Avant transformation"
                        fill
                        className="object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-light">
                        Avant
                      </div>
                    </div>
                    <div className="relative h-48">
                      <Image
                        src={transformation.after || "/placeholder.svg"}
                        alt="Après transformation"
                        fill
                        className="object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-light">
                        Après
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-light mb-3 serif-font tracking-wide">{transformation.title}</h3>
                    <p className="text-gray-600 font-light leading-relaxed text-sm">{transformation.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Collection Points */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">Points de Collecte</h2>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Trouvez le point de collecte le plus proche de chez vous pour déposer vos vêtements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {collectPoints.map((point, index) => (
              <Card key={index} className="border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-light serif-font tracking-wide">{point.name}</h3>
                  </div>
                  <p className="text-gray-600 font-light mb-4">{point.address}</p>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 font-light">{point.hours}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-light">{point.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Participation Form */}
      <section className="py-24 bg-gray-50 text-black">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extralight tracking-[0.2em] mb-6 serif-font">Participer au Programme</h2>
              <div className="w-32 h-px bg-white mx-auto mb-8" />
              <p className="text-gray-800 font-light leading-relaxed text-lg">
                Remplissez ce formulaire pour nous faire part de votre intérêt et recevoir plus d'informations.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-light mb-2 tracking-wide">Prénom</label>
                  <Input
                    className="bg-white/10 border-gray-300 text-white placeholder:text-gray-400"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light mb-2 tracking-wide">Nom</label>
                  <Input
                    className="bg-white/10 border-gray-300 text-white placeholder:text-gray-400"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-light mb-2 tracking-wide">Email</label>
                <Input
                  type="email"
                  className="bg-white/10 border-gray-300 text-white placeholder:text-gray-400"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-light mb-2 tracking-wide">Téléphone</label>
                <Input
                  className="bg-white/10 border-gray-300 text-white placeholder:text-gray-400"
                  placeholder="+261 XX XX XXX XX"
                />
              </div>

              <div>
                <label className="block text-sm font-light mb-2 tracking-wide">Type de vêtements à recycler</label>
                <Textarea
                  className="bg-white/10 border-gray-300 text-white placeholder:text-gray-400"
                  placeholder="Décrivez les vêtements que vous souhaitez faire recycler..."
                />
              </div>

              <Button className="w-full bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase py-3">
                Envoyer ma Demande
                <Recycle className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
      <Footer /> {/* Added Footer */}
    </div>
  )
}
