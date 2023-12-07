import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'
import { IconBoxProps } from '../IconButton'
import { Container, Title } from './styles'

interface Props {
  icon?: IconBoxProps
  title: string
}

export function TopMessage({ title, icon: Icon }: Props) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 5

  return (
    <Container style={{ paddingTop }}>
      {Icon && <Icon size={24} color={theme.COLORS.GRAY_100} />}
      <Title>{title}</Title>
    </Container>
  )
}
