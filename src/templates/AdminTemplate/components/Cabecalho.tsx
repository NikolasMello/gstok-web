import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import Stack from '@mui/material/Stack'

import SeletorModoCor from '../../../theme/SeletorModoCor'
import BotaoMenu from './BotaoMenu'
import TrilhaNavegacao from './TrilhaNavegacao'

export default function Cabecalho() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <TrilhaNavegacao />
      <Stack direction="row" sx={{ gap: 1 }}>
        <BotaoMenu showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </BotaoMenu>
        <SeletorModoCor />
      </Stack>
    </Stack>
  )
}
