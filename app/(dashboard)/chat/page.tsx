"use client"

import useChat from "@/hooks/use-chat"
import { useRef } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { Send, Image as ImageIcon, Camera, Loader2, X, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Link from "next/link"

export default function ChatPage() {
  const {
    messages,
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
  } = useChat();

  return (
    <div className="min-h-screen bg-white text-black">
        <Header />          
        <section className="py-24 bg-gray-50 min-h-screen">
            <Link className="text-white mt-10 fixed top-50 left-0" href="/dashboard">
                <Button
                    size="lg"
                    className="bg-gray-800 hover:bg-gray-900 focus:ring-gray-700"
                >
                    <ArrowLeft className="text-white h-20 w-20" />
                </Button>
            </Link>
            {
                messages.length === 1 &&
                <div className="container mx-auto px-6 pt-5">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
                        Assistant Mode IA
                        </h1>
                        <div className="w-32 h-px bg-black mx-auto mb-8" />
                        <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
                        Votre conseiller vestimentaire personnel, propulsé par l'intelligence artificielle.
                        Uploadez une photo ou posez vos questions mode pour des conseils personnalisés.
                        </p>
                    </div>
                </div>
            }
            
            {/* Messages Area */}
            <div className="mx-auto px-6 max-w-4xl space-y-4 my-10">
                {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                    <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                        msg.role === "user"
                        ? "bg-black text-white"
                        : "bg-gray-100"
                    }`}
                    >
                    {msg.image && (
                        <div className="relative h-48 w-full mb-4 rounded overflow-hidden">
                        <Image
                            src={msg.image}
                            alt="Uploaded image"
                            fill
                            className="object-cover"
                        />
                        </div>
                    )}
                    <p className="text-sm font-light leading-relaxed">{msg.content}</p>
                    </div>
                </div>
                ))}
            </div>
            {/* Input Area */}
            <div className="border-none bg-gray-50 w-screen mx-auto px-6 max-w-4xl pb-6 fixed bottom-0 left-[50%] -translate-x-[50%]">
                {showCamera && (
                    <div className="absolute bottom-full left-0 right-0 bg-black p-4">
                        <div className="relative aspect-video max-w-2xl mx-auto flex flex-col items-center">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-[500px] object-contain rounded-lg z-1 bg-black"
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                            <Button
                            onClick={capturePhoto}
                            className="bg-white text-black hover:bg-white/90 z-10"
                            >
                            Prendre la photo
                            </Button>
                            <Button
                            onClick={stopCamera}
                            variant="outline"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20 z-10"
                            >
                            Annuler
                            </Button>
                        </div>
                    </div>
                </div>
                )}

                {imagePreview && (
                    <div className="absolute bottom-full left-4 bg-white p-2 rounded-lg mb-2 border-gray-50">
                        <div className="relative h-24 w-24">
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                className="object-cover rounded"
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute -top-2 -right-2 h-6 w-6 bg-black/50 hover:bg-black/70 text-white rounded-full"
                                onClick={() => {
                                    setImageFile(null);
                                    setImagePreview(null);
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

                <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                        <textarea
                            placeholder="Message..."
                            className="w-full min-h-[60px] py-4 px-4 pr-24 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-700 text-sm shadow-sm resize-none overflow-y-auto"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                        <div className="absolute right-5 top-[50%] -translate-y-[50%] flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-gray-100 text-gray-500"
                                onClick={() => document.getElementById("imageInput")?.click()}
                            >
                                <ImageIcon className="h-5 w-5" />
                                <input
                                    type="file"
                                    id="imageInput"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-gray-100 text-gray-500"
                                onClick={startCamera}
                            >
                                <Camera className="h-5 w-5" />
                            </Button>
                            <Button
                                size="icon"
                                className={`h-8 w-8 rounded-xl transition-colors ${
                                    !input && !imageFile
                                        ? "bg-gray-100 text-gray-400"
                                        : "bg-green-500 text-white hover:bg-green-600"
                                }`}
                                disabled={loading || (!input && !imageFile)}
                                onClick={handleSend}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}
