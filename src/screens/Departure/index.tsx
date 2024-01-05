import { useNavigation } from '@react-navigation/native'
import { useUser } from '@realm/react'
import {
  LocationAccuracy,
  LocationObjectCoords,
  type LocationSubscription,
  useForegroundPermissions,
  watchPositionAsync,
} from 'expo-location'
import { Car } from 'phosphor-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { Loading } from '../../components/Loading'
import { LocationInfo } from '../../components/LocationInfo'
import { Map } from '../../components/Map'
import { TextAreaInput } from '../../components/TextAreaInput'
import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { getAddressLocation } from '../../utils/get-address-location'
import { licensePlateValidate } from '../../utils/license-plate-validate'
import { Container, Content, Message } from './styles'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)
  const [currentCoordinates, setCurrentCoordinates] =
    useState<LocationObjectCoords | null>(null)

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions()

  const licensePlateRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)

  const { goBack } = useNavigation()
  const realm = useRealm()
  const user = useUser()

  function handleDepartureRegister() {
    try {
      setIsRegistering(true)

      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()

        return Alert.alert(
          'Placa inválida',
          'Por favor, digite uma placa válida.',
        )
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus()

        return Alert.alert(
          'Finalidade',
          'Por favor, informe a finalidade da utilização do veículo.',
        )
      }

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user.id,
            license_plate: licensePlate.toUpperCase(),
            description: description.trim(),
          }),
        )
      })

      Alert.alert(
        'Saída registrada',
        'A saída do veículo foi registrada com sucesso!',
      )
      goBack()
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Erro na saída',
        'Não foi possível registrar a saída do veículo, tente novamente.',
      )
    } finally {
      setIsRegistering(false)
    }
  }

  useEffect(() => {
    requestLocationForegroundPermission()
  }, [])

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return
    }

    let subscription: LocationSubscription

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      (location) => {
        setCurrentCoordinates(location.coords)
        getAddressLocation(location.coords)
          .then((address) => {
            if (address) {
              setCurrentAddress(address)
            }
          })
          .finally(() => {
            setIsLoadingLocation(false)
          })
      },
    ).then((sub) => {
      subscription = sub
    })

    return () => subscription?.remove()
  }, [locationForegroundPermission])

  if (!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title="Saída" />
        <Message>
          Você precisa permitir o acesso a localização para registrar a saída do
          veículo. Por favor acesse as configurações do aplicativo para conceder
          essa permissão ao aplicativo.
        </Message>
      </Container>
    )
  }

  if (isLoadingLocation) {
    return <Loading />
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          {currentCoordinates && (
            <Map
              coordinates={[
                currentCoordinates,
                {
                  latitude: currentCoordinates.latitude + 0.02,
                  longitude: currentCoordinates.longitude + 0.01,
                },
              ]}
            />
          )}

          <Content>
            {currentAddress && (
              <LocationInfo
                label="Localização atual"
                description={currentAddress}
                icon={Car}
              />
            )}

            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              returnKeyType="next"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              returnKeyType="send"
              blurOnSubmit
              onSubmitEditing={handleDepartureRegister}
              onChangeText={setDescription}
            />

            <Button
              title="Registrar saída"
              isLoading={isRegistering}
              onPress={handleDepartureRegister}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  )
}
