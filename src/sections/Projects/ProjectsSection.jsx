import { useState, useLayoutEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { gsap } from '@/animations/gsap'
import TechIcon from '@/components/common/TechIcon'
import { useGsapSection } from '@/hooks/useGsapSection'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

// Project Images
import adsvengersImg from '@/assets/images/project img/adsvengers.png'
import resturentImg from '@/assets/images/project img/resturent-mocha-xi.vercel.png'
import naveliImg from '@/assets/images/project img/naveli.online.png'
import palkiImg from '@/assets/images/project img/palkifashion.png'
import kolkataCoutureImg from '@/assets/images/project img/kolkatacoutureexpo.png'
import trueUnityImg from '@/assets/images/project img/trueunitygroupassociation.png'
import storitelerImg from '@/assets/images/project img/thestoriteler.png'
import leadDashboardImg from '@/assets/images/project img/Lead Dashboard.jpg'
import employeeDashboardImg from '@/assets/images/project img/Employee Dashboard.jpg'
import ticketDetailsImg from '@/assets/images/project img/Ticket Management Details.jpg'
import resultDashboardImg from '@/assets/images/project img/Result M S Dashboard.jpg'
import paymentDashboardImg from '@/assets/images/project img/futtkr.png'
import omrDashboardImg from '@/assets/images/project img/OMR Dashboard.pdf.jpg'
import callDashboardImg from '@/assets/images/project img/Call M S Dashboard.jpg'
import pmsImg from '@/assets/images/project img/PMS.jpg'
import erpCover from '@/assets/images/covers/cover-erp.png'
import aiCover from '@/assets/images/covers/cover-ai.png'

const projectsData = [
  // Kashish Technology
  {
    no: '01',
    title: 'Futtkr - Retail POS & Billing SaaS',
    category: 'Kashish Technology',
    company: 'Kashish Technology Pvt. Ltd.',
    role: 'Frontend Developer & Web Designer',
    cover: paymentDashboardImg,
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'SaaS'],
    copy: 'Cloud-based GST billing & Point of Sale (POS) SaaS platform providing small & medium businesses with mPOS tools, inventory tracking, and barcode scanning.',
    result: 'GST Billing & Inventory SaaS Platform',
    liveUrl: 'https://www.futtkr.com/',
  },
  {
    no: '02',
    title: 'Naveli - Luxury Designer Ethnic Wear',
    category: 'Kashish Technology',
    company: 'Kashish Technology Pvt. Ltd.',
    role: 'Frontend Developer & Web Designer',
    cover: naveliImg,
    stack: ['React', 'Shopify', 'Tailwind CSS', 'E-Commerce'],
    copy: 'Elegant e-commerce storefront for designer ethnic fashion and footwear, featuring multi-filter search, size selection guides, and seamless checkout flows.',
    result: 'Luxury Fashion Storefront · Live Site',
    liveUrl: 'https://naveli.online/',
  },
  {
    no: '03',
    title: 'Palki Fashion - Bridal & Luxury Couture',
    category: 'Kashish Technology',
    company: 'Kashish Technology Pvt. Ltd.',
    role: 'Frontend Developer & Web Designer',
    cover: palkiImg,
    stack: ['React', 'Shopify', 'CSS3', 'UI/UX'],
    copy: 'Kolkata-based premium bridal wear and designer saree e-commerce store showcasing handcrafted wedding collections with rich galleries and mobile-first experience.',
    result: 'Bridal Couture & Designer Store · Live Site',
    liveUrl: 'https://palki.co.in/',
  },
  {
    no: '04',
    title: 'True Unity Group Association',
    category: 'Kashish Technology',
    company: 'Kashish Technology Pvt. Ltd.',
    role: 'Frontend Developer & Web Designer',
    cover: trueUnityImg,
    stack: ['React', 'Tailwind CSS', 'JavaScript', 'B2B Portal'],
    copy: 'Official B2B trade association portal connecting garment manufacturers, wholesalers, and fashion creators, powering national trade expos like DTEE.',
    result: 'B2B Fashion Trade Portal · Live Site',
    liveUrl: 'https://www.trueunitygroupassociation.com/',
  },
  {
    no: '05',
    title: 'Kolkata Couture Expo',
    category: 'Kashish Technology',
    company: 'Kashish Technology Pvt. Ltd.',
    role: 'Frontend Developer & Web Designer',
    cover: kolkataCoutureImg,
    stack: ['React', 'Tailwind CSS', 'JavaScript', 'Event UI'],
    copy: 'Exhibition and B2B ethnic fashion event platform designed for exhibitor registration, buyer passes, schedule management, and event highlights.',
    result: 'Fashion Trade Exhibition Portal · Live Site',
    liveUrl: 'https://www.kolkatacoutureexpo.com/',
  },
  {
    no: '06',
    title: 'The Storiteler Agency',
    category: 'Kashish Technology',
    company: 'Kashish Technology Pvt. Ltd.',
    role: 'Frontend Developer & Web Designer',
    cover: storitelerImg,
    stack: ['React', 'GSAP', 'Tailwind CSS', 'Animations'],
    copy: 'Digital marketing, branding, and event agency website featuring interactive storytelling animations, brand portfolio showcases, and trade expo coverage.',
    result: 'Creative Agency & Event Portal · Live Site',
    liveUrl: 'https://www.thestoriteler.com/',
  },
  {
    no: '07',
    title: 'Intelatron - Intelligent Automation & AI',
    category: 'Kashish Technology',
    company: 'Kashish Technology Pvt. Ltd.',
    role: 'Frontend Developer & Web Designer',
    cover: aiCover,
    stack: ['React', 'Tailwind CSS', 'JavaScript', 'UI/UX'],
    copy: 'Corporate web platform for an intelligent automation and AI solutions provider, highlighting Robotic Process Automation (RPA) and AI document processing.',
    result: 'Enterprise AI & RPA Portal · Live Site',
    liveUrl: 'https://intelatron.com/',
  },
  {
    no: '08',
    title: 'Thomas Technologies',
    category: 'Kashish Technology',
    company: 'Kashish Technology Pvt. Ltd.',
    role: 'Frontend Developer & Web Designer',
    cover: erpCover,
    stack: ['React', 'CSS3', 'JavaScript', 'Responsive Design'],
    copy: 'Engineering representation and electronics component manufacturer platform serving North American supply chains with technical product showcases.',
    result: 'Engineering Tech Platform · Live Site',
    liveUrl: 'https://thomastechno.com/',
  },

  // PSS Technoservices
  {
    no: '09',
    title: 'Adsvengers Marketing Agency',
    category: 'PSS Technology',
    company: 'PSS Technoservices Pvt. Ltd.',
    role: 'Web Designer & HTML Developer',
    cover: adsvengersImg,
    stack: ['HTML5', 'CSS3', 'JavaScript', 'SEO'],
    copy: 'High-converting digital marketing & performance advertising agency platform featuring interactive service showcases, media buying case studies, and lead flows.',
    result: 'Performance Marketing Platform · Live Site',
    liveUrl: 'https://www.adsvengers.in/',
  },
  {
    no: '10',
    title: 'Mocha Restaurant Ordering App',
    category: 'PSS Technology',
    company: 'PSS Technoservices Pvt. Ltd.',
    role: 'Web Designer & HTML Developer',
    cover: resturentImg,
    stack: ['React', 'Tailwind CSS', 'JavaScript', 'REST APIs'],
    copy: 'Interactive restaurant digital menu and food ordering web application built with real-time cart state management and menu category filtering.',
    result: 'Digital Ordering Web App · Live Demo',
    liveUrl: 'https://resturent-mocha-xi.vercel.app/',
  },

  // Science Olympiad Foundation
  {
    no: '11',
    title: 'SOF ERP - Lead & CRM System',
    category: 'Science Olympiad Foundation',
    company: 'Science Olympiad Foundation',
    role: 'Frontend Developer / UI-UX',
    cover: leadDashboardImg,
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'REST APIs'],
    copy: 'Centralized lead management & CRM dashboard serving 500+ daily operational users with real-time lead capture, assignment pipelines, and follow-up tracking.',
    result: '500+ daily active users · 40% lower data inconsistency',
    liveUrl: null,
  },
  {
    no: '12',
    title: 'SOF ERP - HRMS & Employee Portal',
    category: 'Science Olympiad Foundation',
    company: 'Science Olympiad Foundation',
    role: 'Frontend Developer / UI-UX',
    cover: employeeDashboardImg,
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'REST APIs'],
    copy: 'Human resource management and employee portal for managing staff records, attendance, performance reviews, internal requests, and administration.',
    result: 'Unified HR & people operations for 500+ staff',
    liveUrl: null,
  },
  {
    no: '13',
    title: 'SOF ERP - Ticket & Issue Management',
    category: 'Science Olympiad Foundation',
    company: 'Science Olympiad Foundation',
    role: 'Frontend Developer / UI-UX',
    cover: ticketDetailsImg,
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'REST APIs'],
    copy: 'Operational ticket management and support issue tracking system featuring assignment flows, priority filters, resolution updates, and audit trails.',
    result: '35% faster support ticket resolution',
    liveUrl: null,
  },
  {
    no: '14',
    title: 'SOF ERP - Examination & Result System',
    category: 'Science Olympiad Foundation',
    company: 'Science Olympiad Foundation',
    role: 'Frontend Developer / UI-UX',
    cover: resultDashboardImg,
    stack: ['React', 'Highcharts', 'Redux Toolkit', 'REST APIs'],
    copy: 'Academic exam operations and result evaluation dashboard for processing student marks, OMR evaluation metrics, and performance analytics at scale.',
    result: 'Processes millions of student exam records',
    liveUrl: null,
  },
  {
    no: '15',
    title: 'SOF ERP - Payment & Billing Dashboard',
    category: 'Science Olympiad Foundation',
    company: 'Science Olympiad Foundation',
    role: 'Frontend Developer / UI-UX',
    cover: paymentDashboardImg,
    stack: ['React', 'Redux Toolkit', 'Highcharts', 'REST APIs'],
    copy: 'Financial tracking and payment collection dashboard providing real-time financial reporting, transaction logs, and daily revenue analytics.',
    result: '5 hours saved weekly in manual reporting',
    liveUrl: null,
  },
  {
    no: '16',
    title: 'SOF ERP - OMR & Document Drive',
    category: 'Science Olympiad Foundation',
    company: 'Science Olympiad Foundation',
    role: 'Frontend Developer / UI-UX',
    cover: omrDashboardImg,
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'REST APIs'],
    copy: 'Optical Mark Recognition (OMR) form tracking and document drive module for monitoring automated exam sheet scanning and verification flows.',
    result: 'Automated processing for nationwide exams',
    liveUrl: null,
  },
  {
    no: '17',
    title: 'SOF ERP - Project Management System',
    category: 'Science Olympiad Foundation',
    company: 'Science Olympiad Foundation',
    role: 'Frontend Developer / UI-UX',
    cover: pmsImg,
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'REST APIs'],
    copy: 'Internal project management module for tracking milestones, task assignments, project roadmaps, and cross-department collaboration.',
    result: 'Streamlined multi-department project tracking',
    liveUrl: null,
  },
  {
    no: '18',
    title: 'SOF ERP - Calling Management System',
    category: 'Science Olympiad Foundation',
    company: 'Science Olympiad Foundation',
    role: 'Frontend Developer / UI-UX',
    cover: callDashboardImg,
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'REST APIs'],
    copy: 'Calling management system for managing communication logs, school outreach calls, coordinator follow-ups, and operational calling queues.',
    result: 'Centralized school outreach communication',
    liveUrl: null,
  },
]

const categories = ['All Work', 'Kashish Technology', 'PSS Technology', 'Science Olympiad Foundation']

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All Work')
  const ref = useGsapSection({ stagger: 0.13 })
  const reducedMotion = usePrefersReducedMotion()

  const filteredProjects = activeCategory === 'All Work'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory)

  useLayoutEffect(() => {
    if (reducedMotion || !ref.current || !window.matchMedia('(hover: hover)').matches) return undefined
    const removers = []
    const ctx = gsap.context(() => gsap.utils.toArray('.case-study').forEach(card => {
      const image = card.querySelector('img')
      if (!image) return
      const enter = () => { gsap.to(card, { y: -8, duration: .3, ease: 'power3.out' }); gsap.to(image, { scale: 1.06, duration: .55, ease: 'power3.out' }) }
      const leave = () => { gsap.to(card, { y: 0, duration: .5, ease: 'elastic.out(1,.55)' }); gsap.to(image, { scale: 1, duration: .55, ease: 'power3.out' }) }
      card.addEventListener('mouseenter', enter); card.addEventListener('mouseleave', leave)
      removers.push(() => { card.removeEventListener('mouseenter', enter); card.removeEventListener('mouseleave', leave) })
    }), ref)
    return () => { removers.forEach(remove => remove()); ctx.revert() }
  }, [reducedMotion, ref, activeCategory])

  return (
    <section id="projects" ref={ref} className="section-projects">
      <div className="shell section">
        <div data-animate className="projects-head">
          <div>
            <span className="eyebrow">02 — Selected work</span>
            <h2 className="section-title" style={{ marginTop: '1rem' }}>Evidence, not decoration.</h2>
          </div>
          <p className="body-copy">
            Selected production websites, e-commerce stores, B2B portals, and enterprise ERP systems built across Kashish Technology, PSS Technoservices, and Science Olympiad Foundation.
          </p>
        </div>

        <div className="project-filters" data-animate>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat} {cat === 'All Work' ? `(${projectsData.length})` : `(${projectsData.filter(p => p.category === cat).length})`}
            </button>
          ))}
        </div>

        <div className="case-study-grid">
          {filteredProjects.map(p => (
            <article data-animate className="case-study" key={p.no}>
              <div className="case-cover">
                <img src={p.cover} alt={p.title} loading="lazy" />
              </div>
              <div className="case-content">
                <span className="project-number">{p.no} · {p.company}</span>
                <h3>{p.title}</h3>
                <p>{p.copy}</p>
                <div className="case-stack">
                  {p.stack.map(name => (
                    <span key={name}>
                      <TechIcon name={name} size={16} />
                      {name}
                    </span>
                  ))}
                </div>
                <div className="case-card-footer">
                  <div className="case-result">{p.result}</div>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-live-btn"
                      title={`Visit ${p.title}`}
                    >
                      Visit Site <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
