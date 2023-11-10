import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
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

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>XXX1234</LicensePlate>

        <Label>Finalidade</Label>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
          soluta aperiam totam possimus aut pariatur! Voluptate error a,
          asperiores tempore, quae exercitationem ipsum totam corporis voluptas
          quos magnam, sit voluptates!
        </Description>

        <Footer>
          <Button title="Registrar chegada" />
        </Footer>
      </Content>
    </Container>
  )
}
