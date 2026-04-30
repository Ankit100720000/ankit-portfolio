import aiPreview from '@/assets/project-ai.svg'
import ecommercePreview from '@/assets/project-commerce.svg'
import erpPreview from '@/assets/project-erp.svg'
import trackingPreview from '@/assets/project-tracking.svg'
import voicePreview from '@/assets/project-voice.svg'

export const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const heroMetrics = [
  { value: '3+', label: 'Years experience' },
  { value: '2000+', label: 'Users served' },
  { value: '45+', label: 'Projects delivered' },
]

export const valueHighlights = [
  'ERP Systems',
  'Dashboards & Analytics',
  'API Integration',
  'UI/UX Optimization',
]

export const projects = [
  {
    id: 'erp-dashboard',
    title: 'ERP Dashboard System',
    description:
      'React-based ERP platform built for CRM, HRMS, and finance workflows with clean information architecture and real-time dashboard visibility.',
    impact:
      'Used by 2000+ users across day-to-day operations, helping teams manage complex workflows through a faster, more usable interface.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Charts'],
    metrics: ['2000+ users', 'CRM + HRMS + Finance', 'Realtime dashboards'],
    highlights: [
      'Built scalable dashboard modules for multiple departments.',
      'Improved clarity in data-dense workflows with reusable UI patterns.',
      'Integrated live metrics and summary reporting for business teams.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot System',
    description:
      'Database-driven chatbot interface focused on improving response quality, reliability, and user confidence through structured conversational UX.',
    impact:
      'Improved response accuracy and created a cleaner, more trustworthy AI interaction flow for high-intent user tasks.',
    stack: ['React', 'Node API', 'Prompt Workflows', 'Tailwind CSS'],
    metrics: ['Database-backed', 'Better accuracy', 'Clear feedback states'],
    highlights: [
      'Created polished states for loading, retries, and answer confidence.',
      'Connected responses to structured database context.',
      'Focused on UI readability and interaction clarity.',
    ],
    preview: aiPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'voice-task',
    title: 'Voice Task Management',
    description:
      'Voice-based task creation interface that captures spoken input and converts it into structured task actions with a simple confirmation flow.',
    impact:
      'Made task capture faster and more natural, especially for users managing actions on the go or in multitasking scenarios.',
    stack: ['React', 'Speech APIs', 'Framer Motion', 'Tailwind CSS'],
    metrics: ['Voice capture', 'Structured actions', 'Fast confirmation'],
    highlights: [
      'Mapped conversational input into clean task structures.',
      'Designed compact feedback flows for desktop and mobile.',
      'Used subtle motion to support responsiveness and clarity.',
    ],
    preview: voicePreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'location-tracking',
    title: 'Location Tracking System',
    description:
      'Google Maps API-based tracking interface for realtime lead and location visibility, built with a strong focus on usability and performance.',
    impact:
      'Enabled teams to track leads and live movement more clearly with an interface designed for quick filtering, lookup, and status awareness.',
    stack: ['React', 'Google Maps API', 'Socket Data', 'Tailwind CSS'],
    metrics: ['Google Maps API', 'Realtime tracking', 'Lead visibility'],
    highlights: [
      'Integrated live map markers and status-based panels.',
      'Built responsive filters and lookup tools for operational use.',
      'Balanced map richness with performance for everyday usage.',
    ],
    preview: trackingPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description:
      'Responsive commerce experience covering product listing, cart, and checkout with an emphasis on simple flows and conversion-friendly UI.',
    impact:
      'Created a cleaner shopping experience with stronger hierarchy, smoother browsing, and a more dependable checkout journey across devices.',
    stack: ['React', 'Tailwind CSS', 'API Integration', 'Framer Motion'],
    metrics: ['Product listing', 'Cart + checkout', 'Responsive UI'],
    highlights: [
      'Created scalable product grids and detail experiences.',
      'Improved cart and checkout clarity with cleaner layouts.',
      'Optimized mobile responsiveness and overall usability.',
    ],
    preview: ecommercePreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
]

export const experience = [
  {
    title: 'Frontend Developer',
    company: 'Science Olympiad Foundation',
    period: 'Mar 2025 - Present',
    points: [
      'Built ERP systems for 2000+ users.',
      'Developed dashboards for internal product workflows.',
      'Handled API integrations across multiple modules.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Kashish Technology',
    period: 'Oct 2023 - Mar 2025',
    points: [
      'Built 15+ websites across different business categories.',
      'Improved SEO structure and frontend performance.',
      'Delivered responsive production-ready interfaces.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'PSS Technoservices',
    period: 'Feb 2023 - Sep 2023',
    points: [
      'Built 6+ websites with responsive UI.',
      'Translated requirements into reusable frontend patterns.',
      'Focused on clean layout implementation and consistency.',
    ],
  },
]

export const contact = {
  email: 'mauryankit2615@gmail.com',
  phone: '+91 XXXXX XXXXX',
  linkedin: 'https://linkedin.com/in/ankit-maurya2000',
  resume: '/ankit-maurya-resume.txt',
}
