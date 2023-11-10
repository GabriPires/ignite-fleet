import { useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import React from 'react'
import { BSON } from 'realm'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { IconButton } from '../../components/IconButton'
import { useObject } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
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
  const route = useRoute()
  const { id } = route.params as ArrivalScreenParamsProps

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string)

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>

        <Footer>
          <IconButton icon={X} />
          <Button title="Registrar chegada" />
        </Footer>
      </Content>
    </Container>
  )
}
