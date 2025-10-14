"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  BookOpen,
  Store,
  Briefcase,
  Handshake,
  Palette,
  GalleryHorizontal,
  Sparkles,
  Settings,
  LogOut,
} from "lucide-react";
import Header from "@/components/header";
import Link from "next/link"; // Import Link
import Footer from "@/components/footer"; // Added import

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");

    if (!loggedIn) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
      setUserRole(role);
      setUserEmail(email);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  if (!isLoggedIn) {
    return null; // Or a loading spinner
  }


  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <Header />
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
              Mon Compte
            </h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Bienvenue, {userEmail} !
            </p>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="mt-8 bg-transparent border-gray-300 hover:border-black font-light tracking-[0.1em] uppercase"
            >
              Déconnexion
              <LogOut className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
            {/* Mon profile */}
            <Card className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-light mb-4 serif-font tracking-wide">Mon profile</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">Gérer vos informations personnelles.</p>
                <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Modifier</Button>
              </CardContent>
            </Card>
            {/* Mon blog */}
            <Card className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-light mb-4 serif-font tracking-wide">Mon blog</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">Créer et gérer vos articles de blog.</p>
                <Link href="/blog">
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Accéder</Button>
                </Link>
              </CardContent>
            </Card>
            {/* Mes collections */}
            <Card className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palette className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-light mb-4 serif-font tracking-wide">Mes collections</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">Gérer vos collections et pièces.</p>
                <Link href="/collections/gestion">
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Accéder</Button>
                </Link>
              </CardContent>
            </Card>
            {/* Ma boutique */}
            <Card className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Store className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-light mb-4 serif-font tracking-wide">Ma boutique</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">Gérer votre boutique et vos produits.</p>
                <Link href="/collections">
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Accéder</Button>
                </Link>
              </CardContent>
            </Card>
            {/* Mes services */}
            <Card className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-light mb-4 serif-font tracking-wide">Mes services</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">Gérer les services que vous proposez.</p>
                <Link href="/service">
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Accéder</Button>
                </Link>
              </CardContent>
            </Card>
            {/* Mes collaborations */}
            <Card className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Handshake className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-light mb-4 serif-font tracking-wide">Mes collaborations</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">Gérer vos partenariats et projets collaboratifs.</p>
                <Link href="/collaborations">
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Accéder</Button>
                </Link>
              </CardContent>
            </Card>
            {/* Mes expositions */}
            <Card className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GalleryHorizontal className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-light mb-4 serif-font tracking-wide">Exposition en ligne</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">Gérer vos expositions et événements.</p>
                <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Accéder</Button>
              </CardContent>
            </Card>
            {/* Suite IA */}
            <Card className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-light mb-4 serif-font tracking-wide">Suite IA</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">Utiliser les IA de la plateforme.</p>
                <Link href="/chat">
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Accéder</Button>
                </Link>
              </CardContent>
            </Card>
            {/* Parametres du compte */}
            <Card className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-light mb-4 serif-font tracking-wide">Parametres du compte</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">Gérer vos paramètres de compte et préférences.</p>
                <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Modifier</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
