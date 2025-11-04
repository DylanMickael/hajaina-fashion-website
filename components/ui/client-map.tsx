"use client"

import dynamic from 'next/dynamic'

interface MapProps {
  center: { lat: number; lng: number }
  zoom: number
  markers?: Array<{
    position: { lat: number; lng: number }
    title: string
    description?: string
  }>
  onMarkerClick?: (marker: { lat: number; lng: number; title: string; description?: string }) => void
  className?: string
}

const MapComponent = dynamic(
  () => import('./map'),
  { ssr: false }
)

export function ClientMap(props: MapProps) {
  return <MapComponent {...props} />
}