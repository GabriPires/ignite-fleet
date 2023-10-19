import { Power } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import theme from '../../theme'
import { Container, Greeting, Message, Name, Picture } from './styles'

export function HomeHeader() {
  return (
    <Container>
      <Picture
        source={{ uri: 'https://github.com/GabriPires.png' }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Greeting>
        <Message>Olá,</Message>
        <Name>Gabriel</Name>
      </Greeting>

      <TouchableOpacity>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  )
}
