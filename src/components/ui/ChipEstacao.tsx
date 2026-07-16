import type { ReactNode } from 'react'

import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded'
import AllInclusiveRoundedIcon from '@mui/icons-material/AllInclusiveRounded'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import Chip, { type ChipProps } from '@mui/material/Chip'
import { blue, orange } from '@mui/material/colors'

import type { Estacao } from '@/service/shared/enums'

const ESTACAO_CONFIG: Record<Estacao, { label: string; icon: ReactNode; background: string }> = {
  Verao: {
    label: 'Verão',
    icon: <WbSunnyRoundedIcon />,
    background: orange[500],
  },
  Inverno: {
    label: 'Inverno',
    icon: <AcUnitRoundedIcon />,
    background: blue[500],
  },
  Todas: {
    label: 'Todas',
    icon: <AllInclusiveRoundedIcon />,
    background: `linear-gradient(90deg, ${blue[500]}, ${orange[500]})`,
  },
}

type ChipEstacaoProps = Omit<ChipProps, 'label' | 'icon' | 'color'> & {
  estacao: Estacao
}

export function ChipEstacao({ estacao, ...props }: ChipEstacaoProps) {
  const { label, icon, background } = ESTACAO_CONFIG[estacao]

  return (
    <Chip
      icon={icon as ChipProps['icon']}
      label={label}
      sx={{ background, color: '#fff', '& .MuiChip-icon': { color: 'inherit' } }}
      {...props}
    />
  )
}
