/**
 * Infosys Consulting (IC) — Design Tokens
 *
 * Canonical source of truth for color, typography, and layout used across
 * IC collaterals (slides, briefing decks, status reports, one-pagers).
 *
 * Hard rules — these are baked in and must not be violated:
 *   - NO burnt orange. The brand is blue-led; warm accents are not allowed.
 *   - NO pure black (#000000). Use PAVEMENT for all "black" text and lines.
 *   - DEEP_BLUE is used ONLY in slide title bands and section separators.
 *     That is the entire allowed list. Specifically forbidden, even though
 *     it might feel "branded": column/card headers, table header rows,
 *     swim-lane labels, callout fills, navigation/footer bands, chart series,
 *     icon fills. When you reach for DEEP_BLUE, ask: "is this a title band
 *     or a section separator?" If no, use something else.
 *   - BLUE is the working accent across slides — the everyday blue used for
 *     section heads, accent strokes, chart primary series, callouts, hero
 *     figures, and emphasized phrases. It is meant to appear on most slides.
 *     LT_BLUE is a softer companion for secondary accents and fine separators.
 */

// ---------------------------------------------------------------------------
// Core brand palette (light mode — the default IC look)
// ---------------------------------------------------------------------------
const palette = {
  WHITE:      '#FFFFFF',  // page / slide background
  DEEP_BLUE:  '#182534',  // title bands & section-divider backgrounds — used very sparingly
  PAVEMENT:   '#404040',  // titles, primary body text (the "black" of IC)
  BLUE:       '#007CC3',  // working slide accent — section heads, callouts, charts, hero figures
  STONE:      '#A7A9AC',  // muted gray — secondary labels, captions
  SLATE:      '#6D6E71',  // mid gray — supporting text, axis labels
  LT_BLUE:    '#3699DA',  // secondary accent — fine separators, hover states, soft emphasis

  // Derived tints — for shaded callouts, table zebra rows, soft borders.
  TINT_BLUE_BG:  '#E6F2FA', // ~8% BLUE on white — subtle blue surface
  TINT_STONE_BG: '#F2F2F3', // ~6% STONE on white — neutral table fill
  RULE:          '#E2E4E7', // hairline borders, table grid, card edges
};

// ---------------------------------------------------------------------------
// Status / semantic colors — severity badges, RACI pills, traffic lights
// Kept separate from the brand palette so they can be tuned independently.
// ---------------------------------------------------------------------------
const status = {
  RED:    '#C0392B',  // critical, blocked, R (Responsible-overdue)
  AMBER:  '#D89B1F',  // at-risk, watch, pending  (NOT burnt orange — muted gold)
  GREEN:  '#2E8B57',  // on-track, complete, healthy
  GRAY:   '#A7A9AC',  // not-started, N/A         (= palette.STONE)

  // Soft fills for pill backgrounds — pair each with its solid above for the
  // pill's text & border. Keeps badges legible without shouting on the page.
  RED_BG:   '#FBEAE7',
  AMBER_BG: '#FBF1DD',
  GREEN_BG: '#E4F1EA',
  GRAY_BG:  '#F2F2F3',
};

// ---------------------------------------------------------------------------
// Semantic role assignments — light mode
// Components should reference these (e.g. tokens.light.text.primary), NOT raw
// hex values. That way the same component renders correctly in dark mode.
// ---------------------------------------------------------------------------
const light = {
  surface: {
    page:        palette.WHITE,
    card:        palette.WHITE,
    titleBand:   palette.DEEP_BLUE,   // only place DEEP_BLUE is allowed as fill
    divider:     palette.DEEP_BLUE,   // section-divider slides
    subtleBlue:  palette.TINT_BLUE_BG,
    subtleGray:  palette.TINT_STONE_BG,
  },
  text: {
    primary:       palette.PAVEMENT,  // body, titles on white
    onTitleBand:   palette.WHITE,     // text sitting on DEEP_BLUE
    secondary:     palette.SLATE,
    muted:         palette.STONE,
    accent:        palette.BLUE,      // the one key takeaway
    accentSubtle:  palette.LT_BLUE,   // secondary blue emphasis
    link:          palette.BLUE,
  },
  stroke: {
    rule:      palette.RULE,          // hairline borders, table grid
    separator: palette.LT_BLUE,       // fine accent separators
    emphasis:  palette.BLUE,          // underline under hero figure
  },
  status,
};

// ---------------------------------------------------------------------------
// Semantic role assignments — dark mode
// Strategy: DEEP_BLUE becomes the page surface (it's already in-palette and
// respects the "no pure black" rule). Title bands shift to a lighter blue so
// they still read as a band against the dark page. The primary accent moves
// to LT_BLUE for AA contrast on dark; BLUE remains usable for hero figures.
// ---------------------------------------------------------------------------
const darkPalette = {
  PAGE_DARK:       '#0F1924',  // one shade deeper than DEEP_BLUE — page bg
  SURFACE_DARK:    '#182534',  // = DEEP_BLUE — cards, panels on the page
  TITLE_BAND_DARK: '#22384F',  // lighter than surface so the band reads
  TEXT_PRIMARY:    '#F2F2F3',  // near-white, NOT pure white (avoids glare)
  TEXT_SECONDARY:  '#C8CACD',  // = STONE lifted toward white
  TEXT_MUTED:      '#8A8C8F',  // = SLATE
  RULE_DARK:       '#2B3B4F',  // hairlines visible on dark surfaces
  TINT_BLUE_DARK:  '#1E3C57',  // soft blue callout fill on dark
  TINT_GRAY_DARK:  '#1F2A36',  // neutral panel fill on dark
};

const dark = {
  surface: {
    page:        darkPalette.PAGE_DARK,
    card:        darkPalette.SURFACE_DARK,
    titleBand:   darkPalette.TITLE_BAND_DARK,
    divider:     darkPalette.TITLE_BAND_DARK,
    subtleBlue:  darkPalette.TINT_BLUE_DARK,
    subtleGray:  darkPalette.TINT_GRAY_DARK,
  },
  text: {
    primary:       darkPalette.TEXT_PRIMARY,
    onTitleBand:   darkPalette.TEXT_PRIMARY,
    secondary:     darkPalette.TEXT_SECONDARY,
    muted:         darkPalette.TEXT_MUTED,
    accent:        palette.LT_BLUE,   // LT_BLUE has better AA contrast on dark
    accentSubtle:  palette.BLUE,
    link:          palette.LT_BLUE,
  },
  stroke: {
    rule:      darkPalette.RULE_DARK,
    separator: palette.LT_BLUE,
    emphasis:  palette.LT_BLUE,
  },
  // Status colors are tuned for dark surfaces — solids brighten slightly,
  // pill backgrounds switch to low-saturation deep tints.
  status: {
    RED:    '#E76A5C',
    AMBER:  '#E6B958',
    GREEN:  '#4FB07A',
    GRAY:   darkPalette.TEXT_MUTED,
    RED_BG:   '#3A1F1C',
    AMBER_BG: '#3A2E18',
    GREEN_BG: '#1C3A2A',
    GRAY_BG:  '#262E38',
  },
};

// ---------------------------------------------------------------------------
// Typography — IC has THREE font families. Each does one job; pick the family
// by the artifact type, not by personal preference.
//
//  1. SYSTEM (Arial-led) — for editable internal files
//     Standard PowerPoint, Word, anything shared as an editable document.
//     Arial ships pre-installed on Windows, macOS, and ChromeOS; no font
//     embedding required; the file renders identically on every machine.
//
//  2. EDITORIAL (Fraunces + Newsreader + JetBrains Mono) — for POVs,
//     consulting decks, primers, one-pagers. Anything where the artifact
//     IS the deliverable and design quality is part of the value.
//     Newsreader's serif body works for long-form reading; Fraunces' variable
//     italics (SOFT/WONK) carry the editorial emphasis.
//
//  3. TECHNICAL (Fraunces + IBM Plex Sans + JetBrains Mono) — for
//     engineering notes, self-learning guides, internal docs with code.
//     IBM Plex Sans body keeps long technical content readable; Fraunces
//     stays as the display face so the family reads as a sibling of the
//     editorial artifacts. Code blocks use JetBrains Mono prominently.
//
// All non-system fonts are open-source (OFL). Embed them when shipping to
// recipients who may not have them installed.
//
// Sizes are in points (slide authoring) with px equivalents for web.
// ---------------------------------------------------------------------------
const typography = {
  family: {
    // System family — editable, install-free
    sans: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
    mono: "Consolas, 'Courier New', Menlo, monospace",

    // Editorial family — POVs, decks, primers, one-pagers
    display:   "'Fraunces', 'Times New Roman', serif",
    bodySerif: "'Newsreader', 'Georgia', serif",

    // Technical family — engineering notes, learning docs with code
    bodySans:  "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",

    // Shared utility face — used in both editorial and technical families
    monoEd:    "'JetBrains Mono', 'SF Mono', Consolas, monospace",
  },
  weight: {
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },
  // Slide-authoring scale — pt sizes match the IC PowerPoint master.
  size: {
    sectionDivider: 40,  // huge type on DEEP_BLUE divider slides
    slideTitle:     24,  // title-band text
    sectionHead:    18,  // H2 within a slide body
    body:           14,  // default body text
    caption:        11,  // footnotes, source lines, axis labels
    micro:           9,  // page numbers, deck metadata
  },
  // Web equivalents in px for HTML collaterals.
  webSize: {
    h1: 32,
    h2: 22,
    h3: 18,
    body: 15,
    caption: 12,
    micro: 10,
  },
  lineHeight: {
    tight:   1.15,
    snug:    1.30,
    normal:  1.45,
    relaxed: 1.60,
  },
  letterSpacing: {
    tight:   '-0.01em',
    normal:  '0',
    wide:    '0.04em',  // ALL-CAPS labels, micro tags
  },
};

// ---------------------------------------------------------------------------
// Layout — spacing scale, grid, radii, shadows
// Spacing is a 4-pt base scale; everything else snaps to multiples of 4.
// ---------------------------------------------------------------------------
const layout = {
  spacing: {
    xs:   4,
    sm:   8,
    md:  12,
    lg:  16,
    xl:  24,
    xxl: 32,
    xxxl: 48,
  },
  // Slide canvas (16:9, 13.33in × 7.5in @ 96dpi = 1280 × 720).
  slide: {
    width:   1280,
    height:   720,
    margin:    48,   // safe-area margin inside the slide
    gutter:    24,   // gap between columns
    titleBandHeight: 64,
  },
  // Web container widths for HTML collaterals.
  container: {
    sm:  640,
    md:  840,
    lg: 1080,
    xl: 1280,
  },
  radius: {
    none:  0,
    sm:    2,    // hairline cards, table cells
    md:    4,    // default for buttons, pills, callouts
    lg:    8,    // hero cards, modal panels
    pill: 999,
  },
  borderWidth: {
    hairline: 1,
    rule:     1,
    emphasis: 2,  // under hero figures, active tab indicator
  },
  shadow: {
    // Shadows are subtle by design — IC is a "flat with hairlines" system,
    // not a Material-style elevated one. Use sparingly.
    none: 'none',
    sm:   '0 1px 2px rgba(24, 37, 52, 0.06)',
    md:   '0 2px 6px rgba(24, 37, 52, 0.08)',
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
const tokens = {
  palette,
  status,
  light,
  dark,
  typography,
  layout,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = tokens;
}
if (typeof window !== 'undefined') {
  window.ICTokens = tokens;
}
