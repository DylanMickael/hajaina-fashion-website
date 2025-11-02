"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ManajaButton } from "@/components/ui/manaja-button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, QrCode } from "lucide-react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import allCollections from "@/data/collections.json";
import { QRCodeGenerator } from "@/components/qr-code-generator";
import { Modal } from "@/components/ui/modal";

export default function CollectionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);

  // Simulate fetching collection data
  useEffect(() => {
    setLoading(true);
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
                  <ManajaButton />
                  <Button className="bg-gray-200 rounded-md px-8">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  <Button 
                    className="bg-gray-200 rounded-md px-8"
                    onClick={() => setShowQRCode(!showQRCode)}
                  >
                    <QrCode className="text-black" size={20}/>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <Modal 
        isOpen={showQRCode} 
        onClose={() => setShowQRCode(false)}
        title="Nouveau QR Code"
      >
        <QRCodeGenerator 
          url={window.location.href}
          title={collection.title}
          description="Scanner pour voir les détails de la collection"
        />
      </Modal>
      <Footer />
    </div>
  );
}
