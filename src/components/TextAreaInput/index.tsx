import React from 'react'
import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Container, Input, Label } from './styles'

interface TextAreaInput extends TextInputProps {
  label: string
}

export function TextAreaInput({ label, ...props }: TextAreaInput) {
  const { COLORS } = useTheme()
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        placeholderTextColor={COLORS.GRAY_400}
        multiline
        autoCapitalize="sentences"
        {...props}
      />
    </Container>
  )
}
