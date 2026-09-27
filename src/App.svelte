<script>
  import { onMount } from 'svelte'

  let overcharged = $state(false)

  function stopOvercharge() {
    overcharged = false
    document.documentElement.classList.remove('overcharged')
  }

  function startOvercharge() {
    overcharged = true
    document.documentElement.classList.add('overcharged')
  }

  const projects = [
    {
      name: 'Legio Launcher',
      description: 'A game launcher built with Linux as the first-class platform.',
      href: 'https://github.com/fraa2a/Legio',
    },
    {
      name: 'Word2a',
      href: 'https://github.com/fraa2a/word2a',
    },
    {
      name: 'Monolith',
      description: 'A Windows clipping and recording app with a replay buffer and direct capture controls.',
      href: 'https://github.com/fraa2a/Monolith',
    },
  ]

  onMount(() => {
    const secretCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
    ]
    let position = 0
    let revealObserver

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
      document.documentElement.classList.add('motion-ready')
      revealObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })

      document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element))
    }

    function handleKeydown(event) {
      if (event.key === 'Escape' && overcharged) {
        stopOvercharge()
        return
      }

      if (event.key === secretCode[position]) {
        position += 1
      } else {
        position = event.key === secretCode[0] ? 1 : 0
      }

      if (position === secretCode.length) {
        position = 0
        startOvercharge()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      revealObserver?.disconnect()
      document.documentElement.classList.remove('motion-ready')
      document.documentElement.classList.remove('overcharged')
    }
  })
</script>

<div class="page-shell" id="home">
  <header class="site-header">
    <a class="wordmark" href="#home" aria-label="Francesco home">fraa<span>™</span></a>

    <nav class="site-nav" aria-label="Main navigation">
      <a href="#about">About</a>
      <a href="#work">Work</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy" data-reveal>
        <h1 id="hero-title">Hi, I’m Francesco<span>.</span></h1>
        <p class="hero-description">
          I learn by building software and exploring Linux, self-hosting, and systems.
        </p>
        <div class="hero-actions">
          <a class="button button-primary" href="#work"><span>See my work</span><span aria-hidden="true">↘</span></a>
        </div>
      </div>
    </section>

    <section class="about-section" id="about" aria-labelledby="about-title" data-reveal>
      <div class="about-layout">
        <h2 id="about-title">about_me</h2>
        <div class="about-copy">
          <p>I’m a student developer based in Italy 🇮🇹. I learn by building software and exploring Linux, self-hosting, and systems.</p>
          <p>Most of my work is desktop software, from a Linux-first game launcher to a Windows clipping and recording app.</p>
        </div>
      </div>
    </section>

    <section class="work-section" id="work" aria-labelledby="work-title">
      <div class="section-heading" data-reveal>
        <h2 id="work-title">selected_work</h2>
      </div>

      <div class="project-grid">
        {#each projects as project, index (project.name)}
          <a
            class="project-card"
            href={project.href}
            target="_blank"
            rel="noreferrer"
            data-reveal
            style={`--reveal-delay: ${index * 75}ms`}
          >
            <span class="project-heading">
              <span class="project-name">{project.name}</span>
            </span>
            {#if project.description}
              <span class="project-description">{project.description}</span>
            {/if}
            <span class="project-open">Open project <span class="project-open-arrow" aria-hidden="true">↗</span></span>
          </a>
        {/each}
      </div>

      <div class="tool-section" aria-labelledby="tools-title">
        <h3 class="tool-heading" id="tools-title" data-reveal>Tools I use</h3>
        <ul class="tool-list">
          <li><img class="tool-badge" alt="Rust" src="https://shieldcn.dev/badge/Rust.svg?logo=rust&amp;color=f97316" height="32" /></li>
          <li><img class="tool-badge" alt="Python" src="https://shieldcn.dev/badge/Python.svg?logo=python&amp;color=0061ff" height="32" /></li>
          <li><img class="tool-badge" alt="Svelte" src="https://shieldcn.dev/badge/Svelte.svg?logo=svelte&amp;color=ff4200" height="32" /></li>
          <li><img class="tool-badge" alt="Git" src="https://shieldcn.dev/badge/Git.svg?logo=git" height="32" /></li>
          <li><img class="tool-badge" alt="Arch Linux" src="https://shieldcn.dev/badge/Arch Linux.svg?logo=archlinux" height="32" /></li>
        </ul>
      </div>
    </section>

    <section class="contact-section" id="contact" aria-labelledby="contact-title" data-reveal>
      <div>
        <h2 id="contact-title">Have something in mind?</h2>
        <p>Tell me about it.</p>
      </div>
      <a class="contact-link" href="mailto:fraa2a@proton.me">
        <span>fraa2a@proton.me</span><span aria-hidden="true">↗</span>
      </a>
    </section>
  </main>

  <footer class="site-footer">
    <a class="wordmark" href="#home" aria-label="Back to top">fraa<span>™</span></a>
    <div class="footer-links">
      <a href="https://github.com/fraa2a" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://ds.taxphobia.top" target="_blank" rel="noreferrer">Discord</a>
    </div>
  </footer>
</div>

{#if overcharged}
  <div class="overcharge-toast" role="status" aria-live="polite">
    <div class="overcharge-copy">
      <strong>OVERCHARGED</strong>
      <span>Press Esc or close this notice to cool down.</span>
    </div>
    <button type="button" onclick={stopOvercharge} aria-label="Power down overcharged mode"><span>×</span></button>
  </div>
{/if}
