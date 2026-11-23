export const profile = {
  name: 'fraa',
  handle: 'fraa2a',
  location: 'Italy',
  email: 'fraa2a@proton.me',
  github: 'https://github.com/fraa2a',
  contributions: 'https://ghchart.rshah.org/00115c/fraa2a',
  bio: [
    'I’m Francesco, a software developer based in Italy. I design and ship software that works: cross-platform desktop apps, terminal tools and websites, built with Rust and modern web technologies.',
    'I own the architecture and every technical decision. AI turns my plans into code, so I can deliver fast without losing control of what’s inside.',
  ],
}

export const tools = [
  [
    { name: 'Claude Code', icon: 'claude', color: '#d97757' },
    { name: 'Codex CLI', icon: 'openai', color: '#f2f2f2' },
    { name: 'Vercel', icon: 'vercel', color: '#f2f2f2' },
    { name: 'Supabase', icon: 'supabase', color: '#3ecf8e' },
    { name: 'Cloudflare', icon: 'cloudflare', color: '#f38020' },
    { name: 'Git', icon: 'git', color: '#f05032' },
    { name: 'Arch Linux', icon: 'archlinux', color: '#1793d1' },
  ],
  [
    { name: 'Rust', icon: 'rust', color: '#f74c00' },
    { name: 'Python', icon: 'python', color: '#4b8bbe' },
    { name: 'TypeScript', icon: 'typescript', color: '#3a8ee6' },
    { name: 'Java', icon: 'java', color: '#f89820' },
  ],
]

type Project = { name: string; description: string; href?: string }


export const projects: Project[] = [
  {
    name: 'Legio Launcher',
    description: 'A game launcher built with Linux as the first-class platform.',
    href: 'https://github.com/fraa2a/Legio',
  },
  {
    name: 'Omega',
    description: 'Work in progress. More soon.',
  },
  {
    name: 'word2a',
    description: 'A simple terminal word game built with Ratatui.',
    href: 'https://github.com/fraa2a/word2a',
  },
]

export const sites = [
  {
    name: 'TaxPhobia',
    description: 'Website for the TaxPhobia Discord community.',
    href: 'https://www.taxphobia.top/',
  },
  {
    name: 'Alex946',
    description: 'Portfolio for a video editor making YouTube videos and reels.',
    href: 'https://alex946.art/',
  },
  {
    name: 'Watch2A',
    description: 'Watch YouTube in sync with friends. No accounts, no app.',
    href: 'https://watch.fraa2a.dev/',
  },
  {
    name: 'bet2a',
    description: 'A virtual minigames and casino websites .',
    href: 'https://bet.fraa2a.dev/',
  },
]
