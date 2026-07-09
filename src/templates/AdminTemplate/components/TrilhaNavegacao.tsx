import { useMemo } from 'react'

import { Link as RouterLink, useLocation, useMatchRoute } from '@tanstack/react-router'

import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

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

function humanizeSegment(segment: string) {
  return segment
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function TrilhaNavegacao() {
  const location = useLocation()
  const matchRoute = useMatchRoute()

  const activeSection = useMemo(
    () => navBreadcrumbs.find((item) => matchRoute({ to: item.route, fuzzy: true })),
    [matchRoute],
  )
  const sectionCrumb = activeSection ?? { text: 'Início', route: '/admin' }

  const childSegments = activeSection
    ? location.pathname.slice(activeSection.route.length).split('/').filter(Boolean)
    : []
  const isSectionTheLastCrumb = childSegments.length === 0

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {isSectionTheLastCrumb ? (
        <Typography
          key={sectionCrumb.route}
          variant="body1"
          sx={{ color: 'text.primary', fontWeight: 600 }}
        >
          {sectionCrumb.text}
        </Typography>
      ) : (
        <Link
          key={sectionCrumb.route}
          component={RouterLink}
          to={sectionCrumb.route}
          underline="hover"
          color="inherit"
        >
          {sectionCrumb.text}
        </Link>
      )}

      {childSegments.map((segment, index) => {
        const isLast = index === childSegments.length - 1
        return (
          <Typography
            key={segment}
            variant="body1"
            sx={isLast ? { color: 'text.primary', fontWeight: 600 } : undefined}
          >
            {humanizeSegment(segment)}
          </Typography>
        )
      })}
    </StyledBreadcrumbs>
  )
}
