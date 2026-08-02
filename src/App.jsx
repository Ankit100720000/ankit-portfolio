import { Helmet } from 'react-helmet-async'
import Navbar from '@/components/common/Navbar'
import HeroSection from '@/sections/Hero/HeroSection'
import AboutSection from '@/sections/About/AboutSection'
import ProjectsSection from '@/sections/Projects/ProjectsSection'
import ExperienceSection from '@/sections/Experience/ExperienceSection'
import ContactSection from '@/sections/Contact/ContactSection'

function App() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Ankit Maurya — Frontend Engineer</title>
        <meta name="description" content="Portfolio of Ankit Maurya, a frontend engineer building dependable product interfaces for complex workflows." />
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <footer className="site-footer shell">
        <span>© 2026 Ankit Maurya</span>
        <span>Designed for clear thinking.</span>
      </footer>
    </>
  )
}

export default App
