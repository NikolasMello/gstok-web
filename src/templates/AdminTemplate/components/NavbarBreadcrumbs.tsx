import { useCallback } from 'react'
import { useLocation } from '@tanstack/react-router'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import { navBreadcrumbs } from '../navRoutes'

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}))

export default function NavbarBreadcrumbs() {
  const location = useLocation()
  console.log(navBreadcrumbs)
  const routesFromLocation = useCallback(() => {
    const routeData = navBreadcrumbs.find((item) => item.route === location.pathname)
    if (!routeData) return [{ text: 'Home', route: '/admin/' }]
    // const getRoutePath = location.pathname.replace('/admin/', '')
    return [routeData]
  }, [location, navBreadcrumbs])

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {routesFromLocation().map((r, i) => {
        const lastIndex = routesFromLocation().length - 1
        if (i === lastIndex) {
          return (
            <Typography
              key={r.route}
              variant="body1"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              {r.text}
            </Typography>
          )
        }
        return (
          <Typography key={r.route} variant="body1">
            {r.text}
          </Typography>
        )
      })}
    </StyledBreadcrumbs>
  )
}
