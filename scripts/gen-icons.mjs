import sharp from 'sharp'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'

const dir  = fileURLToPath(new URL('./', import.meta.url))
const pub  = fileURLToPath(new URL('../public/', import.meta.url))
const icon = readFileSync(dir + 'icon-source.svg')
const og   = readFileSync(dir + 'og-source.svg')

const tasks = [
  [icon, 'apple-touch-icon.png', 180],
  [icon, 'icon-192.png', 192],
  [icon, 'icon-512.png', 512],
]

for (const [buf, name, size] of tasks) {
  await sharp(buf).resize(size, size).png().toFile(pub + name)
  console.log('wrote', name, size)
}

await sharp(og).resize(1200, 630).png().toFile(pub + 'og-image.png')
console.log('wrote og-image.png 1200x630')
