"use client"

import { useState, useRef } from "react"

export interface Message {
  role: "user" | "assistant"
  content: string
  image?: string
}

export default function useChat(initialMessages?: Message[]) {
  const [messages, setMessages] = useState<Message[]>(
    initialMessages ?? [
      {
        role: "assistant",
        content:
          "Bonjour ! Je suis votre assistant mode personnel. Je peux vous aider à analyser votre style, suggérer des tenues et même analyser vos photos pour des conseils personnalisés. Comment puis-je vous aider aujourd'hui ?",
      },
    ]
  )

  const [input, setInput] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const webcamRef = useRef<any>(null)

  const startCamera = () => setShowCamera(true)
  const stopCamera = () => setShowCamera(false)

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setImagePreview(imageSrc || null)
      setShowCamera(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSend = async () => {
    if (!input && !imagePreview) return

    try {
      setLoading(true)
      const userMessage: Message = {
        role: "user",
        content: input,
        image: imagePreview || undefined,
      }
      setMessages((prev) => [...prev, userMessage])

      const currentInput = input
      const currentImageFile = imageFile
      const currentImagePreview = imagePreview

      setInput("")
      setImageFile(null)
      setImagePreview(null)

      const form = new FormData()
      form.append("prompt", currentInput)
      form.append("resolution", "480p")

      if (currentImageFile) {
        form.append("data", currentImageFile)
      } else if (currentImagePreview) {
        const response = await fetch(currentImagePreview)
        const blob = await response.blob()
        form.append("data", blob, "capture.jpg")
      }

      const response = await fetch("/api/live-edit", {
        method: "POST",
        body: form,
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.error || "Une erreur est survenue lors du traitement de votre demande"
        const assistantMessage: Message = {
          role: "assistant",
          content: errorMessage,
        }
        setMessages((prev) => [...prev, assistantMessage])
        return
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.text || "Je vous ai généré une nouvelle image selon vos instructions.",
        image: data.image || undefined,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Erreur:", error)
      const assistantMessage: Message = {
        role: "assistant",
        content: "Erreur de connexion. Veuillez réessayer.",
      }
      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setLoading(false)
    }
  }

  return {
    messages,
    setMessages,
    input,
    setInput,
    imageFile,
    setImageFile,
    imagePreview,
    setImagePreview,
    loading,
    showCamera,
    webcamRef,
    startCamera,
    stopCamera,
    capturePhoto,
    handleImageUpload,
    handleSend,
  }
}
