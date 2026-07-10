import { useMemo } from 'react'

import { Link as RouterLink, useLocation, useMatches } from '@tanstack/react-router'

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
  const matches = useMatches()

  /**
   * Comparação direta em location.pathname (não via useMatchRoute()): a função que ele retorna tem
   * referência estável (useCallback preso a [router], que nunca muda), então usá-la como dependência
   * do memo travaria a seção calculada no primeiro render (ex.: "/admin/estoque", destino fixo do
   * redirect pós-login) e nunca recalcularia nas navegações seguintes, já que o layout /admin não
   * remonta entre elas.
   */
  const activeSection = useMemo(
    () =>
      navBreadcrumbs.find(
        (item) => location.pathname === item.route || location.pathname.startsWith(`${item.route}/`),
      ),
    [location.pathname],
  )
  const sectionCrumb = activeSection ?? { text: 'Início', route: '/admin' }

  /** Valores de parâmetros de rota (ex.: o :id de "/usuarios/$id/editar") não viram breadcrumb. */
  const paramValues = useMemo(
    () => new Set(matches.flatMap((match) => Object.values(match.params ?? {}))),
    [matches],
  )

  const childSegments = activeSection
    ? location.pathname
        .slice(activeSection.route.length)
        .split('/')
        .filter(Boolean)
        .filter((segment) => !paramValues.has(segment))
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
