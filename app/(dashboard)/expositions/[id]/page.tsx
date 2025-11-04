"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import Typed from "typed.js"
import "@google/model-viewer"

export default function ExpositionsPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([
    { id: 1, author: "Sophie Durand", text: "Magnifique collection! 🌟", time: "2 min" },
    { id: 2, author: "Marc Rakoto", text: "L'artisanat est impeccable", time: "15 min" },
  ])
  const [currentNarrativeIndex, setCurrentNarrativeIndex] = useState(0)
  const [rotationAngle, setRotationAngle] = useState(0)

  const typedRef = useRef<Typed | null>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const narratives = [
    "Cette collection raconte l'histoire de l'héritage malgache modernisé.",
    "Les techniques traditionnelles rencontrent la vision contemporaine.",
    "Les couleurs évoquent les paysages de Madagascar.",
    "Une invitation à découvrir la beauté d'une mode respectueuse.",
  ]

  const isSpeakingRef = useRef(false);
  const speechEndedHandler = () => {
    isSpeakingRef.current = false;
    if (isPlaying && currentNarrativeIndex < narratives.length - 1) {
      setCurrentNarrativeIndex(prev => prev + 1);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (typedRef.current) {
      typedRef.current.destroy();
    }
    import("@google/model-viewer");

    if (textContainerRef.current && isPlaying) {
      typedRef.current = new Typed(textContainerRef.current, {
        strings: [narratives[currentNarrativeIndex]],
        typeSpeed: 20,
        startDelay: 0,
        backSpeed: 0,
        showCursor: false,
        onComplete: () => {
          if (isSpeaking) {
            const utterance = new SpeechSynthesisUtterance(narratives[currentNarrativeIndex]);
            utterance.lang = 'fr-FR';
            utterance.onend = speechEndedHandler;
            isSpeakingRef.current = true;
            speechSynthesis.speak(utterance);
          } else if (isPlaying && currentNarrativeIndex < narratives.length - 1) {
            setTimeout(() => {
              setCurrentNarrativeIndex(prev => prev + 1);
            }, 2000);
          } else if (isPlaying) {
            setIsPlaying(false);
          }
        }
      });
    }

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
      speechSynthesis.cancel();
    };
  }, [currentNarrativeIndex, isPlaying, isSpeaking, narratives]);

  useEffect(() => {
    if (!isPlaying) {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
      speechSynthesis.cancel();
      isSpeakingRef.current = false;
    }
  }, [isPlaying]);

  const handleAutoPlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      setCurrentNarrativeIndex(0)
    } else {
      setIsPlaying(true)
    }
  }

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, { id: comments.length + 1, author: "Vous", text: comment, time: "À l'instant" }])
      setComment("")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/30 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--purple-500-rgb),0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--cyan-500-rgb),0.1)_0%,transparent_70%)]" />

      <div className="w-full h-screen flex flex-col lg:flex-row p-8 lg:p-16 gap-8 z-10">
          {/* Left Side Controls and Text */}
          <div className="flex flex-col w-full lg:w-1/4">
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-light tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-2">
                Heritage Moderne
              </h1>
              <p className="text-sm text-gray-300/80 font-light">Par Miora Rasoanaivo</p>
            </div>
            {/* Controls Section */}
            <div className="flex items-start align-baseline gap-4">
              {/* Vertical Controls */}
              <div className="flex flex-col gap-3 mt-2">
                  <Button
                    onClick={() => {
                      setCurrentNarrativeIndex(0);
                      setIsPlaying(false);
                    }}
                    variant="ghost"
                className="rounded-full w-10 h-10 bg-white/10"
                  >
                    ↺
                  </Button>
                  <Button
                    onClick={handleAutoPlay}
                    className="rounded-full w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </Button>
              <Button
                onClick={() => {
                  setIsSpeaking(!isSpeaking);
                  if (!isSpeaking) {
                    speechSynthesis.cancel();
                  }
                }}
                variant="ghost"
                className={`rounded-full w-10 h-10 ${isSpeaking ? "bg-green-600" : "bg-white/10"} `}
              >
                🔊
              </Button>
              <Link href="/expositions">
                <Button variant="ghost" className="rounded-full w-10 h-10 bg-white/10 backdrop-blur-sm">
                  ←
                </Button>
              </Link>
              </div>
              <div className="backdrop-blur-sm rounded-lg p-4">
                <span className="text-sm text-white/60 mb-2 block">
                  {currentNarrativeIndex + 1} / {narratives.length}
                </span>
                <div
                  ref={textContainerRef}
                  className="text-xl font-light font-serif leading-relaxed text-white tracking-wide"
                />
              </div>
            </div>
          </div>

          {/* Center - 3D Model Section */}
          <div className="flex-1 flex items-center justify-center mx-2 lg:mx-4 h-screen">
            <div className="relative w-full h-full flex items-center justify-center">
              <model-viewer
                src="/models/Model.glb"
                alt="3D Clothing Model"
                camera-controls
                ar
                auto-rotate
                rotation-speed="20deg"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "0.5rem",
                  transform: `rotateY(${rotationAngle}deg)`,
                }}
              />
              <div className="absolute inset-0 rounded-lg pointer-events-none" />
              <div
                className="absolute inset-4 rounded-lg pointer-events-none"
                style={{ borderRadius: "50%" }}
              />
            </div>
          </div>

          {/* Right Side - Comments */}
          <div className="w-full lg:w-1/4 flex flex-col h-full">
            {/* Comments Section */}
            <div className="flex flex-col h-full">
              {/* Comments List */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-2 pr-2 mb-4">
                  {comments.map((c) => (
                    <div key={c.id} className="group flex gap-3 items-start animate-in slide-in-from-right">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 backdrop-blur-sm" />
                      <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                        <p className="font-light text-xs">
                          <span className="text-white/90 font-medium">{c.author}</span>
                          <span className="text-white/40 ml-2 text-xs">{c.time}</span>
                        </p>
                        <p className="text-sm font-light text-white/70 mt-1">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Section */}
                <div className="flex gap-2 items-center p-4 backdrop-blur-sm bg-white/5">
                  <Button
                    onClick={() => setLiked(!liked)}
                    className="h-10 aspect-square flex items-center justify-center rounded-full transition-all duration-300"
                    variant="ghost"
                  >
                    <span className={`text-lg ${liked ? 'text-green-500' : 'text-white/70'}`}>
                      🤝
                    </span>
                  </Button>
                  <div className="flex-1">
                    <Input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add comment..."
                      className="bg-white/10 border-0 rounded-full text-sm font-light text-white placeholder:text-white/40"
                      onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                    />
                  </div>
                  <Button
                    onClick={handleAddComment}
                    className="h-10 aspect-square flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600"
                  >
                    <span className="text-lg">➤</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}
