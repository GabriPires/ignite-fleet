import { Check, ClockClockwise } from 'phosphor-react-native'
import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Container, Departure, Info, LicensePlate } from './styles'

export interface HistoricCardProps {
  licensePlate: string
  created: string
  isSync: boolean
}

type Props = TouchableOpacityProps & { data: HistoricCardProps }

export function HistoricCard({ data, ...props }: Props) {
  const theme = useTheme()

  return (
    <Container {...props}>
      <Info>
        <LicensePlate>{data.licensePlate}</LicensePlate>
        <Departure>{data.created}</Departure>
      </Info>

      {data.isSync ? (
        <Check size={24} color={theme.COLORS.BRAND_LIGHT} />
      ) : (
        <ClockClockwise size={24} color={theme.COLORS.GRAY_400} />
      )}
    </Container>
  )
}
