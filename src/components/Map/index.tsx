import { Car, FlagCheckered } from 'phosphor-react-native'
import { useRef } from 'react'
import MapView, {
  LatLng,
  MapViewProps,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps'
import { useTheme } from 'styled-components/native'

import { IconBox } from '../IconBox'

interface MapProps extends MapViewProps {
  coordinates: LatLng[]
}

export function Map({ coordinates, ...props }: MapProps) {
  const { COLORS } = useTheme()

  const mapRef = useRef<MapView>(null)

  const lastCoordinate = coordinates[coordinates.length - 1]

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      })
    }
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      style={{
        width: '100%',
        height: 200,
      }}
      onMapLoaded={onMapLoaded}
      {...props}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox icon={Car} size="SMALL" />
      </Marker>

      {coordinates.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinate}>
            <IconBox icon={FlagCheckered} size="SMALL" />
          </Marker>
          <Polyline
            coordinates={coordinates}
            strokeWidth={4}
            strokeColor={COLORS.GRAY_700}
          />
        </>
      )}
    </MapView>
  )
}
