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
