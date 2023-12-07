import { useNavigation } from '@react-navigation/native'
import { useUser } from '@realm/react'
import React, { useRef, useState } from 'react'
import { Alert, ScrollView, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { licensePlateValidate } from '../../utils/license-plate-validate'
import { Container, Content } from './styles'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

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

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
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
