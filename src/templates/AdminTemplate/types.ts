import { MuiSvgIcon } from '../../types/MuiSvgIcon'

export type NavItem = {
  text: string
  Icon: MuiSvgIcon
  route: string
}

export type NavGroup = {
  title: string
  items: NavItem[]
}
