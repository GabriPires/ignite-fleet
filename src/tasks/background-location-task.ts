import {
  Accuracy,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location'
import * as TaskManager from 'expo-task-manager'

import { saveLocation } from '../libs/async-storage/location-storage'

export const BACKGROUND_LOCATION_TASK_NAME = 'location-tracking'

TaskManager.defineTask(
  BACKGROUND_LOCATION_TASK_NAME,
  async ({ data, error }: any) => {
    try {
      if (error) {
        throw error
      }

      if (data) {
        const { coords, timestamp } = data.locations[0]

        const currentLocation = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          timestamp,
        }

        await saveLocation(currentLocation)
      }
    } catch (error) {
      console.log(error)
      stopLocationTrackingTask()
    }
  },
)

export async function startLocationTrackingTask() {
  try {
    const hasStarted = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_LOCATION_TASK_NAME,
    )

    if (hasStarted) {
      await stopLocationTrackingTask()
    }

    await startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK_NAME, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    })
  } catch (error) {
    console.log(error)
  }
}

export async function stopLocationTrackingTask() {
  try {
    const hasStarted = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_LOCATION_TASK_NAME,
    )

    if (hasStarted) {
      await stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK_NAME)
    }
  } catch (error) {
    console.log(error)
  }
}
