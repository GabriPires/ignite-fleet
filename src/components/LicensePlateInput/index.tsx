import React, { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Container, Input, Label } from './styles'

interface LicensePlateInputProps extends TextInputProps {
  label: string
}

const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>(
  function LicensePlateInput({ label, ...props }, ref) {
    const { COLORS } = useTheme()
    return (
      <Container>
        <Label>{label}</Label>
        <Input
          ref={ref}
          maxLength={7}
          autoCapitalize="characters"
          placeholderTextColor={COLORS.GRAY_400}
          {...props}
        />
      </Container>
    )
  },
)

export { LicensePlateInput }
