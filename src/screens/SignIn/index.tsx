import { IOS_CLIENT_ID } from '@env'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button'
import { Container, Slogan, Title } from './styles'

WebBrowser.maybeCompleteAuthSession()

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const [, response, googleSignIn] = Google.useAuthRequest({
    // temporary workaround for android client id don't work
    androidClientId: IOS_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  })

  function handleSignInWithGoogle() {
    setIsAuthenticating(true)

    googleSignIn().then((response) => {
      if (response.type !== 'success') {
        setIsAuthenticating(false)
      }
    })
  }

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken) {
        fetch(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication.idToken}`,
        )
          .then(async (res) => res.json())
          .then(console.log)
      } else {
        Alert.alert(
          'Entrar',
          'Não foi possível conectar com a sua conta do Google',
        )
        setIsAuthenticating(false)
      }
    }
  }, [response])

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>
      <Button
        title="Entrar com Google"
        isLoading={isAuthenticating}
        onPress={handleSignInWithGoogle}
      />
    </Container>
  )
}
