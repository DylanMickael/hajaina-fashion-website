"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'

// Import le CSS de Leaflet dans un module CSS
import styles from '@/styles/map.module.css'

// Fix pour les icônes par défaut de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

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

function Map({ center, zoom, markers = [], onMarkerClick, className = '' }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current) return

    // Initialiser la carte seulement si elle n'existe pas
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([center.lat, center.lng], zoom)

      // Ajouter les tuiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current)
    } else {
      // Mettre à jour le centre et le zoom
      mapInstanceRef.current.setView([center.lat, center.lng], zoom)
    }

    // Nettoyer les anciens marqueurs
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Ajouter les nouveaux marqueurs
    markers.forEach(marker => {
      if (mapInstanceRef.current) {
        const leafletMarker = L.marker([marker.position.lat, marker.position.lng])
          .addTo(mapInstanceRef.current)
          .bindPopup(`<strong>${marker.title}</strong>${marker.description ? `<br/>${marker.description}` : ''}`)

        if (onMarkerClick) {
          leafletMarker.on('click', () => {
            onMarkerClick({
              lat: marker.position.lat,
              lng: marker.position.lng,
              title: marker.title,
              description: marker.description,
            })
          })
        }

        markersRef.current.push(leafletMarker)
      }
    })

    // Cleanup à la destruction du composant
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [center, zoom, markers, onMarkerClick])

  return (
    <div className={className}>
      <div 
        ref={mapRef} 
        className={styles.mapContainer}
      />
    </div>
  )
}

export default Map