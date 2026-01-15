import type { Config } from 'tailwindcss'
import uiConfig from '@workspace/ui/tailwind.config'

const config: Config = {
  ...uiConfig,
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
}

export default config
