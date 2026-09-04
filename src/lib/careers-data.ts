// Data for the Careers page — from Marketing - Careers.dc.html

export const CAREERS_PERKS = [
  { title: 'Work you can point at', body: 'Real businesses, real owners, real revenue. Nothing you build disappears into a backlog.', icon: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' },
  { title: 'Ship every week', body: "No six-month projects. You'll see something you made go live most weeks.", icon: 'M12 3.5 5 7v10l7 3.5 7-3.5V7ZM12 12l7-4M12 12v8.5M12 12 5 8' },
  { title: 'Learn the whole stack', body: 'Designers learn SEO. Writers learn conversion. Nobody is boxed into one lane.', icon: 'M5 4.5h14v15H5zM8.5 8h7M8.5 12h7M8.5 16h4' },
  { title: 'Paid learning budget', body: "Courses, conferences and tools, on us. We'd rather you got better here than elsewhere.", icon: 'M12 4l2.4 5.2 5.6.5-4.3 3.7 1.3 5.6L12 16l-5 3 1.3-5.6L4 9.7l5.6-.5Z' },
]

export type Role = {
  title: string; team: string; location: string; type: string; level: string; cat: string
  summary: string; duties: string[]; needs: string[]
}

export const CAREERS_ROLES: Role[] = [
  { title: 'Web Designer (Business Themes)', team: 'Design', location: 'Lahore', type: 'Full-time', level: 'Mid', cat: 'Design',
    summary: "You'll design and build client sites on our platform — typically two to three a week across trades like textiles, food, clinics and trades services. Not agency-slow, not template-fast: a real design decision on every page, made quickly.",
    duties: ['Design and assemble client websites on our own platform', "Adapt category themes to each client's brand and photography", 'Work from the client questionnaire without needing hand-holding', 'Join launch calls to present the site to the client'],
    needs: ['Three or more years designing for web, with a portfolio', 'Strong eye for type and layout on small screens', 'Comfortable working fast without dropping quality', 'Urdu and English fluency'] },
  { title: 'Copywriter (English & Urdu)', team: 'Content', location: 'Lahore / Remote', type: 'Full-time', level: 'Mid', cat: 'Content',
    summary: "You'll write the words on client websites — homepages, service pages, product descriptions and Google Business copy. Plain, useful writing that sells without shouting.",
    duties: ['Write full site copy from a short client questionnaire', 'Adapt tone across trades, from law firms to burger shops', 'Write SEO-aware copy without keyword stuffing', 'Produce 2,000 words of monthly content for Growth clients'],
    needs: ['Two or more years writing commercial copy', 'Native-level English plus strong Urdu', 'Able to interview a client and extract what matters', 'Samples of business writing, not just blog posts'] },
  { title: 'SEO Specialist', team: 'Growth', location: 'Lahore', type: 'Full-time', level: 'Senior', cat: 'Growth',
    summary: "You'll own local and national search for our client base — Google Business Profiles, Maps, technical SEO and the monthly reporting clients actually read.",
    duties: ['Set up and verify Google Business Profiles at scale', 'Run technical audits and fix what you find', 'Own keyword tracking and monthly client reports', 'Advise the design team on structure before build, not after'],
    needs: ['Four or more years in SEO, with local SEO depth', 'Hands-on with Search Console, GA4 and a rank tracker', 'Able to explain results to a shop owner in plain words', 'Experience in Pakistani or Gulf markets preferred'] },
  { title: 'Client Concierge', team: 'Client Success', location: 'Karachi', type: 'Full-time', level: 'Junior–Mid', cat: 'Client Success',
    summary: "You are the person our clients message. You'll handle edit requests, answer questions, and make small changes yourself — within four working hours, every working day.",
    duties: ['Own a portfolio of clients as their named concierge', 'Make content and image edits in our editor', 'Triage anything that needs design or dev help', 'Spot upgrade opportunities without being pushy'],
    needs: ['Excellent written Urdu and English', "Patient with people who aren't technical", 'Organised enough to never let a request go cold', 'Prior support or account management experience'] },
  { title: 'Full-Stack Engineer (Node / TypeScript)', team: 'Engineering', location: 'Lahore / Remote', type: 'Full-time', level: 'Senior', cat: 'Engineering',
    summary: "You'll work on the platform itself — the editor our clients use, the dashboard they log into, and the systems our own team builds sites with.",
    duties: ['Build features in the client dashboard and theme editor', 'Improve site performance and Core Web Vitals across all client sites', 'Integrate local payment gateways: JazzCash, Easypaisa, PayFast', 'Work directly with design on how features should feel'],
    needs: ['Five or more years with Node.js and TypeScript', 'Strong front-end fundamentals, not just framework knowledge', 'Experience with multi-tenant systems', 'Pragmatic about shipping'] },
]

export const CAREERS_CATEGORIES = ['All', 'Design', 'Content', 'Growth', 'Client Success', 'Engineering'] as const
