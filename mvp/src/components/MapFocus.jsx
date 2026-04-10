import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

function MapFocus({ venue }) {
  const map = useMap()

  useEffect(() => {
    if (venue) {
      map.flyTo([venue.lat, venue.lng], 13, { duration: 0.8 })
    }
  }, [map, venue])

  return null
}

export default MapFocus
