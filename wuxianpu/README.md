# 五线谱练习 (Wuxianpu)

A web app for practicing staff notation reading, built with React 19 and TypeScript.

## What It Does

The app shows a random musical note on a staff and asks you to identify it. You can answer in three ways:

- **Text input** — type the note name (e.g. `C4`) or solfege syllable (e.g. `do`)
- **Virtual piano** — click the on-screen keyboard
- **MIDI piano** — play a connected MIDI keyboard (via the Web MIDI API)

A second mode, **Harmony Singing**, plays chords and intervals using sampled audio (Tone.js) to support ear training.

## Features

- Treble and bass clef, with a random-clef option
- 15 key signatures (all major keys with sharps and flats)
- Accidental control: none / sharp only / flat only / sharp+flat / random
- Auto-generate mode: advances to the next note automatically on a correct answer
- Score tracking with a reset button
- Responsive layout via a custom `useWindowSize` hook

## Tech Stack

| Layer | Library |
|-------|---------|
| UI framework | React 19, TypeScript 5 |
| Bundler | Webpack 5 |
| Styling | Tailwind CSS 3 |
| Audio | Tone.js 15 |
| MIDI input | Web MIDI API (browser-native) |

## Project Structure

```
src/
  apps/
    wuxianpu.tsx          # Staff notation practice app
    harmony-singing.tsx   # Harmony ear training app
  common/
    notes-utils/          # Core music theory types (NoteName, KeySignature, etc.)
    button/               # Shared button component
    dropdownmenu/         # Shared dropdown component
    toggle/               # Shared toggle component
    selectionpanel/       # Shared selection panel
    floatingdiv/          # Tooltip-style floating div
    router/               # Client-side tab router
    useWindowSize.ts      # Custom hook for responsive layout
  components/
    staff/                # Staff canvas rendering and quiz controls
    submitter/            # Answer submission (text, virtual piano, MIDI)
    hamony-player/        # Harmony audio player
```

## Getting Started

Install dependencies and build:

```bash
npm install
npm run build
```

The output goes to `dist/`. This module is part of a larger personal website and is served as a sub-path of that site.

## Development Notes

- Audio samples are loaded lazily; the first note played may have a short delay.
- MIDI input requires a browser that supports the Web MIDI API (Chrome/Edge). The app requests access on load and silently skips MIDI setup if unavailable.
- Staff rendering uses an HTML `<canvas>` element drawn imperatively; note positions are defined in `src/components/staff/notes_mapping.ts`.
