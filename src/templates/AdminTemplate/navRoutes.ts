import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded'
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded'
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import AssignmentReturnRoundedIcon from '@mui/icons-material/AssignmentReturnRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import { NavGroup } from './types'

export const navGroups: NavGroup[] = [
  {
    title: 'Operação',
    items: [
      { text: 'Estoque', Icon: WarehouseRoundedIcon, route: '/admin/estoque' },
      { text: 'Produtos', Icon: Inventory2RoundedIcon, route: '/admin/produtos' },
      { text: 'Coleções', Icon: CategoryRoundedIcon, route: '/admin/colecoes' },
      { text: 'Fornecedores', Icon: LocalShippingRoundedIcon, route: '/admin/fornecedores' },
      { text: 'Compras', Icon: LocalMallRoundedIcon, route: '/admin/compras' },
    ],
  },
  {
    title: 'Comercial',
    items: [
      { text: 'Pedidos', Icon: ShoppingCartRoundedIcon, route: '/admin/pedidos' },
      {
        text: 'Devoluções | Trocas',
        Icon: AssignmentReturnRoundedIcon,
        route: '/admin/devolucoes',
      },
      { text: 'Clientes', Icon: PeopleRoundedIcon, route: '/admin/clientes' },
      { text: 'Promoções', Icon: LocalOfferRoundedIcon, route: '/admin/promocoes' },
    ],
  },
  {
    title: 'Financeiro',
    items: [
      {
        text: 'Fluxo de Caixa',
        Icon: AccountBalanceWalletRoundedIcon,
        route: '/admin/fluxo-de-caixa',
      },
      { text: 'Notas Fiscais', Icon: ReceiptLongRoundedIcon, route: '/admin/notas-fiscais' },
    ],
  },
  {
    title: 'Administração',
    items: [
      { text: 'Usuários', Icon: ManageAccountsRoundedIcon, route: '/admin/usuarios' },
      { text: 'Configurações', Icon: SettingsRoundedIcon, route: '/admin/configuracoes' },
    ],
  },
]

export const navBreadcrumbs = navGroups.flatMap((group) => [
  ...group.items.map((item) => ({ text: item.text, route: item.route })),
])
