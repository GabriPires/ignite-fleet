import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components'

import { Container, Title } from './styles'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const { goBack } = useNavigation()

  const paddingTop = insets.top + 32

  function handleGoBack() {
    goBack()
  }

  return (
    <Container
      style={{
        paddingTop,
      }}
    >
      <TouchableOpacity onPress={handleGoBack}>
        <ArrowLeft size={32} weight="bold" color={theme.COLORS.BRAND_LIGHT} />
      </TouchableOpacity>
      <Title>{title}</Title>
    </Container>
  )
}
