"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash, ArrowLeft } from "lucide-react";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer"; // Added import

export default function MyCollections() {
  const router = useRouter();
  const collections = [
    {
      id: "1",
      title: "Collection Eté 2024",
      designer: "Miora Rasoanaivo",
      image: "/img/Collection3.jpg",
      category: "Couture",
      price: "150 000 Ar",
      description:
        "Une collection qui célèbre les couleurs chaudes de l'été malgache avec des tissus traditionnels revisités. Chaque pièce est une œuvre d'art, fusionnant l'héritage culturel avec des coupes modernes et élégantes. Idéale pour les événements spéciaux et les tenues de soirée.",
      pieces: 24,
      details: [
        "Tissus : Soie sauvage, coton bio, lin",
        "Techniques : Broderie main, tissage traditionnel",
        "Couleurs : Tons terreux, noir, blanc cassé",
        "Tailles disponibles : XS, S, M, L, XL",
      ],
      gallery: [
        "/img/Collection3.jpg",
        "/img/Collection3.jpg",
        "/img/Collection3.jpg",
      ],
    },
    {
      id: "2",
      title: "Eco-Luxe Series",
      designer: "Hery Andriantsoa",
      image: "/img/Collection1.jpg",
      category: "Durable",
      price: "200 000 Ar",
      description:
        "Mode de luxe éco-responsable utilisant uniquement des matériaux durables et recyclés. Cette série incarne l'engagement de Haj'Aina envers la planète, sans compromettre l'élégance et le raffinement. Parfait pour une garde-robe consciente et stylée.",
      pieces: 18,
      details: [
        "Matériaux : Polyester recyclé, coton biologique certifié GOTS",
        "Processus : Zéro déchet, teinture naturelle",
        "Style : Minimaliste, coupes fluides",
        "Certifications : B-Corp, Fair Trade",
      ],
      gallery: [
        "/img/Collection1.jpg",
        "/img/Collection1.jpg",
        "/img/Collection1.jpg",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white to-black pt-20">
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
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
              Mes Collections
            </h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Gérez vos collections, mettez en avant vos créations et partagez
              votre vision unique de la mode éthique.
            </p>
          </div>

          <div className="flex justify-end mb-8">
            <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Collection
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {collections.map((collection) => (
              <Card
                key={collection.id}
                className="border-0 shadow-none hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative w-full h-64">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  </div>

                  {/* Texte */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-light mb-2 serif-font tracking-wide">
                          {collection.title}
                        </h2>
                        <p className="text-gray-500 text-sm font-light">
                          Designer : {collection.designer}
                        </p>
                        <p className="text-gray-500 text-sm font-light">
                          Catégorie : {collection.category}
                        </p>
                        <p className="text-gray-900 text-sm font-semibold">
                          Prix : {collection.price}
                        </p>
                        <p className="text-gray-500 text-sm font-light">
                          Pièces : {collection.pieces}
                        </p>
                      </div>

                      {/* Boutons */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed font-light line-clamp-3">
                      {collection.description}
                    </p>

                    {/* Détails techniques */}
                    <ul className="mt-4 text-sm text-gray-600 list-disc pl-5 space-y-1">
                      {collection.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>

                    {/* Bouton suite */}
                    <Button
                      variant="link"
                      className="mt-4 px-0 text-black hover:text-gray-700 font-light"
                    >
                      Lire la suite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
