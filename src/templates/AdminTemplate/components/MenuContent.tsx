import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import ListSubheader from '@mui/material/ListSubheader'
import { Link, useLocation } from '@tanstack/react-router'
import { navGroups } from '../navRoutes'
export default function MenuContent() {
  const location = useLocation()
  const isActive = (pathName: string, route: string) => route.startsWith(pathName)

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {navGroups.map((group) => (
        <List key={group.title} dense subheader={<ListSubheader>{group.title}</ListSubheader>}>
          {group.items.map(({ text, Icon, route }) => (
            <ListItem key={route} disablePadding sx={{ display: 'block', color: 'inherit' }}>
              <ListItemButton
                selected={isActive(location.pathname, route)}
                component={Link}
                href={route}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ))}
    </Stack>
  )
}
