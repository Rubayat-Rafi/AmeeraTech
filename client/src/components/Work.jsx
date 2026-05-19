import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    id: '01',
    title: 'Aura E-Commerce',
    category: 'Web Platform',
    desc: 'A high-performance online retail platform featuring AI-driven product recommendations, seamless crypto payments, and real-time inventory syncing. Built to handle 10,000+ concurrent users with zero latency.',
    tags: ['Next.js', 'Stripe API', 'Tailwind CSS', 'Redis'],
    stats: [['+240%', 'Sales Growth'], ['< 0.8s', 'Load Time']],
    color: 'from-orange-500/30 to-rose-500/30',
    border: 'group-hover:border-orange-500/50',
    mockup: (
      <div className="absolute inset-4 md:inset-8 bg-[#0a0a0a] rounded-xl border border-[#222] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col">
        {/* Browser Header */}
        <div className="h-10 bg-[#111] border-b border-[#222] flex items-center px-4 gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <div className="ml-4 w-48 h-5 bg-[#1a1a1a] rounded-md border border-[#333]" />
        </div>
        {/* Browser Body */}
        <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden relative">
          <div className="flex justify-between items-center">
            <div className="w-32 h-6 rounded bg-gradient-to-r from-orange-500/20 to-transparent" />
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a]" />
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a]" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[4/5] bg-[#151515] rounded-lg border border-[#2a2a2a] p-3 flex flex-col justify-end">
                <div className="w-full h-3 bg-[#222] rounded mb-2" />
                <div className="w-1/2 h-3 bg-orange-500/20 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: '02',
    title: 'Nexus SaaS Dashboard',
    category: 'Web Application',
    desc: 'An enterprise-grade analytics dashboard that unifies scattered data streams into a single, intuitive interface. Features highly interactive financial charts and robust team access controls.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'D3.js'],
    stats: [['10k+', 'Active Users'], ['99.9%', 'Uptime']],
    color: 'from-blue-500/30 to-cyan-500/30',
    border: 'group-hover:border-blue-500/50',
    mockup: (
      <div className="absolute inset-4 md:inset-8 bg-[#0a0a0a] rounded-xl border border-[#222] overflow-hidden shadow-2xl flex">
        {/* Sidebar */}
        <div className="w-16 md:w-20 bg-[#111] border-r border-[#222] p-4 flex flex-col gap-4 items-center shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 mb-4" />
          {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-lg bg-[#1a1a1a]" />)}
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 relative">
          <div className="flex justify-between">
            <div className="w-1/3 h-8 rounded bg-[#1a1a1a]" />
            <div className="w-24 h-8 rounded bg-blue-500/10 border border-blue-500/20" />
          </div>
          <div className="flex-1 bg-[#111] rounded-xl border border-[#222] p-4 relative overflow-hidden">
             {/* Fake chart line */}
             <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
               <path d="M0,100 L0,50 L20,70 L40,30 L60,60 L80,20 L100,40 L100,100 Z" fill="rgba(59,130,246,0.1)" />
               <path d="M0,50 L20,70 L40,30 L60,60 L80,20 L100,40" fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5" />
             </svg>
          </div>
        </div>
      </div>
    )
  },
  {
    id: '03',
    title: 'Pulse Mobile App',
    category: 'iOS & Android',
    desc: 'A cross-platform fitness and health tracking application leveraging native device sensors. Includes social challenges, Apple HealthKit integration, and real-time biometric analysis.',
    tags: ['React Native', 'Firebase', 'HealthKit'],
    stats: [['4.9', 'App Store'], ['50k+', 'Downloads']],
    color: 'from-purple-500/30 to-pink-500/30',
    border: 'group-hover:border-purple-500/50',
    mockup: (
      <div className="absolute top-8 md:top-12 bottom-[-20%] left-1/2 -translate-x-1/2 w-64 md:w-72 bg-[#0a0a0a] rounded-[2.5rem] border-[6px] border-[#222] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden p-4">
         {/* Notch */}
         <div className="w-24 h-6 bg-[#222] rounded-full mx-auto mb-6 relative top-[-4px]" /> 
         
         <div className="space-y-6">
           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/40 mx-auto border-4 border-[#1a1a1a]" />
           <div className="h-24 rounded-2xl bg-[#151515] border border-[#2a2a2a] p-4 flex flex-col justify-center">
             <div className="w-1/2 h-3 bg-[#333] rounded mb-3" />
             <div className="w-3/4 h-2 bg-purple-500/40 rounded" />
           </div>
           <div className="grid grid-cols-2 gap-3">
             <div className="h-32 rounded-2xl bg-[#151515] border border-[#2a2a2a]" />
             <div className="h-32 rounded-2xl bg-[#151515] border border-[#2a2a2a]" />
           </div>
         </div>
      </div>
    )
  }
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Parallax: one side moves down, the other moves up during scroll
  const visualY = useTransform(scrollYProgress, [0, 1], isEven ? [-80, 80] : [80, -80])
  const textY = useTransform(scrollYProgress, [0, 1], isEven ? [80, -80] : [-80, 80])

  return (
    <div 
      ref={ref}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center mb-32 last:mb-0`}
    >
      {/* Visual / Mockup Side */}
      <motion.div 
        style={{ y: visualY }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full lg:w-1/2 aspect-[4/3] md:aspect-square lg:aspect-[4/3] relative group"
      >
        {/* Glow behind the box */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700`}
        />
        
        {/* The Box */}
        <div className={`w-full h-full bg-[#050505] border border-[#2a2a2a] rounded-2xl relative overflow-hidden transition-all duration-500 ${project.border} group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]`}>
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <motion.div 
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          >
            {project.mockup}
          </motion.div>
        </div>
      </motion.div>

      {/* Text / Info Side */}
      <motion.div 
        style={{ y: textY }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        className="w-full lg:w-1/2 flex flex-col justify-center"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl md:text-6xl font-bold text-white/5 font-serif select-none">{project.id}</span>
          <span className="px-3 py-1 text-xs font-bold tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full uppercase">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
          {project.title}
        </h3>
        
        <p className="text-[#9ca3af] text-lg leading-relaxed mb-8">
          {project.desc}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-10">
          {project.tags.map(tag => (
            <span key={tag} className="px-4 py-2 bg-[#111] text-[#888] text-sm font-medium rounded-lg border border-[#222]">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-[#1e1e1e] pt-8 mb-10">
          {project.stats.map(([val, label]) => (
            <div key={label}>
              <div className="text-3xl font-bold text-white mb-1">{val}</div>
              <div className="text-sm text-[#666] uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>

        <div>
          <button className="flex items-center gap-2 text-white font-semibold group/btn hover:text-orange-400 transition-colors">
            Explore Case Study 
            <motion.span 
              className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#333] group-hover/btn:border-orange-500/50 group-hover/btn:bg-orange-500/10 transition-colors ml-2"
              whileHover={{ x: 5 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default function Work() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="work" className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-5">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Featured <span className="text-gradient-orange italic-serif font-normal">Work</span>
          </h2>
          <p className="text-[#9ca3af] max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our latest projects. We combine stunning aesthetics with bulletproof engineering to build digital products that dominate their markets.
          </p>
        </motion.div>

        <div>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
