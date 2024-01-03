import React from 'react'
import { Container, Description, Info, Label } from './styles'

export type LocationInfoProps = {
  label: string
  description: string
}

export function LocationInfo({ description, label }: LocationInfoProps) {
  return (
    <Container>
      <Info>
        <Label numberOfLines={1}>{label}</Label>
        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </Container>
  )
}
