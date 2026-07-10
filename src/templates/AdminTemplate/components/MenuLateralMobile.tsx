import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useSession } from '../../../context/SessaoProvider';
import BotaoMenu from './BotaoMenu';
import CartaoAlerta from './CartaoAlerta';
import ConteudoMenu from './ConteudoMenu';

interface MenuLateralMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function MenuLateralMobile({ open, toggleDrawer }: MenuLateralMobileProps) {
  const { usuario } = useSession();
  const nome = [usuario.nm_pessoa, usuario.nm_sobrenome].filter(Boolean).join(' ');

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt={nome}
              src={usuario.ur_avatar}
              sx={{ width: 24, height: 24 }}
            >
              {nome.charAt(0).toUpperCase()}
            </Avatar>
            <Typography component="p" variant="h6">
              {nome}
            </Typography>
          </Stack>
          <BotaoMenu showBadge>
            <NotificationsRoundedIcon />
          </BotaoMenu>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <ConteudoMenu />
          <Divider />
        </Stack>
        <CartaoAlerta />
        <Stack sx={{ p: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
