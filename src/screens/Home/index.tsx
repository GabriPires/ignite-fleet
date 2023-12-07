import { useNavigation } from '@react-navigation/native'
import { useUser } from '@realm/react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import Realm from 'realm'
import { CarStatus } from '../../components/CarStatus'
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard'
import { HomeHeader } from '../../components/HomeHeader'
import { useQuery, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { Container, Content, Label, Title } from './styles'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    [],
  )

  const { navigate } = useNavigation()

  const realm = useRealm()
  const historic = useQuery(Historic)
  const user = useUser()

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse._id.toString() })
    } else {
      return navigate('departure')
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle || null)
    } catch (error) {
      Alert.alert('Veículo em uso', 'Não foi possível buscar o veículo em uso.')
      console.log(error)
    }
  }

  function fetchHistoric() {
    try {
      const response = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      )

      const formattedHistoric = response.map((item) => ({
        id: item._id.toString(),
        licensePlate: item.license_plate,
        isSync: false,
        created: dayjs(item.created_at).format(
          '[Saída em] DD/MM/YYYY [às] HH:mm',
        ),
      }))

      setVehicleHistoric(formattedHistoric)
    } catch (err) {
      console.log(err)
      Alert.alert('Histórico', 'Não foi possível buscar o histórico.')
    }
  }

  function handleHistoricDetail(id: string) {
    navigate('arrival', { id })
  }

  function progressNotification(transferred: number, transferable: number) {
    const percentage = Math.round((transferred / transferable) * 100)
    console.log(percentage)
  }

  useEffect(() => {
    fetchVehicleInUse()
  }, [])

  useEffect(() => {
    realm.addListener('change', fetchVehicleInUse)

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse)
      }
    }
  }, [])

  useEffect(() => {
    fetchHistoric()
  }, [historic])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects('Historic')
        .filtered(`user_id = '${user.id}'`)

      mutableSubs.add(historicByUserQuery, { name: 'historicByUser' })
    })
  }, [realm])

  useEffect(() => {
    const syncSession = realm.syncSession

    if (!syncSession) return

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification,
    )

    return () => syncSession.removeProgressNotification(progressNotification)
  }, [])

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Title>Histórico</Title>
        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetail(item.id)}
            />
          )}
          ListEmptyComponent={() => <Label>Nenhum veículo utilizado</Label>}
        />
      </Content>
    </Container>
  )
}
