import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { useSession } from '../../../context/SessaoProvider'
import { nomeCompleto } from '../../../utilities/nomeCompleto'
import ConteudoMenu from './ConteudoMenu'
import MenuOpcoes from './MenuOpcoes'
import SeletorConteudo from './SeletorConteudo'

const drawerWidth = 240

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
})

export default function MenuLateral() {
  const { usuario } = useSession()
  const nome = nomeCompleto(usuario)

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <SeletorConteudo />
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ConteudoMenu />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <Avatar
          sizes="small"
          alt={nome}
          src={usuario.ur_avatar}
          sx={{ width: 36, height: 36 }}
        >
          {nome.charAt(0).toUpperCase()}
        </Avatar>
        <Box
          sx={{
            mr: 'auto',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {nome}
          </Typography>
          <Typography
            variant="caption"
            title={usuario.nm_email}
            sx={{
              color: 'text.secondary',
            }}
          >
            {usuario.nm_email}
          </Typography>
        </Box>
        <MenuOpcoes />
      </Stack>
    </Drawer>
  )
}
