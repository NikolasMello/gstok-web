import { Fragment, useCallback, useState } from 'react'

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import Divider from '@mui/material/Divider'
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'

import { useSession } from '../../../context/SessaoProvider'
import BotaoMenu from './BotaoMenu'
import PerfilDialog from './PerfilDialog'

const MenuItem = styled(MuiMenuItem)({
  margin: '2px 0',
})

export default function MenuOpcoes() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [perfilAberto, setPerfilAberto] = useState(false)
  const open = Boolean(anchorEl)
  const { logout } = useSession()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const handleAbrirPerfil = useCallback(() => {
    setAnchorEl(null)
    setPerfilAberto(true)
  }, [])

  const handleLogout = useCallback(async () => {
    setAnchorEl(null)
    await logout()
  }, [logout])

  return (
    <Fragment>
      <BotaoMenu aria-label="Open menu" onClick={handleClick} sx={{ borderColor: 'transparent' }}>
        <MoreVertRoundedIcon />
      </BotaoMenu>
      <Menu
        anchorEl={anchorEl}
        id="menu-usuario"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleAbrirPerfil}>Perfil</MenuItem>
        <MenuItem onClick={handleClose}>Credenciais de acesso</MenuItem>
        <MenuItem onClick={handleClose}>Minhas vendas</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => void handleLogout()}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: 'auto',
              minWidth: 0,
            },
          }}
        >
          <ListItemText>Logout</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
      <PerfilDialog open={perfilAberto} onClose={() => setPerfilAberto(false)} />
    </Fragment>
  )
}
