import erpPreview from '@/assets/images/projects/project-erp.svg'
import trackingPreview from '@/assets/images/projects/project-tracking.svg'

const careerStartDate = '2023-02-01'

function getCompletedYearsSince(dateString) {
  const startDate = new Date(dateString)
  const today = new Date()
  let years = today.getFullYear() - startDate.getFullYear()
  const hasAnniversaryPassed =
    today.getMonth() > startDate.getMonth()
    || (today.getMonth() === startDate.getMonth() && today.getDate() >= startDate.getDate())

  if (!hasAnniversaryPassed) years -= 1

  return Math.max(years, 0)
}

export const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const heroMetrics = [
  { value: `${getCompletedYearsSince(careerStartDate)}+`, label: 'Years experience' },
  { value: '2000+', label: 'Users served' },
  { value: '35+', label: 'Modules delivered' },
]

export const valueHighlights = [
  'ERP Systems',
  'Dashboards & Analytics',
  'API Integration',
  'UI/UX Optimization',
]

export const projects = [
  {
    id: 'mtg-crm',
    title: 'MTG ERP - CRM',
    description:
      'Customer relationship management module for MTG ERP, built to manage customers, communication, follow-ups, and operational CRM workflows from a clean interface.',
    impact:
      'Helped teams centralize customer information and reduce scattered manual tracking across sales and support processes.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'CRM'],
    metrics: ['Customer management', 'Follow-up flows', 'Operational CRM'],
    highlights: [
      'Built customer listing, detail, and workflow screens.',
      'Created reusable CRM UI patterns for search, filters, and status tracking.',
      'Integrated APIs for customer records and activity visibility.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'mtg-lead-management',
    title: 'MTG ERP - Lead Management',
    description:
      'Lead management module for capturing, organizing, assigning, and tracking business leads through sales stages.',
    impact:
      'Made lead tracking clearer for sales users with faster filtering, status visibility, and assignment flows.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Sales Workflow'],
    metrics: ['Lead capture', 'Lead assignment', 'Status tracking'],
    highlights: [
      'Created lead list and detail screens.',
      'Built status-based workflows for sales follow-ups.',
      'Added search and filter patterns for high-volume lead data.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'mtg-sales-management',
    title: 'MTG ERP - Sales Management',
    description:
      'Sales management module for tracking sales activities, customer interactions, and sales pipeline actions.',
    impact:
      'Improved sales visibility with structured screens for sales records, actions, and performance-oriented workflows.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Dashboards'],
    metrics: ['Sales pipeline', 'Customer actions', 'Sales reporting'],
    highlights: [
      'Built sales list, form, and detail interfaces.',
      'Integrated sales APIs and action states.',
      'Designed reusable data-table layouts for sales operations.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'mtg-stock-management',
    title: 'MTG ERP - Stock Management',
    description:
      'Stock management module for inventory visibility, stock records, movement tracking, and operational stock workflows.',
    impact:
      'Gave teams a clearer way to manage inventory data and stock availability across ERP operations.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Inventory UI'],
    metrics: ['Inventory records', 'Stock movement', 'Availability view'],
    highlights: [
      'Built stock listing and detail views.',
      'Created stock movement and status UI states.',
      'Improved usability for data-heavy inventory screens.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'mtg-hrms',
    title: 'MTG ERP - HRMS',
    description:
      'Human resource management module for employee workflows, HR records, and internal people-management operations.',
    impact:
      'Helped HR teams manage people-related processes through structured, reusable interfaces.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'HRMS'],
    metrics: ['Employee records', 'HR workflows', 'People operations'],
    highlights: [
      'Built HRMS data screens and forms.',
      'Created reusable employee record layouts.',
      'Integrated HR APIs with loading and empty states.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'mtg-magazine-subscription',
    title: 'MTG ERP - Magazine & Subscription',
    description:
      'Magazine and subscription management module for handling subscriber workflows, records, plans, and related operational processes.',
    impact:
      'Improved subscription handling with cleaner record management and faster lookup for magazine operations.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Subscription UI'],
    metrics: ['Magazine records', 'Subscription flows', 'Subscriber lookup'],
    highlights: [
      'Created magazine and subscription management screens.',
      'Built forms and tables for subscriber data.',
      'Improved workflow clarity for operational users.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'mtg-specimen',
    title: 'MTG ERP - Specimen Management',
    description:
      'Specimen management module for tracking specimen requests, records, dispatch-related data, and operational status.',
    impact:
      'Made specimen workflows easier to monitor with structured records and status-based interfaces.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Workflow UI'],
    metrics: ['Specimen records', 'Request tracking', 'Status visibility'],
    highlights: [
      'Built specimen listing and detail screens.',
      'Created status-oriented tracking views.',
      'Integrated APIs for request and record management.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'mtg-ticket-management',
    title: 'MTG ERP - Ticket Management',
    description:
      'Ticket management module for issue tracking, assignment, status updates, and support workflow visibility.',
    impact:
      'Helped internal teams handle support and operational issues with clearer ownership and faster status tracking.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Support UI'],
    metrics: ['Ticket tracking', 'Assignment flow', 'Status updates'],
    highlights: [
      'Built ticket list, detail, and action interfaces.',
      'Created status and priority UI patterns.',
      'Added reusable support workflow components.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'mtg-logistics-warehouse',
    title: 'MTG ERP - Logistics & Warehouse',
    description:
      'Logistics and warehouse management module for operational movement, warehouse records, dispatch visibility, and inventory-linked workflows.',
    impact:
      'Improved visibility across warehouse and logistics operations through structured dashboards and management screens.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Operations UI'],
    metrics: ['Logistics workflows', 'Warehouse records', 'Dispatch visibility'],
    highlights: [
      'Created warehouse and logistics management screens.',
      'Built data-heavy tables with filters and status states.',
      'Integrated operational APIs for movement and record visibility.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'mtg-pms-ats',
    title: 'MTG ERP - PMS & HR ATS',
    description:
      'Project management and applicant tracking modules for managing internal projects, hiring workflows, candidate records, and progress tracking.',
    impact:
      'Helped teams monitor projects and recruitment pipelines from structured, role-friendly interfaces.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Management UI'],
    metrics: ['Project tracking', 'Applicant tracking', 'Progress workflows'],
    highlights: [
      'Built PMS management screens for project workflows.',
      'Created ATS interfaces for candidate and recruitment stages.',
      'Designed reusable status patterns for progress-heavy data.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'mtg-feedback-complain-forecast',
    title: 'MTG ERP - Feedback, Complaint & Forecast',
    description:
      'Feedback, complaint, and forecast management modules for collecting responses, resolving issues, and supporting planning workflows.',
    impact:
      'Improved business visibility by turning feedback, complaints, and forecasting data into structured screens and actions.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Analytics UI'],
    metrics: ['Feedback records', 'Complaint workflows', 'Forecast data'],
    highlights: [
      'Built feedback and complaint management screens.',
      'Created status flows for issue resolution.',
      'Designed forecast data views for planning support.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'sof-crm-lms-fms',
    title: 'SOF ERP - CRM, LMS & FMS',
    description:
      'Core SOF ERP modules covering customer relationship management, learning or logistics workflows, and financial management processes.',
    impact:
      'Supported daily academic, business, and finance operations through clean ERP interfaces.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'ERP UI'],
    metrics: ['CRM workflows', 'LMS workflows', 'FMS workflows'],
    highlights: [
      'Built CRM screens for SOF internal workflows.',
      'Created LMS and FMS module interfaces.',
      'Integrated APIs for high-volume operational data.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'sof-reports-analytics',
    title: 'SOF ERP - Data Center Reports & Analytics',
    description:
      'Reporting and analytics modules for data center reports, dashboards, operational insights, and summary views.',
    impact:
      'Made complex reporting easier to read and act on for internal business and operations teams.',
    stack: ['React', 'Tailwind CSS', 'Charts', 'REST APIs'],
    metrics: ['DC reports', 'Analytics dashboards', 'Summary insights'],
    highlights: [
      'Built data center report interfaces.',
      'Created analytics dashboards and summary layouts.',
      'Improved readability for data-dense reporting screens.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'sof-rms-ems',
    title: 'SOF ERP - RMS & EMS',
    description:
      'Result management and exam management modules for exam operations, result workflows, records, and academic data handling.',
    impact:
      'Supported exam and result operations with structured flows for large-scale educational processes.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Education ERP'],
    metrics: ['Result management', 'Exam management', 'Academic records'],
    highlights: [
      'Built RMS screens for result workflows.',
      'Created EMS interfaces for exam operations.',
      'Designed clear states for records, actions, and status tracking.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'sof-omr-wforms-drive',
    title: 'SOF ERP - OMR, Forms & Document Drive',
    description:
      'Modules for OMR workflows, web forms, and document drive management across SOF internal operations.',
    impact:
      'Improved document, form, and OMR-related workflow handling through organized interfaces and reusable components.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Document UI'],
    metrics: ['OMR workflows', 'Web forms', 'Document drive'],
    highlights: [
      'Built OMR-related screens and status views.',
      'Created web form interfaces for operational data capture.',
      'Worked on document drive screens for file and record access.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'sof-admin-cms-email',
    title: 'SOF ERP - Admin, Calling & Email',
    description:
      'Administration, calling management, and email management modules for communication and internal control workflows.',
    impact:
      'Helped teams manage communication and admin workflows from consistent ERP screens.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Communication UI'],
    metrics: ['Admin module', 'Calling management', 'Email management'],
    highlights: [
      'Built admin management interfaces.',
      'Created calling management system screens.',
      'Worked on email management workflows and UI states.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'sof-cpt-pc-com',
    title: 'SOF ERP - CPT, PC & Communication',
    description:
      'Capacity planning, personal coordinator, communication, and related coordination modules for SOF ERP operations.',
    impact:
      'Improved coordination workflows with clear screens for planning, communication, and coordinator-level operations.',
    stack: ['React', 'Tailwind CSS', 'REST APIs', 'Workflow UI'],
    metrics: ['Capacity planning', 'Coordinator workflows', 'Communication'],
    highlights: [
      'Built CPT and planning-related interfaces.',
      'Created personal coordinator workflow screens.',
      'Designed communication and coordination UI patterns.',
    ],
    preview: erpPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'mtg-online-crm',
    title: 'MTG Online CRM',
    description:
      'Online CRM product for outside sales, sales force automation, agent tracking, and customer location mapping.',
    impact:
      'Made field sales activity easier to track through location-aware customer mapping, agent movement visibility, and sales workflow automation.',
    stack: ['React', 'Google Maps API', 'REST APIs', 'Tailwind CSS'],
    metrics: ['Online CRM', 'Outside sales', 'Sales automation'],
    highlights: [
      'Built online CRM screens for sales workflows.',
      'Created outside sales CRM interfaces.',
      'Designed sales force automation flows for field teams.',
    ],
    preview: trackingPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'agent-tracking',
    title: 'Agent Tracking System',
    description:
      'Tracking system for monitoring field agents, movement visibility, and activity status in sales operations.',
    impact:
      'Improved field team visibility with map-based tracking and status-focused operational screens.',
    stack: ['React', 'Google Maps API', 'REST APIs', 'Location UI'],
    metrics: ['Agent tracking', 'Location visibility', 'Field activity'],
    highlights: [
      'Built agent tracking interfaces.',
      'Created map-based visibility for field teams.',
      'Added status and detail views for agent activity.',
    ],
    preview: trackingPreview,
    liveUrl: '#contact',
    liveLabel: 'View Project',
  },
  {
    id: 'customer-mapping-location',
    title: 'Customer Mapping Location',
    description:
      'Customer location mapping module for visualizing customer records, mapped areas, and sales territory information.',
    impact:
      'Helped teams understand customer distribution and plan outside sales activity with clearer location data.',
    stack: ['React', 'Google Maps API', 'REST APIs', 'Map UI'],
    metrics: ['Customer mapping', 'Location data', 'Territory visibility'],
    highlights: [
      'Created customer location map screens.',
      'Integrated mapped customer data into searchable views.',
      'Built filters and details for territory-level visibility.',
    ],
    preview: trackingPreview,
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
