import AsyncStorage from '@react-native-async-storage/async-storage'

type LocationProps = {
  latitude: number
  longitude: number
  timestamp: number
}

const ASYNC_STORAGE_KEY = '@ignitefleet:location'

export async function getStoredLocations(): Promise<LocationProps[]> {
  const storage = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
  const response = storage ? JSON.parse(storage) : []

  return response
}

export async function saveLocation(newLocation: LocationProps) {
  const storage = await getStoredLocations()
  storage.push(newLocation)

  await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(storage))
}

export async function clearLocations() {
  await AsyncStorage.removeItem(ASYNC_STORAGE_KEY)
}
