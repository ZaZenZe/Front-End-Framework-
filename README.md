# Memory Game (React + TypeScript)

This project is a fork of the professor’s starter template. I kept the original structure/style and built the missing game mechanics on top. Below I acknowledge the base, then focus on what I added and how I implemented it.

## 🎮 Gameplay Rules

- Player clicks a card → it flips and shows the hero image
- Player clicks a second card → it flips
- If heroes match → cards stay flipped, pair is complete
- If no match → both cards flip back after ~1 second, missed count increases
- Game ends when all 6 pairs are matched
- Final score shows an emoji based on how many mistakes were made

Emoji scale (based on mistakes):
- 0–2: 🏆
- 3–4: 😄
- 5–7: 🙂
- 8–10: 😐
- 11+: 😵

## ✅ What’s new in my fork

- Full gameplay wiring: flip → match/mismatch → resolve → end-of-game
- Fixed shuffling: replaced naive random sort with unbiased Fisher–Yates on each new game
- Flip logic with precise rollback: only the two non-matching cards flip back after ~1s
- Counters: Moves (turns), Misses (mismatches), and Pairs matched
- End-of-game detection when all 6 pairs are matched
- Final score modal with emoji rating based on mistakes (clear scale below)
- Safer interactions: ignore clicks on matched/already-flipped cards, avoid double-clicking the same card in a turn, and block input while two flips are resolving
- Restart flow: closing the modal starts a fresh, shuffled game and resets all counters

## 🧠 How I built on the base (brief)

- I kept the existing components and styles but connected the game loop:
	- `App.tsx`: Manages deck, shuffled pairs, flips, moves, mistakes, matches, and `gameOver`.
	- On each pair of flips, I compare by hero name. If they match, I mark both as `matched`. If not, I flip them back after ~1s and increment mistakes.
	- Click guards prevent re-clicking the same card in a turn or interacting while two cards are resolving.
	- Closing the modal resets the game (reshuffle + counters cleared), so you can immediately start again.
	- `ModalComp`: Displays Moves/Misses/Pairs and an emoji based on mistakes.
	- `CardComp` + CSS Modules: drive the flip animation based on the `flipped` flag.

## 📁 Project Structure (base + additions)

```
memory-card-react/
├── public/
│   ├── assets/
│   │   └── images/          # Hero card images
│   │       ├── capitain.jpg
│   │       ├── deadpool.jpg
│   │       ├── ironman.jpg
│   │       ├── spider.jpg
│   │       ├── superman.jpg
│   │       └── wolverine.jpg
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── CardComp.tsx     # Individual card component
│   │   └── CardComp.module.css
│   ├── data/
│   │   └── cards.json       # Card data configuration
│   ├── styles/
│   │   └── bounceIn.css     # Animation styles
│   ├── types/
│   │   └── card.type.ts     # TypeScript type definitions
│   ├── App.tsx              # Main game logic and state management
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts        # Vite type declarations
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🔧 Technologies Used

- React 18 - UI library
- TypeScript - Type safety and better developer experience
- Vite - Fast build tool and development server
- CSS Modules - Scoped component styling
- ESLint - Code linting and formatting

## 🚀 Run locally

Prerequisites: Node.js (LTS recommended) and npm.

```powershell
# Install dependencies
npm install

# Start the dev server (PowerShell may block npm scripts on some machines)
npm run dev
```

If Windows PowerShell blocks scripts (execution policy), use one of these:

```powershell
# Temporary bypass for this session
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; npm run dev

# Or run via cmd from PowerShell
cmd /c "npm run dev"
```

Optional build:

```powershell
cmd /c "npm run build"
```

