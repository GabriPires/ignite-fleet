import { IOS_CLIENT_ID } from '@env'
import { Realm, useApp } from '@realm/react'
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

  const app = useApp()

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
        const credentials = Realm.Credentials.jwt(
          response.authentication.idToken,
        )

        app.logIn(credentials).catch(() => {
          Alert.alert(
            'Entrar',
            'Não foi possível conectar com a sua conta do Google',
          )
          setIsAuthenticating(false)
        })
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
