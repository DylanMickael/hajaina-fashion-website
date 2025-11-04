"use client"

interface MapProps {
  latitude?: number
  longitude?: number
  zoom?: number
  markerLabel?: string
  className?: string
}

export function OSMap({ 
  latitude = -18.8792,
  longitude = 47.5079,
  zoom = 13,
  markerLabel = 'Marker',
  className = '' 
}: MapProps) {
  // Calculer le bbox basé sur le niveau de zoom
  // Plus le zoom est élevé, plus la bbox est petite
  const bboxSize = 0.1 / (zoom / 10)
  
  // OpenStreetMap embed URL avec zoom
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-bboxSize},${latitude-bboxSize},${longitude+bboxSize},${latitude+bboxSize}&layer=mapnik&marker=${latitude},${longitude}`

  return (
    <div className={`w-full h-full ${className}`}>
      <iframe
        src={mapUrl}
        className="w-full h-full rounded-lg shadow-lg border-0"
        style={{ minHeight: '160px' }}
        title={markerLabel}
      />
    </div>
  )
}

export function GoogleMap({ 
  latitude, 
  longitude, 
  zoom = 15,
  className = '' 
}: MapProps) {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`

  return (
    <div className={`w-full h-full ${className}`}>
      <iframe
        src={mapUrl}
        className="w-full h-full rounded-lg shadow-lg border-0"
        style={{ minHeight: '600px' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map"
      />
    </div>
  )
}