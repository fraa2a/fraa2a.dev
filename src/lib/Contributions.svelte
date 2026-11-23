<script lang="ts">
  import { onMount, tick } from 'svelte'

  type Day = { date: string; count: number; level: number }
  let { handle, fallback }: { handle: string; fallback: string } = $props()

  let days: (Day | null)[] = $state([])
  let total = $state(0)
  let failed = $state(false)
  let tip: { text: string; x: number; y: number } | null = $state(null)
  let box: HTMLDivElement | undefined = $state()
  let scroller: HTMLDivElement | undefined = $state()

  const fmt = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' })
  const monthFmt = new Intl.DateTimeFormat('en', { month: 'short' })
  const parse = (date: string) => new Date(date + 'T00:00')

  // a month label sits on the week column where that month starts
  let months = $derived(
    days.flatMap((d, i) =>
      d?.date.endsWith('-01') ? [{ label: monthFmt.format(parse(d.date)), col: Math.floor(i / 7) + 1 }] : [],
    ),
  )

  onMount(async () => {
    try {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${handle}?y=last`)
      if (!res.ok) throw new Error(String(res.status))
      const data: { total: { lastYear: number }; contributions: Day[] } = await res.json()
      // pad the first week so every column starts on Sunday
      days = [...Array(parse(data.contributions[0].date).getDay()).fill(null), ...data.contributions]
      total = data.total.lastYear
      // on narrow screens the graph scrolls: start from the most recent weeks
      await tick()
      scroller?.scrollTo({ left: scroller.scrollWidth })
    } catch {
      failed = true
    }
  })

  function show(event: MouseEvent) {
    const cell = event.target as HTMLElement
    const day = cell.dataset.i === undefined ? null : days[+cell.dataset.i]
    if (!day || !box) return
    const c = cell.getBoundingClientRect()
    const b = box.getBoundingClientRect()
    const count = day.count === 0 ? 'No' : day.count
    tip = {
      text: `${count} contribution${day.count === 1 ? '' : 's'} · ${fmt.format(parse(day.date))}`,
      // keep the ~200px tooltip inside the graph near its edges
      x: Math.min(Math.max(c.left - b.left + c.width / 2, 100), b.width - 100),
      y: c.top - b.top,
    }
  }
</script>

{#if failed}
  <img class="graph" src={fallback} alt="GitHub contribution graph for {handle}" width="663" height="104" loading="lazy" />
{:else}
  <div class="contrib" bind:this={box} style="--weeks: {Math.ceil(days.length / 7) || 53}">
    <p class="contrib-total">{total ? `${total.toLocaleString('en')} contributions in the last year` : ' '}</p>
    <div class="contrib-scroll" bind:this={scroller}>
    <div class="contrib-months" aria-hidden="true">
      {#each months as m}
        <span style="grid-column: {m.col}">{m.label}</span>
      {/each}
    </div>
    <!-- svelte-ignore a11y_mouse_events_have_key_events -->
    <!-- tooltip is a mouse extra; the totals are in the aria-label -->
    <div
      class="contrib-grid"
      role="img"
      aria-label="GitHub contributions for {handle}: {total} in the last year"
      onmouseover={show}
      onmouseleave={() => (tip = null)}
    >
      {#each days as d, i}
        <span class="cell" class:empty={!d} data-i={d ? i : undefined} data-level={d?.level}></span>
      {/each}
    </div>
    </div>
    {#if tip}
      <div class="contrib-tip" style="left: {tip.x}px; top: {tip.y}px">{tip.text}</div>
    {/if}
  </div>
{/if}
