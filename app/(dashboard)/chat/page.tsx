"use client"

import useChat from "@/hooks/use-chat"
import { useRef } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { Send, Image as ImageIcon, Camera, Loader2, X } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"

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
            {
                messages.length === 1 &&
                <div className="container mx-auto px-6 pt-10">
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
            <div className="border-none bg-gray-50 w-screen mx-auto px-6 max-w-4xl pb-2 fixed bottom-5 left-[50%] -translate-x-[50%]">
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
            {/* Webcam Area */}
            {showCamera && (
                <div className=" fixed inset-0 bg-black flex items-center justify-center z-50">
                    <div className="relative max-w-lg h-full z-50">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-full object-cover"
                            videoConstraints={{
                                width: { ideal: 1920 },
                                height: { ideal: 1080 },
                                facingMode: "user"
                            }}
                        />
                        {/* Bouton fermer style Snapchat */}
                        <button
                            onClick={stopCamera}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors flex items-center justify-center"
                        >
                            <X className="text-white w-6 h-6" />
                        </button>
                        
                        <button
                            onClick={capturePhoto}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 hover:-translate-x-1/2 w-16 h-16 rounded-full border-4 border-white/50 bg-transparent hover:bg-white/10 transition-colors flex items-center justify-center group"
                            aria-label="Prendre une photo"
                        >
                            <div className="w-12 h-12 rounded-full bg-white group-hover:bg-white/90 transition-colors"></div>
                        </button>
                    </div>
                </div>
            )}
        </section>
    </div>
  );
}
