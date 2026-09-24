<script>
  let menuOpen = $state(false)

  const projects = [
    {
      number: '01',
      name: 'Legio Launcher',
      type: 'DESKTOP LAUNCHER · IN DEVELOPMENT',
      description:
        'A game launcher built with Rust and Tauri, with a Linux-first focus.',
      stack: ['Rust', 'Tauri', 'Svelte'],
      href: 'https://github.com/fraa2a/Legio',
      mark: 'L',
      tone: 'lime',
    },
    {
      number: '02',
      name: 'Monolith',
      type: 'WINDOWS APP · RUST + TAURI',
      description:
        'A Windows clipping and recording app with a replay buffer and direct capture controls.',
      stack: ['Rust', 'Tauri', 'FFmpeg'],
      href: 'https://github.com/fraa2a/Monolith',
      mark: 'M',
      tone: 'lavender',
    },
    {
      number: '03',
      name: 'Mango Launcher',
      type: 'OPEN-SOURCE · GAME LAUNCHER',
      description:
        'A gaming platform for organizing and launching games, with emulation and big-picture support.',
      stack: ['Desktop', 'Gaming', 'Open source'],
      href: 'https://github.com/fraa2a/mango-launcher',
      mark: 'M',
      tone: 'blue',
    },
    {
      number: '04',
      name: 'Icarus Launcher',
      type: 'DESKTOP APP · MODRINTH FORK',
      description:
        'A privacy-focused Modrinth app fork with telemetry and ads removed, plus offline account support.',
      stack: ['Modrinth', 'Privacy', 'Offline accounts'],
      href: 'https://github.com/fraa2a/Icarus-Launcher',
      mark: 'I',
      tone: 'peach',
    },
  ]

  const skills = ['Rust', 'TypeScript', 'Svelte', 'Tauri', 'Linux', 'Self-hosting']

  function closeMenu() {
    menuOpen = false
  }
</script>

<div class="page-shell" id="home">
  <header class="site-header">
    <a class="wordmark" href="#home" onclick={closeMenu} aria-label="Francesco home">
      fraa<span>™</span>
    </a>

    <span class="header-note">PERSONAL PORTFOLIO</span>

    <div class="navigation">
      <button
        class:open={menuOpen}
        class="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onclick={() => (menuOpen = !menuOpen)}
      >
        <img src="/icons/menu-outline.svg" alt="" aria-hidden="true" />
      </button>

      {#if menuOpen}
        <nav class="menu-panel" id="site-menu" aria-label="Main navigation">
          <a href="#about" onclick={closeMenu}>about</a>
          <a href="#work" onclick={closeMenu}>work</a>
          <a href="#skills" onclick={closeMenu}>skills</a>
          <a href="#contact" onclick={closeMenu}>contact</a>
        </nav>
      {/if}
    </div>
  </header>

  <main>
    <section class="hero" id="about" aria-labelledby="hero-title">
      <p class="eyebrow"><span>HI <span class="wave">👋</span></span> · STUDENT DEVELOPER · ITALY</p>

      <div class="hero-main">
        <div class="identity-card" aria-hidden="true">
          <div class="identity-card__top">
            <span>FRAA™</span>
            <span class="identity-card__dot"></span>
          </div>
          <div class="identity-card__mark">
            <img src="/logo.svg" alt="" />
          </div>
          <div class="identity-card__bottom">
            <span>SOFTWARE</span>
            <span>ITALY / 01</span>
          </div>
        </div>

        <div class="hero-copy">
          <p class="hero-name">I’M FRANCESCO, AND I’M A</p>
          <h1 id="hero-title">SOFTWARE<br />DEVELOPER<span class="accent-cursor">_</span></h1>
          <p class="hero-description">
            I learn by building software and exploring Linux, self-hosting, and systems.
          </p>
          <div class="hero-actions">
            <a class="button button--primary" href="#work">CHECK MY WORK</a>
            <span class="action-separator">or</span>
            <a class="button button--outline" href="mailto:fraa2a@proton.me">
              GET IN TOUCH
              <img src="/icons/mail-outline.svg" alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div class="status-panel" aria-label="About Francesco">
        <div class="status-item">
          <span class="status-label"><span class="status-dot"></span> CURRENTLY BUILDING</span>
          <span class="status-value">Legio Launcher</span>
        </div>
        <div class="status-item">
          <span class="status-label"><img src="/icons/code-outline.svg" alt="" /> FOCUS</span>
          <span class="status-value">Software · Linux</span>
        </div>
        <div class="status-item">
          <span class="status-label"><img src="/icons/location-outline.svg" alt="" /> BASED IN</span>
          <span class="status-value">Italy</span>
        </div>
      </div>
    </section>

    <section class="work-section" id="work" aria-labelledby="work-title">
      <div class="section-heading">
        <p class="eyebrow">A FEW THINGS I’VE MADE</p>
        <h2 id="work-title">SELECTED<span>_</span>WORKS</h2>
      </div>

      <div class="work-list">
        {#each projects as project (project.number)}
          <article class="work-row">
            <div class={`project-cover project-cover--${project.tone}`} aria-hidden="true">
              <div class="project-cover__top">
                <span class="project-cover__index">{project.number} / 04</span>
                <span class="project-cover__symbol">{project.mark}</span>
              </div>
              <div class="project-cover__center">
                <span class="project-cover__name">{project.name}</span>
                <span class="project-cover__rule"></span>
                <span class="project-cover__type">{project.type}</span>
              </div>
              <div class="project-cover__bottom">
                <span>FRAA™</span>
                <span class="project-cover__cross">+</span>
                <span>PROJECT / {project.number}</span>
              </div>
            </div>

            <div class="project-details">
              <div class="project-heading-line">
                <span class="project-number">{project.number}</span>
                <h3>{project.name}</h3>
              </div>
              <p class="project-type">{project.type}</p>
              <p class="project-description">{project.description}</p>
              <ul class="tag-list" aria-label={`${project.name} technologies and topics`}>
                {#each project.stack as item (item)}
                  <li>{item}</li>
                {/each}
              </ul>
              <a class="text-link" href={project.href} target="_blank" rel="noreferrer">
                VIEW SOURCE
                <img src="/icons/external-link-outline.svg" alt="" aria-hidden="true" />
              </a>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <section class="skills-section" id="skills" aria-labelledby="skills-title">
      <div class="section-heading">
        <p class="eyebrow">TOOLS I WORK WITH</p>
        <h2 id="skills-title">MY<span>_</span>SKILLS</h2>
      </div>
      <ul class="skills-list">
        {#each skills as skill (skill)}
          <li><img src="/icons/code-outline.svg" alt="" aria-hidden="true" /> {skill}</li>
        {/each}
      </ul>
    </section>

    <section class="contact-section" id="contact" aria-labelledby="contact-title">
      <div>
        <p class="eyebrow">CONTACT</p>
        <h2 id="contact-title">LET’S TALK<span>_</span></h2>
      </div>
      <a class="button button--primary" href="mailto:fraa2a@proton.me">
        EMAIL ME
        <img src="/icons/mail-outline.svg" alt="" aria-hidden="true" />
      </a>
    </section>
  </main>

  <footer class="site-footer">
    <a class="wordmark" href="#home">fraa<span>™</span></a>
    <p>BUILT BY FRANCESCO</p>
    <div class="footer-links">
      <a href="https://github.com/fraa2a" target="_blank" rel="noreferrer">GITHUB</a>
      <a href="https://ds.taxphobia.top" target="_blank" rel="noreferrer">DISCORD</a>
      <a href="mailto:fraa2a@proton.me">EMAIL</a>
    </div>
  </footer>
</div>
