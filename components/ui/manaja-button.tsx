"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Handshake } from "lucide-react"

export const ManajaButton = () => {
  const [clicked, setClicked] = useState(false)
  const className = `font-light tracking-[0.1em] uppercase px-8 py-3 bg-black text-white
        ${clicked && "bg-green-600 text-gray-200 border-gray-400 font-bold"}`

  return (
    <Button
      variant="outline"
      onClick={() => setClicked(!clicked)}
      className={className}
    >
      {clicked ? "300":"Manaja"}
      <Handshake className="mr-2 h-4 w-4" />
    </Button>
  )
}