import { LuBrainCircuit, LuCode, LuMapPin } from 'react-icons/lu'
import { SiFigma, SiGithub, SiGreensock, SiJavascript, SiReact, SiRedux, SiShopify, SiTailwindcss } from 'react-icons/si'

const icons = {
  React: SiReact, 'Redux Toolkit': SiRedux, 'Tailwind CSS': SiTailwindcss,
  JavaScript: SiJavascript, GSAP: SiGreensock,
  Figma: SiFigma, GitHub: SiGithub, Shopify: SiShopify,
  'REST APIs': LuCode, 'AI APIs': LuBrainCircuit, 'Google Maps API': LuMapPin,
}

export default function TechIcon({ name, size = 30 }) {
  const Icon = icons[name] || LuCode
  return <span className="tech-icon" title={name} aria-label={name}><Icon size={size} aria-hidden="true" /></span>
}
