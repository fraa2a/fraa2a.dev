import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const page = readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')

test('selected work includes Icarus and a description for Word2a', () => {
  assert.match(page, /name:\s*'Icarus Launcher'/)
  assert.match(page, /href:\s*'https:\/\/github\.com\/fraa2a\/Icarus'/)
  assert.doesNotMatch(page, /name:\s*'Monolith'/)
  assert.match(page, /name:\s*'Word2a',\s*description:\s*'[^']+'/)
})

test('workplace is a separate accessible section describing the actual work', () => {
  assert.match(page, /<section[^>]+id="experience"[^>]+aria-labelledby="experience-title"/)
  assert.match(page, /Taxphobia\s*\/\s*Lodatori/)
  assert.match(page, /Minecraft servers/)
  assert.match(page, /Discord bots/)
  assert.match(page, /web[–-]Discord integrations/)
  assert.match(page, /VPS infrastructure/)
  assert.match(page, /class="experience-icon"[^>]*>/)
})

test('tools are grouped as a compact toolkit, not a peer page heading', () => {
  assert.match(page, /class="tool-bar"/)
  assert.match(page, /class="tool-label"/)
  assert.doesNotMatch(page, /<h3[^>]*>Tools I use<\/h3>/)
  assert.match(styles, /\.tool-bar\s*\{[^}]*border:/s)
})

test('primary CTA uses the heading font and navigation has a stronger glass layer', () => {
  assert.match(styles, /\.button-primary\s*\{[^}]*font-family:\s*var\(--heading\)/s)
  assert.match(styles, /\.site-header\s*\{[^}]*backdrop-filter:\s*blur\((?:2[0-9]|3[0-9])px\)/s)
  assert.match(styles, /\.site-header\s*\{[^}]*border:\s*1px solid/s)
})

test('major page sections have distinct labels and are responsive', () => {
  assert.match(page, /class="section-kicker"/)
  assert.match(styles, /\.section-kicker\s*\{/)
  assert.match(styles, /@media \(max-width: 640px\)/)
  assert.match(styles, /\.experience-card\s*\{/)
})
