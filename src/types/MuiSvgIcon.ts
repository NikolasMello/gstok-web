import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export type MuiSvgIcon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string
}
