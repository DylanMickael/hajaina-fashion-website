'use client'
import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

interface MapProps {
  latitude?: number
  longitude?: number
  zoom?: number
  className?: string
}

interface MarkerData {
  lat: number
  lng: number
  label?: string
  color?: string
  icon?: string
}

export function MapLibreMap({ 
  latitude = -18.8792,
  longitude = 47.5079,
  zoom = 13,
  markers = [],
  className = ''
}: MapProps & { markers?: MarkerData[] }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markerRefs = useRef<maplibregl.Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('MapLibre useEffect called')
    console.log('mapContainer.current:', mapContainer.current)
    console.log('map.current:', map.current)

    if (!mapContainer.current) {
      console.error('No container ref')
      return
    }
    
    if (map.current) {
      console.log('Map already exists')
      return
    }

    try {
      console.log('Creating map...')
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'osm': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap Contributors'
            }
          },
          layers: [{
            id: 'osm',
            type: 'raster',
            source: 'osm'
          }]
        },
        center: [longitude, latitude],
        zoom: zoom
      })

      map.current.on('load', () => {
        console.log('Map loaded!')
        setIsLoaded(true)
      })

      map.current.on('error', (e) => {
        console.error('Map error:', e)
        setError(e.error?.message || 'Map error')
      })

      // Ajouter les markers
      console.log('Adding markers:', markers.length)
      markers.forEach((marker, index) => {
        console.log(`Adding marker ${index}:`, marker)
        const el = document.createElement('div')
        el.style.cssText = `
          background-color: ${marker.color || '#3b82f6'};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 16px;
        `
        
        if (marker.icon) {
          el.innerHTML = marker.icon
        }

        const mapMarker = new maplibregl.Marker({ element: el })
          .setLngLat([marker.lng, marker.lat])
          .setPopup(
            new maplibregl.Popup({ offset: 25 })
              .setHTML(`<strong>${marker.label || 'Marker'}</strong>`)
          )
          .addTo(map.current!)

        markerRefs.current.push(mapMarker)
      })

      map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

    } catch (err) {
      console.error('Error creating map:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    }

    return () => {
      console.log('Cleanup')
      markerRefs.current.forEach(m => m.remove())
      map.current?.remove()
      map.current = null
    }
  }, [latitude, longitude, zoom, markers])

  return (
    <div 
      ref={mapContainer} 
      className={`h-full w-full ${className}`}
      style={{ 
        position: 'relative',
        background: '#e5e7eb' // Pour voir si la div est visible
      }}
    >
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p>Chargement de la carte...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100">
          <div className="text-center p-4">
            <p className="text-red-600 font-bold">Erreur:</p>
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}