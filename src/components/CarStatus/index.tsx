import { Car, Key } from 'phosphor-react-native'
import React from 'react'
import { useTheme } from 'styled-components'
import { Container, IconBox, Message, TextHighlight } from './styles'

interface CarStatusProps {
  licensePlate?: string | null
}

export function CarStatus({ licensePlate = null }: CarStatusProps) {
  const theme = useTheme()

  const Icon = licensePlate ? Key : Car
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : `Nenhum veículo em uso. `
  const status = licensePlate ? 'chegada' : 'saída'

  return (
    <Container>
      <IconBox>
        <Icon size={32} color={theme.COLORS.BRAND_LIGHT} />
      </IconBox>
      <Message>
        {message}
        <TextHighlight>Clique aqui para registrar a {status}</TextHighlight>
      </Message>
    </Container>
  )
}
