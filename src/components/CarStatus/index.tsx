import { Car, Key } from 'phosphor-react-native'
import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components'
import { Container, IconBox, Message, TextHighlight } from './styles'

type CarStatusProps = TouchableOpacityProps & {
  licensePlate?: string | null
}

export function CarStatus({ licensePlate = null, ...props }: CarStatusProps) {
  const theme = useTheme()

  const Icon = licensePlate ? Key : Car
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : `Nenhum veículo em uso. `
  const status = licensePlate ? 'chegada' : 'saída'

  return (
    <Container {...props}>
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
