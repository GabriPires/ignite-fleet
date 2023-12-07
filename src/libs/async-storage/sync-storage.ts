import AsyncStorage from '@react-native-async-storage/async-storage'

const ASYNC_STORAGE_KEY = '@ignitefleet:last_sync'

export async function saveLastSyncTimeStamp() {
  const timeStamp = new Date().getTime()
  await AsyncStorage.setItem(ASYNC_STORAGE_KEY, timeStamp.toString())

  return timeStamp
}

export async function getLastSyncTimeStamp() {
  const timeStamp = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)

  return Number(timeStamp)
}
