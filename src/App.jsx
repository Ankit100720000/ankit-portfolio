import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '@/components/Navbar'
import { useLenis } from '@/hooks/useLenis'
import HeroSection from '@/sections/Hero/HeroSection'

const AboutSection = lazy(() => import('@/sections/About/AboutSection'))
const ProjectsSection = lazy(() => import('@/sections/Projects/ProjectsSection'))
const ExperienceSection = lazy(() => import('@/sections/Experience/ExperienceSection'))
const ContactSection = lazy(() => import('@/sections/Contact/ContactSection'))

function App() {
  useLenis()

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Ankit Maurya | Frontend Developer</title>
        <meta
          name="description"
          content="Frontend developer portfolio featuring scalable ERP systems, dashboards, and modern UI experiences with clean design and smooth performance."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <div className="relative isolate overflow-hidden">
        <Navbar />

        <main className="page-shell">
          <HeroSection />

          <Suspense fallback={null}>
            <ProjectsSection />
          </Suspense>

          <Suspense fallback={null}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={null}>
            <ExperienceSection />
          </Suspense>

          <Suspense fallback={null}>
            <ContactSection />
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="section-block flex items-center justify-between gap-4 border-t border-white/[0.08] py-8 text-xs text-[var(--muted)]">
          <p>© 2025 Ankit Maurya. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#home" className="transition-colors hover:text-white">Home</a>
            <a href="#projects" className="transition-colors hover:text-white">Work</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
            <a
              href="https://linkedin.com/in/ankit-maurya2000"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
