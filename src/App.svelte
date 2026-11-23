<script>
  import { onMount } from 'svelte'
  import { profile, tools, projects, sites } from './lib/data.ts'
  import Contributions from './lib/Contributions.svelte'

  let overcharged = $state(false)

  function stopOvercharge() {
    overcharged = false
    document.documentElement.classList.remove('overcharged')
  }

  function startOvercharge() {
    overcharged = true
    document.documentElement.classList.add('overcharged')
  }

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

<div class="page" id="home">
  <main>
    <section class="intro" aria-labelledby="name">
      <aside class="side" data-reveal>
        <div class="who">
          <img class="avatar" src="/avatar.jpg" alt="Portrait of {profile.name}" width="240" height="240" />
          <p class="label role">{profile.role}</p>
        </div>
        <ul class="info">
          <li><span class="ico ico-github" aria-hidden="true"></span><a href={profile.github} target="_blank" rel="noreferrer">@{profile.handle}</a></li>
          <li><span class="ico ico-location" aria-hidden="true"></span>{profile.location}</li>
          <li><span class="ico ico-mail" aria-hidden="true"></span><a href="mailto:{profile.email}">{profile.email}</a></li>
          <li><span class="ico ico-discord" aria-hidden="true"></span><span><span class="sr-only">Discord: </span>@{profile.handle}</span></li>
        </ul>
      </aside>

      <div class="lead" data-reveal style="--reveal-delay: 80ms">
        <h1 id="name">{profile.name}</h1>
        <div class="bio">
          {#each profile.bio as paragraph}
            <p>{paragraph}</p>
          {/each}
        </div>
        <Contributions handle={profile.handle} fallback={profile.contributions} />
      </div>
    </section>

    <section class="block" aria-labelledby="tools-title">
      <h2 class="label" id="tools-title" data-reveal>Tools</h2>
      {#each tools as row}
        <ul class="tools" data-reveal>
          {#each row as tool}
            <li style={`--tool-color: ${tool.color}; --icon: url(/icons/tools/${tool.icon}.svg)`}>
              <span class="tool-ico" aria-hidden="true"></span>{tool.name}
            </li>
          {/each}
        </ul>
      {/each}
    </section>

    <section class="block" aria-labelledby="projects-title">
      <h2 class="label" id="projects-title" data-reveal>Projects</h2>
      <ul class="projects">
        {#each projects as project, index (project.name)}
          <li data-reveal style={`--reveal-delay: ${index * 70}ms`}>
            {#if project.href}
              <a class="project" href={project.href} target="_blank" rel="noreferrer">
                <span class="project-name">{project.name}</span>
                <span class="project-description">{project.description}</span>
              </a>
            {:else}
              <div class="project">
                <span class="project-name">{project.name}<span class="tag">private</span></span>
                <span class="project-description">{project.description}</span>
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    </section>

    <section class="block" aria-labelledby="web-title">
      <h2 class="label" id="web-title" data-reveal>Web</h2>
      <ul class="projects">
        {#each sites as site, index (site.name)}
          <li data-reveal style={`--reveal-delay: ${index * 70}ms`}>
            <a class="project" href={site.href} target="_blank" rel="noreferrer">
              <span class="project-name">{site.name}</span>
              <span class="project-description">{site.description}<span class="domain">{new URL(site.href).hostname.replace(/^www\./, '')}</span></span>
            </a>
          </li>
        {/each}
      </ul>
    </section>
  </main>

  <footer class="footer">
    <span>fraa™</span>
    <a href={profile.github} target="_blank" rel="noreferrer">github.com/{profile.handle}</a>
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
