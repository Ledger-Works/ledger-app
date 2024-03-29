// uno.config.ts
import { defineConfig, transformerDirectives, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  transformers: [transformerDirectives()],
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        sans: 'Cabinet Grotesk'
      }
    }),
  ],
})