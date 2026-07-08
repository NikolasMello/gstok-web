# Material UI - Vite example in TypeScript

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #target-branch-reference -->

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2 material-ui-master/examples/material-ui-vite-ts
cd material-ui-vite-ts
```

Install it and run:

```bash
npm install
npm run dev
```

or:

<!-- #target-branch-reference -->

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/mui/material-ui/tree/master/examples/material-ui-vite-ts)

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mui/material-ui/tree/master/examples/material-ui-vite-ts)

## The idea behind the example

<!-- #host-reference -->

This example demonstrates how you can use Material UI with [Vite](https://vite.dev) in [TypeScript](https://github.com/Microsoft/TypeScript).
It includes `@mui/material` and its peer dependencies, including [Emotion](https://emotion.sh/docs/introduction), the default style engine in Material UI.

## What's next?

<!-- #host-reference -->

You now have a working example project.
You can head back to the documentation and continue by browsing the [templates](https://mui.com/material-ui/getting-started/templates/) section.

## Import conventions

Imports are organized into five groups, separated by a blank line, in this order:

1. `react` / `react-dom`
2. Other external packages (`@tanstack/*`, `zod`, etc.)
3. MUI components (`@mui/material/*`, `@mui/icons-material/*`, `@mui/x-data-grid`, etc.)
4. Internal modules via the `@/` alias (anything outside the current feature folder: `@/components`, `@/theme`, `@/service`, `@/context`, other `@/features/*`)
5. Local modules via relative path (`./`, `../`) — only for files within the same feature folder

Within each group, imports are sorted alphabetically by module path.

Use `@/...` whenever importing something outside the current feature folder; reserve relative imports for siblings within the same feature (components, `../hooks`, `../schemas`). Avoid `../../../../`-style deep relative paths — that depth is a sign the import should use `@/` instead.

Type-only imports use `import type { X } from '...'` (or an inline `type` modifier when mixed with value imports from the same module) and stay in the same group as the corresponding value import.

This grouping/ordering is enforced automatically by `eslint-plugin-simple-import-sort` (see [eslint.config.ts](eslint.config.ts)) and applied via `npm run lint:fix`. Note that the rule only sorts/groups existing import paths — it does not rewrite relative paths to `@/` for you.

Example:

```tsx
import * as React from 'react'

import { useForm } from '@tanstack/react-form'
import { Link as RouterLink } from '@tanstack/react-router'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import ColorModeSelect from '@/theme/ColorModeSelect'
import { HttpError, isApiError } from '@/service/http'

import ForgotPassword from './ForgotPassword'
import { signInSchema } from '../schemas/signInSchema'
```
