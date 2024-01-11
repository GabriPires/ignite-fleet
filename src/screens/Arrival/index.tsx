import { useNavigation, useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { BSON } from 'realm'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { IconButton } from '../../components/IconButton'
import { getStoredLocations } from '../../libs/async-storage/location-storage'
import { getLastSyncTimeStamp } from '../../libs/async-storage/sync-storage'
import { useObject, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { stopLocationTrackingTask } from '../../tasks/background-location-task'
import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'

interface ArrivalScreenParamsProps {
  id: string
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false)

  const route = useRoute()
  const { id } = route.params as ArrivalScreenParamsProps
  const { goBack } = useNavigation()

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string)
  const realm = useRealm()

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'

  function handleCancelVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => removeVehicleUsage(),
      },
    ])
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
      goBack()
    })
  }

  async function handleRegisterArrive() {
    try {
      if (!historic) {
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo',
        )
      }

      await stopLocationTrackingTask()

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
      })

      Alert.alert('Chegada', 'Chegada registrada com sucesso')
      goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível registrar a chegada')
    }
  }

  async function getLocationsInfo() {
    const lastSync = await getLastSyncTimeStamp()
    const updatedAt = historic!.updated_at.getTime()

    setDataNotSynced(lastSync > updatedAt)

    const locationsStored = await getStoredLocations()
  }

  useEffect(() => {
    getLocationsInfo()
  }, [historic])

  return (
    <Container>
      <Header title={title} />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>
      </Content>

      {historic?.status === 'departure' && (
        <Footer>
          <IconButton icon={X} onPress={handleCancelVehicleUsage} />
          <Button title="Registrar chegada" onPress={handleRegisterArrive} />
        </Footer>
      )}
    </Container>
  )
}
