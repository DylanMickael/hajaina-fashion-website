"use client"

import Header from "@/components/header"

export default function UserProfilePage() {

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">Profil Utilisateur</h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Suivez et gérez les informations sur votre compte Haj'Aina.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
