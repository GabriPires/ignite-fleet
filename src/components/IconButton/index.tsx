import { IconProps } from 'phosphor-react-native'
import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Container } from './styles'

export type IconBoxProps = (props: IconProps) => JSX.Element

interface IconButtonProps extends TouchableOpacityProps {
  icon: IconBoxProps
}

export function IconButton({ icon: Icon, ...props }: IconButtonProps) {
  const { COLORS } = useTheme()

  return (
    <Container activeOpacity={0.7} {...props}>
      <Icon size={24} color={COLORS.BRAND_MID} />
    </Container>
  )
}
