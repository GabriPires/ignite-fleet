import React, { useRef } from 'react'
import { TextInput } from 'react-native'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import { Container, Content } from './styles'

export function Departure() {
  const descriptionRef = useRef<TextInput>(null)

  function handleDepartureRegister() {
    console.log('handleDepartureRegister')
  }

  return (
    <Container>
      <Header title="Saída" />

      <Content>
        <LicensePlateInput
          label="Placa do veículo"
          placeholder="BRA1234"
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current?.focus()}
        />

        <TextAreaInput
          ref={descriptionRef}
          label="Finalidade"
          placeholder="Vou utilizar o veículo para..."
          returnKeyType="send"
          blurOnSubmit
          onSubmitEditing={handleDepartureRegister}
        />

        <Button title="Registrar saída" onPress={handleDepartureRegister} />
      </Content>
    </Container>
  )
}
