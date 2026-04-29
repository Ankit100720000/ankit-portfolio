# Portfolio - Ankit Maurya

A React + Vite portfolio website featuring 3D graphics (Three.js / React Three Fiber), animations (Framer Motion, GSAP), and smooth scrolling (Lenis).

## Tech Stack
- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS 3
- **3D / Animation:** three, @react-three/fiber, @react-three/drei, framer-motion, gsap, lenis
- **Other:** lucide-react, react-helmet-async

## Project Structure
- `src/` — application source (App, sections, components, ui, three, hooks, animations, data)
- `public/` — static assets (favicon, icons, resume)
- `index.html` — Vite entry HTML

## Development
- Workflow `Start application` runs `npm run dev` and serves on port `5000`.
- Vite is configured with `host: 0.0.0.0`, `port: 5000`, and `allowedHosts: true` so the Replit preview proxy can reach it.

## Deployment
Configured as a static deployment:
- Build: `npm run build`
- Public dir: `dist`

## Design System (modernized)
- **Palette:** near-black base (`#06070a`) with lime accent `#d6ff3a`, plus secondary cyan `#7cf2ff` and violet `#b08bff` used for ambient gradients.
- **Type:** Poppins for display, Inter for body, Space Grotesk for labels / UI chrome.
- **Surfaces:** `.glass`, `.modern-card`, `.gradient-border` for elevated panels with subtle gradient outlines.
- **Backdrop:** body uses fixed multi-radial gradient; hero uses `.aurora` blobs and `.grid-overlay` dotted mask.
- **Buttons:** `.btn-primary` (white → lime hover with glow) and `.btn-ghost` (glass).
- **Nav:** floating glass pill (centered, rounded-full).
- **Sections:**
  - Hero: status pill, big display, hero metric tiles with gradient borders, marquee.
  - Projects: minimal row list with a cursor-following preview card; non-hovered rows dim.
  - About: glass stat cards with colored gradient top accent.
  - Experience: timeline with vertical line + animated nodes, glass cards.
  - Contact: large CTA panel with ambient blobs, 3-up link cards.
