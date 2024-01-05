import { Car } from 'phosphor-react-native'
import MapView, {
  LatLng,
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps'

import { IconBox } from '../IconBox'

interface MapProps extends MapViewProps {
  coordinates: LatLng[]
}

export function Map({ coordinates, ...props }: MapProps) {
  const lastCoordinate = coordinates[coordinates.length - 1]

  return (
    <MapView
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
      {...props}
    >
      <Marker coordinate={coordinates[0]}>
        <IconBox icon={Car} size="SMALL" />
      </Marker>
    </MapView>
  )
}
