# yodsukar.com design system (Nov 21 2026)

Source of truth for the portfolio. Made with the design process in Rich's CLAUDE.md:
A = ui-ux-pro-max (`--design-system "video editor motion designer portfolio cinematic"`, variance 7, motion 5, density 3),
B = frontend-design plan below. The tool's pattern (hero-centric, dark, one primary CTA, video controls, reduced motion)
was kept; its palette (pink #EC4899 + blue #2563EB on slate) and Inter were rejected as generic streaming-app defaults.

## Subject
A working video editor / motion designer's reel site. Audience: producers, agencies, hiring managers deciding in under a
minute whether to watch more. Primary job: get them to press play, then email Rich.

## Concept: "the grade"
The page looks like a graded frame: shadows pushed to blue-green, highlights warm, one amber tally light. The single
bold moment is the hero reel shown in a 2.39:1 letterbox that opens like a projector gate on load. Everything else is quiet.

## Color
| Token | Hex | Use |
|---|---|---|
| `--shadow` | `#0D1D21` | page background (graded shadow, pushed teal after critique: #0E191C read as near-black) |
| `--panel` | `#14272D` | About band, thumbnail placeholder |
| `--panel-2` / `--panel-hot` | `#1A3038` / `#213A43` | timeline clips / the highlighted post-production clip |
| `--line` | `#29404A` | hairlines, card outlines |
| `--body-text` | `#D5D0C6` | long About paragraphs |
| `--highlight` | `#EEE7DB` | body text and headings (warm highlight) |
| `--muted` | `#9DAEB1` | secondary text (7.4:1 on shadow) |
| `--tally` | `#F2B33D` | ONE accent: primary button, focus ring, playhead. Text on it = `--shadow` (9.6:1) |
| `--paper` | `#ECE6DC` | brand logo band (a white title card in the cut) |
| `--paper-ink` | `#1D2A2E` | text on paper |

## Type
One family, Archivo (Google Fonts, variable wdth 62-125, wght 100-900). Personality comes from WIDTH:
- Display (h1, h2, contact line): Archivo, `font-stretch: 68%`, weight 800, tight leading 0.92, tracking -0.01em. Reads like
  condensed film-credit type.
- Body / UI: Archivo, `font-stretch: 100%`, 400/500/600. Base 17px, line-height 1.6, measure <= 68ch.
- Numbers (years, step numbers): `font-variant-numeric: tabular-nums`.
- No all-caps eyebrows, no monospace labels, no single-word accent in headlines.
Scale (rem): 0.875 small, 1.0625 body, 1.25 lead, 1.5 h3, clamp(2.25, 5vw, 4) h2, clamp(3, 8.5vw, 7.5) h1.

## Layout
- Wrap 1240px, 24px gutters (16px under 480px). Left aligned everywhere.
- Hero: nav, then the letterboxed reel full wrap width (2.39:1 >= 760px, 16:9 below), then a 2-column row: huge headline
  left, lede + buttons right. A 3-item fact row under it.
- Work comes straight after the hero (critique P1): two features, then 4 across (2 on phones), then 3 vertical shorts.
- Brands: full-bleed paper band AFTER the work, logos grayscale multiply at full opacity (white / outline marks get `.is-outline` = solid ink), 5 / 4 / 3 columns.
- About: portrait + copy, then the production process drawn as a real timeline track (4 clips, it IS a sequence).
- Contact: one giant condensed line + email button + copy button.

```
| Rich Yodsukar                 Work  About  [Email me] |
|=======================================================|  <- letterbox bar
|              2026 reel (silent loop)        [▶ Play]  |
|=======================================================|
| A VIDEO EDITOR TELLING         | 15+ years across ...  |
| STORIES THAT CREATE RESULTS.   | [Watch the reel] [Email]
| Experience | What I do | Formats                       |
```

## Shape, depth, motion
- Radius: 4px on media (film frames are square-ish), 999px only on buttons. No drop shadows on cards; a 1px `--line` frame.
- Motion: ONE page-load moment (letterbox opens, 1s, ease-out); text is visible immediately. The silent loop has a 44px pause button (WCAG 2.2.2). Phones crop the gate to 2:1. Hover = thumbnail brightens + tally-colored playhead
  line runs under the card (200ms). No scroll fade-ins. `prefers-reduced-motion`: no gate animation, no silent loop.

## Components
- Button primary: tally bg, shadow text, 48px min height. Ghost: 1.5px `--line` border, highlight text.
- Work card: 16:9 thumb, client (muted, 0.875rem), title (600, 1.0625rem). Whole card is the link, opens the lightbox.
- Lightbox: native <dialog>, close button 44px, Esc closes, vertical variant 9:16.

## Checklist (from ui-ux-pro-max)
Contrast >= 4.5:1, visible focus (tally ring), 44px targets, alt text, reduced motion, no horizontal scroll at 375 / 390,
lazy images with reserved aspect ratio, cursor pointer on clickables, hover 150-300ms.

## Decisions log (Nov 21 2026)
- Critique (impeccable, dual-agent): 25/32. Fixed: work before logos, h1 max 5.25rem, logo opacity, mobile Work link,
  lightbox caption + "Open on YouTube" fallback, clipboard failure message, focus double line, hardcoded colors -> tokens.
- Detector exceptions kept on purpose: cramped-padding on `.gate` (letterbox bars, child is video) and `.glance`
  (flush-left column aligned to the page), side-tab on `.thumb::after` (hover-only playhead, the concept's affordance).
- Open, needs Rich: a role line per piece (edit / motion / shoot), the two "Fundy Designer / Be the Hero" cards, YouTube
  title "RbA 0626 ANNIVERSARY V6" on the first short, logo wall brands with no matching work in the grid.
