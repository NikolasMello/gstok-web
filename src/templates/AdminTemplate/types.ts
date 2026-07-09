import type { FileRouteTypes } from '../../routeTree.gen'
import type { MuiSvgIcon } from '../../types/MuiSvgIcon'

export type NavItem = {
  text: string
  Icon: MuiSvgIcon
  route: FileRouteTypes['to']
}

export type NavGroup = {
  title: string
  items: NavItem[]
}
