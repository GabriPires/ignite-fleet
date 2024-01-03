import React from 'react'

import { IconBox } from '../IconBox'
import { IconBoxProps } from '../IconButton'
import { Container, Description, Info, Label } from './styles'

export type LocationInfoProps = {
  label: string
  description: string
}

type Props = LocationInfoProps & {
  icon: IconBoxProps
}

export function LocationInfo({ description, label, icon: Icon }: Props) {
  return (
    <Container>
      <IconBox icon={Icon} />
      <Info>
        <Label numberOfLines={1}>{label}</Label>
        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </Container>
  )
}
