"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ManajaButton } from "@/components/ui/manaja-button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer"; // Added import

export default function CollectionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching collection data
  useEffect(() => {
    setLoading(true);
    const allCollections = [
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
      {
        id: "3",
        title: "Urban Malagasy",
        designer: "Lalaina Rakoto",
        image: "/img/Collection2.jpg",
        category: "Streetwear",
        price: "80 000 Ar",
        description:
          "Streetwear contemporain aux influences malgaches pour la nouvelle génération. Cette collection est un hommage à la vitalité urbaine de Madagascar, avec des designs audacieux et confortables, parfaits pour le quotidien.",
        pieces: 32,
        details: [
          "Tissus : Denim recyclé, jersey de coton",
          "Motifs : Graffitis inspirés de l'art malgache",
          "Coupes : Oversize, décontractées",
          "Accessoires : Sacs banane, casquettes brodées",
        ],
        gallery: [
          "/img/Collection2.jpg",
          "/img/Collection2.jpg",
          "/img/Collection2.jpg",
        ],
      },
      {
        id: "4",
        title: "Heritage Moderne",
        designer: "Miora Rasoanaivo",
        image: "/img/Collection4.jpg",
        category: "Fusion",
        price: "180 000 Ar",
        description:
          "Fusion parfaite entre l'héritage traditionnel et les tendances modernes. Cette collection réinterprète les silhouettes classiques malgaches avec une touche contemporaine, créant des pièces intemporelles et polyvalentes.",
        pieces: 20,
        details: [
          "Tissus : Lamba hoany, soie sauvage",
          "Design : Silhouettes épurées, motifs géométriques",
          "Inspiration : Architecture traditionnelle, paysages malgaches",
          "Pièces clés : Vestes structurées, jupes longues",
        ],
        gallery: [
          "/img/Collection4.jpg",
          "/img/Collection4.jpg",
          "/img/Collection4.jpg",
        ],
      },
      {
        id: "5",
        title: "Soie Sauvage",
        designer: "Hery Andriantsoa",
        image: "/img/Collection5.jpg",
        category: "Couture",
        price: "300 000 Ar",
        description:
          "Collection exclusive en soie sauvage malgache, tissée à la main par nos artisans partenaires. Chaque pièce est unique, reflétant la beauté naturelle et la texture brute de cette matière précieuse. Une ode à l'artisanat d'exception.",
        pieces: 12,
        details: [
          "Matériau principal : Soie sauvage (landibe)",
          "Processus : Tissage artisanal, teinture naturelle",
          "Style : Haute couture, élégance intemporelle",
          "Disponibilité : Édition limitée",
        ],
        gallery: [
          "/img/Collection5.jpg",
          "/img/Collection5.jpg",
          "/img/Collection5.jpg",
        ],
      },
      {
        id: "6",
        title: "Nouvelle Vague",
        designer: "Lalaina Rakoto",
        image: "/img/Collection6.jpg",
        category: "Avant-garde",
        price: "250 000 Ar",
        description:
          "Créations avant-gardistes qui repoussent les limites de la mode contemporaine. Cette collection est une exploration audacieuse des formes, des textures et des concepts, destinée à ceux qui osent se démarquer.",
        pieces: 16,
        details: [
          "Design : Asymétrique, déstructuré",
          "Matériaux : Cuir végétal, néoprène recyclé",
          "Inspiration : Futurisme, art contemporain",
          "Pièces uniques : Sculptures portables",
        ],
        gallery: [
          "/img/Collection6.jpg",
          "/img/Collection6.jpg",
          "/img/Collection6.jpg",
        ],
      },
    ];
    const foundCollection = allCollections.find((col) => col.id === id);
    if (foundCollection) {
      setCollection(foundCollection);
    } else {
      router.push("/collections"); // Redirect if not found
    }
    setLoading(false);
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p>Chargement de la collection...</p>
      </div>
    );
  }

  if (!collection) {
    return null; // Should redirect by now
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
            Retour aux collections
          </Button>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="relative h-[600px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {collection.gallery.map((img: string, index: number) => (
                  <div
                    key={index}
                    className="relative h-32 overflow-hidden rounded-lg"
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${collection.title} gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <Badge
                variant="outline"
                className="text-sm tracking-[0.15em] font-light uppercase"
              >
                {collection.category}
              </Badge>
              <h1 className="text-5xl font-extralight tracking-[0.1em] serif-font leading-tight">
                {collection.title}
              </h1>
              <p className="text-gray-600 text-xl font-light tracking-wide">
                Par {collection.designer}
              </p>
              <p className="text-gray-700 leading-relaxed font-light text-lg">
                {collection.description}
              </p>

              <div className="space-y-4">
                <h2 className="text-2xl font-light serif-font">
                  Détails de la Collection
                </h2>
                <ul className="list-disc list-inside text-gray-700 font-light space-y-2">
                  {collection.details.map((detail: string, index: number) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-b border-gray-200 py-6">
                <span className="text-3xl font-bold serif-font">
                  {collection.price}
                </span>
                <div className="flex gap-4">
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase px-8 py-3">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Ajouter au panier
                  </Button>
                  <ManajaButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer /> {/* Added Footer */}
    </div>
  );
}
