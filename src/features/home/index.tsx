import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import BarraNavegacao from './components/BarraNavegacao'
import ColecaoLogos from './components/ColecaoLogos'
import Depoimentos from './components/Depoimentos'
import Destaques from './components/Destaques'
import Funcionalidades from './components/Funcionalidades'
import PerguntasFrequentes from './components/PerguntasFrequentes'
import Precos from './components/Precos'
import Rodape from './components/Rodape'
import SecaoPrincipal from './components/SecaoPrincipal'

export default function Home() {
  return (
    <>
      <BarraNavegacao />
      <SecaoPrincipal />
      <Box>
        <ColecaoLogos />
        <Funcionalidades />
        <Divider />
        <Depoimentos />
        <Divider />
        <Destaques />
        <Divider />
        <Precos />
        <Divider />
        <PerguntasFrequentes />
        <Divider />
        <Rodape />
      </Box>
    </>
  )
}
