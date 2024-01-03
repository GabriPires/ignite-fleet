import React, { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container, Input, Label } from './styles'

interface TextAreaInput extends TextInputProps {
  label: string
}

const TextAreaInput = forwardRef<TextInput, TextAreaInput>(
  function TextAreaInput({ label, ...props }, ref) {
    const { COLORS } = useTheme()
    return (
      <Container>
        <Label>{label}</Label>
        <Input
          ref={ref}
          placeholderTextColor={COLORS.GRAY_400}
          multiline
          autoCapitalize="sentences"
          {...props}
        />
      </Container>
    )
  },
)

export { TextAreaInput }
