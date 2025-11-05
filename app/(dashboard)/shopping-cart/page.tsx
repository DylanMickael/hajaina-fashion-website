"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Minus, Trash2, CreditCard, Smartphone } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  creator: string
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Robe Malagasy Upcycled",
    price: 89,
    quantity: 1,
    image: "/malagasy-dress.jpg",
    creator: "Ravenna",
  },
  {
    id: "2",
    name: "Chemise Linen Éthique",
    price: 65,
    quantity: 2,
    image: "/linen-shirt.jpg",
    creator: "Ethical Threads",
  },
]

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(mockCartItems)
  const [paymentMethod, setPaymentMethod] = useState<"mobile-money" | "card" | null>(null)
  const [step, setStep] = useState<"cart" | "checkout" | "payment">("cart")

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = Math.round(subtotal * 0.1 * 100) / 100
  const total = subtotal + shipping + tax

  const handleQuantityChange = (id: string, delta: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : item
        }
        return item
      }),
    )
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-light text-sm">Continuer le shopping</span>
            </Link>
            <h1 className="text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">Mon Panier</h1>
            <div className="w-32 h-px bg-black" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {items.length === 0 ? (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-12 text-center">
                    <p className="text-gray-600 font-light mb-4">Votre panier est vide</p>
                    <Link href="/">
                      <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">
                        Parcourir les Produits
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          {/* Image */}
                          <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1">
                            <h3 className="font-light serif-font text-lg mb-1">{item.name}</h3>
                            <p className="text-gray-600 font-light text-sm mb-3">Par {item.creator}</p>
                            <p className="text-lg font-light">{item.price}€</p>
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-light"
                                onClick={() => handleQuantityChange(item.id, -1)}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 border-l border-r border-gray-300 font-light text-sm">
                                {item.quantity}
                              </span>
                              <button
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-light"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right min-w-24">
                              <p className="text-sm text-gray-600 font-light">Sous-total</p>
                              <p className="font-light serif-font text-lg">
                                {(item.price * item.quantity).toFixed(2)}€
                              </p>
                            </div>

                            {/* Remove */}
                            <button
                              className="text-red-600 hover:text-red-700 transition-colors"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Summary & Checkout */}
            <div>
              <Card className="border-0 shadow-sm sticky top-24">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light serif-font mb-6">Résumé de la Commande</h3>

                  {/* Summary Details */}
                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-sm font-light">
                      <span className="text-gray-600">Sous-total</span>
                      <span>{subtotal.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-sm font-light">
                      <span className="text-gray-600">Livraison</span>
                      <span>{shipping === 0 ? "Gratuite" : shipping.toFixed(2) + "€"}</span>
                    </div>
                    <div className="flex justify-between text-sm font-light">
                      <span className="text-gray-600">Taxes (10%)</span>
                      <span>{tax.toFixed(2)}€</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between mb-8">
                    <span className="font-light serif-font">Total</span>
                    <span className="text-2xl font-extralight serif-font">{total.toFixed(2)}€</span>
                  </div>

                  {/* Payment Method Selection */}
                  {step === "cart" && (
                    <div className="space-y-3">
                      <Button
                        onClick={() => {
                          setPaymentMethod("mobile-money")
                          setStep("payment")
                        }}
                        className="w-full bg-green-600 text-white hover:bg-green-700 font-light tracking-[0.1em] uppercase flex items-center justify-center gap-2 mb-3"
                      >
                        <Smartphone className="h-5 w-5" />
                        Mobile Money
                      </Button>
                      <Button
                        onClick={() => {
                          setPaymentMethod("card")
                          setStep("payment")
                        }}
                        variant="outline"
                        className="w-full border-gray-300 hover:border-black font-light tracking-[0.1em] uppercase flex items-center justify-center gap-2"
                      >
                        <CreditCard className="h-5 w-5" />
                        Carte Bancaire
                      </Button>
                    </div>
                  )}

                  {/* Mobile Money Payment */}
                  {step === "payment" && paymentMethod === "mobile-money" && (
                    <MobileMoneyPayment total={total} onBack={() => setStep("cart")} />
                  )}

                  {/* Card Payment */}
                  {step === "payment" && paymentMethod === "card" && (
                    <CardPayment total={total} onBack={() => setStep("cart")} />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

function MobileMoneyPayment({ total, onBack }: { total: number; onBack: () => void }) {
  const [phone, setPhone] = useState("")
  const [provider, setProvider] = useState<"orange" | "airtel" | "vodafone">()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Simulate payment processing
    setTimeout(() => {
      alert(`Commande soumise! Un code de confirmation a été envoyé à ${phone}`)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Smartphone className="h-8 w-8 text-green-600" />
        </div>
        <h4 className="font-light serif-font">Vérification en cours</h4>
        <p className="text-gray-600 font-light text-sm">Un code a été envoyé à votre numéro</p>
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full border-gray-300 hover:border-black font-light text-sm bg-transparent"
        >
          Retour
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-light text-gray-600 mb-2">Opérateur</label>
        <div className="grid grid-cols-3 gap-2">
          {(["orange", "airtel", "vodafone"] as const).map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => setProvider(op)}
              className={`py-2 px-3 rounded-lg text-sm font-light transition-all capitalize ${
                provider === op ? "bg-green-600 text-white" : "bg-gray-100 border border-gray-300"
              }`}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-light text-gray-600 mb-2">Numéro de Téléphone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+261 32 XX XX XXX"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
          required
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm font-light text-gray-600 mb-2">Montant à payer</p>
        <p className="text-2xl font-extralight serif-font mb-3">{total.toFixed(2)}€</p>
        <Button
          type="submit"
          className="w-full bg-green-600 text-white hover:bg-green-700 font-light tracking-[0.1em] uppercase"
        >
          Confirmer le Paiement
        </Button>
      </div>

      <Button
        type="button"
        onClick={onBack}
        variant="outline"
        className="w-full border-gray-300 hover:border-black font-light text-sm bg-transparent"
      >
        Retour
      </Button>
    </form>
  )
}

function CardPayment({ total, onBack }: { total: number; onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      alert("Paiement traité! Votre commande est en cours de préparation.")
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <CreditCard className="h-8 w-8 text-blue-600" />
        </div>
        <h4 className="font-light serif-font">Paiement reçu</h4>
        <p className="text-gray-600 font-light text-sm">Merci pour votre achat!</p>
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full border-gray-300 hover:border-black font-light text-sm bg-transparent"
        >
          Retour
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-light text-gray-600 mb-2">Numéro de Carte</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-light text-gray-600 mb-2">Date d'Expiration</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-light text-gray-600 mb-2">CVV</label>
          <input
            type="text"
            placeholder="123"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-light focus:border-black focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm font-light text-gray-600 mb-2">Montant à débiter</p>
        <p className="text-2xl font-extralight serif-font mb-3">{total.toFixed(2)}€</p>
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase"
        >
          Payer {total.toFixed(2)}€
        </Button>
      </div>

      <Button
        type="button"
        onClick={onBack}
        variant="outline"
        className="w-full border-gray-300 hover:border-black font-light text-sm bg-transparent"
      >
        Retour
      </Button>
    </form>
  )
}
