'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Award, BookOpen } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  GraduationCap, 
  Briefcase, 
  Terminal, 
  Zap, 
  Layout, 
  Database, 
  Calendar, 
  MapPin, 
  Star,        
  FolderCode,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Send, 
  MessageSquare, 
  Phone, 
  Copy, 
  Check
} from 'lucide-react';

interface Skill {
  name: string;
  icon: string;
  level: 'Advanced' | 'Intermediate' | 'Basic';
}

interface SkillCategory {
  title: string;
  icon: any;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: <Terminal className="text-yellow-500" size={20} />,
    skills: [
      { name: "Python", icon: "PY", level: "Advanced" }, 
      { name: "JavaScript/TS", icon: "JS", level: "Advanced" }, 
      { name: "Java", icon: "JV", level: "Intermediate" },
      { name: "C++", icon: "CPP", level: "Intermediate" }, 
      { name: "SQL", icon: "SQL", level: "Advanced" }, 
      { name: "HTML/CSS", icon: "WEB", level: "Advanced" }, 
      { name: "Shell Scripting", icon: "SH", level: "Intermediate" }, 
    ]
  },
  {
    title: "Frameworks & Libraries",
    icon: <Layout className="text-blue-500" size={20} />,
    skills: [
      { name: "React.js", icon: "R", level: "Advanced" },
      { name: "Next.js", icon: "N", level: "Advanced" }, 
      { name: "Node/Express", icon: "N", level: "Advanced" },
      { name: "Spring Boot", icon: "SB", level: "Intermediate" }, 
      { name: "Flask/Django", icon: "F", level: "Intermediate" }, 
      { name: "React Native", icon: "RN", level: "Intermediate" }, 
      { name: "Tailwind CSS", icon: "TW", level: "Advanced" }, 
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: <Database className="text-green-500" size={20} />,
    skills: [
      { name: "GCP", icon: "GCP", level: "Advanced" }, 
      { name: "AWS", icon: "AWS", level: "Intermediate" }, 
      { name: "Docker", icon: "D", level: "Intermediate" }, 
      { name: "GitHub Actions", icon: "GA", level: "Advanced" }, 
      { name: "PostgreSQL/Mongo", icon: "DB", level: "Advanced" }, 
      { name: "Jenkins/Jest", icon: "T", level: "Intermediate" }, 
    ]
  }
];

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    title: "Software Developer (Volunteer)",
    company: "OPEN SOURCE SLU",
    location: "St. Louis, MO",
    period: "July 2024 - Present",
    description: "Maintainer of the Saltify production environment, ensuring system stability for SLP users.",
    achievements: [
      "Responsible for comprehensive code reviews and reviewing pull requests from new developers.",
      "Resolve client-reported issues to maintain 24/7 system stability for speech-language pathologists.",
      "Collaborate with the technical lead to implement long-term architecture improvements."
    ],
    color: "border-t-purple-500" // Unique color for Volunteer work
  },
  {
    title: "Technical Lead & Developer",
    company: "OPEN SOURCE SLU",
    location: "St. Louis, MO",
    period: "Aug 2024 - May 2025",
    description: "Led optimization of Saltify, an open-source transcription tool for speech analysis.",
    achievements: [
      "Optimized transcription pipeline via multithreading, reducing processing time (1m20s → 45s). ",
      "Automated CI/CD via GitHub Actions, reducing build time by 10m per deployment. [cite: 14]",
      "Maintainer of production environment, managing code reviews and system stability. [cite: 10]"
    ],
    color: "border-t-blue-500"
  },
  {
    title: "Data Analyst Intern",
    company: "GLOBALSHALA",
    location: "Remote",
    period: "July 2022 - Sept 2022",
    description: "Automated reporting workflows and asynchronous data updates.",
    achievements: [
      "Reduced manual reporting time by 85% by automating data extraction via SQL/Python. ",
      "Integrated REST APIs for real-time, asynchronous updates between departments. [cite: 20]",
      "Improved visualization efficiency by 30% through interactive Power BI dashboards. [cite: 18]"
    ],
    color: "border-t-green-500"
  },
  {
    title: "Data Scientist Intern",
    company: "BRAINYBEAM TECHNOLOGIES",
    location: "Gandhinagar, India",
    period: "Feb 2022 - July 2022",
    description: "Applied machine learning to improve product recommendation relevance.",
    achievements: [
      "Improved recommendation relevance by 20% using collaborative filtering (KNN). [cite: 23]",
      "Streamlined analysis environments using Docker to improve reproducibility. [cite: 25]",
      "Extracted behavioral data from MySQL and MongoDB to support search insights. [cite: 24]"
    ],
    color: "border-t-yellow-500"
  }
];
interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
}
const educationData = [
  {
    institution: "Saint Louis University",
    degree: "M.S. in Computer Science",
    period: "2023 - 2025",
    grade: "3.4 / 4.0",
    gradeLabel: "GPA",
    courses: ["Artificial Intelligence", "Cloud Computing", "Analysis of Algorithms"],
    color: "border-blue-500"
  },
  {
    institution: "Swarrnim Startup & Innovation University",
    degree: "B.Tech in Computer Engineering",
    period: "2019 - 2023",
    grade: "9.22 / 10.0",
    gradeLabel: "CGPA",
    courses: ["Data Structures", "Operating Systems", "Software Engineering"],
    color: "border-green-500"
  }
];

export default function Home() {
  
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("sagarbadgujar3181@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

useEffect(() => {
  // Fetch up to 100 repos to ensure we get all 30
  fetch('https://api.github.com/users/sagar3181/repos?per_page=100')
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        // REMOVED the .filter() line to show every project
        const sortedRepos = data.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        setRepos(sortedRepos);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error("GitHub Fetch Error:", err);
      setLoading(false);
    });
}, []);
  
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100">
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-24 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            Sagar Rajesh <span className="text-blue-600">Badgujar</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium">
            Technical Lead & Software Developer specializing in AI and Cloud Systems.
          </p>
          <div className="mt-10 flex gap-6">
            <a href="https://github.com/" target="_blank" className="hover:text-blue-600 transition-colors" aria-label="Github"><Github size={28} /></a>
            <a href="https://www.linkedin.com/in/s-badgujar/" target="_blank" className="hover:text-blue-600 transition-colors" aria-label="LinkedIn"><Linkedin size={28} /></a>
            <a href="mailto:sagarbadgujar3181@gmail.com" className="hover:text-blue-600 transition-colors" aria-label="Email"><Mail size={28} /></a>
          </div>
        </div>
      </section>

      {/* Technical Arsenal Section */}
      <section id="skills" className="py-24 px-6 md:px-24 bg-[#020617] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center tracking-tight">
            Technical <span className="text-blue-600">Arsenal</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <div 
                key={idx} 
                className={`bg-slate-900/40 border-t-2 rounded-3xl p-8 backdrop-blur-md transition-all duration-300 shadow-xl ${
                  idx === 0 ? 'border-t-yellow-500' : 
                  idx === 1 ? 'border-t-blue-500' : 
                  'border-t-green-500'
                } border-x-slate-800 border-b-slate-800`}
              >
                <div className="flex items-center gap-3 mb-10 border-b border-slate-800 pb-4">
                  {category.icon}
                  <h3 className="text-2xl font-bold tracking-tight">{category.title}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  {category.skills.map((skill, sIdx) => (
                    <div 
                      key={sIdx}
                      className="relative flex flex-col items-center justify-center p-5 bg-[#1e293b]/30 rounded-2xl border border-slate-700/30 hover:bg-slate-800/60 transition-all duration-300 group overflow-hidden h-32"
                    >
                      <div className="flex flex-col items-center transition-opacity duration-300 group-hover:opacity-0">
                        <div className="w-12 h-12 mb-3 flex items-center justify-center bg-slate-950/50 rounded-xl text-sm font-bold text-slate-400 group-hover:text-blue-400">
                          {skill.icon}
                        </div>
                        <span className="text-sm font-semibold text-slate-300">{skill.name}</span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/80">
                        <div className="flex flex-col items-center gap-2">
                          <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border ${
                            skill.level === 'Advanced' ? 'bg-blue-600/10 text-blue-400 border-blue-500/50' :
                            skill.level === 'Intermediate' ? 'bg-green-600/10 text-green-400 border-green-500/50' :
                            'bg-slate-700/20 text-slate-400 border-slate-600/50'
                          }`}>
                            {skill.level}
                          </span>
                          <div className="w-16 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                            <div className={`h-full rounded-full ${
                              skill.level === 'Advanced' ? 'w-full bg-blue-500' : 
                              skill.level === 'Intermediate' ? 'w-2/3 bg-green-500' : 'w-1/3 bg-slate-500'
                            }`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Journey Section */}
      <section id="experience" className="py-24 px-6 md:px-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-20 text-center tracking-tight">
            Professional <span className="text-blue-600">Journey</span>
          </h2>

          <div className="relative border-l border-slate-800 ml-4 md:ml-0">
            {experiences.map((exp: Experience, idx: number) => (
              <div key={idx} className="mb-16 ml-8 relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-slate-950 border-2 border-blue-600 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                
                {/* Experience Card */}
                <div className={`bg-white dark:bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900/60 border-t-2 ${exp.color}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-blue-600 font-semibold mt-1 text-lg">
                        <Briefcase size={18} />
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end text-slate-500 dark:text-slate-400 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin size={14} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-6 italic leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="grid grid-cols-1 gap-3">
                    {exp.achievements.map((achievement: string, aIdx: number) => (
                      <li key={aIdx} className="flex items-start gap-3 text-slate-500 dark:text-slate-400 group/item">
                        <CheckCircle2 size={18} className="text-blue-600 mt-1 shrink-0 group-hover/item:scale-110 transition-transform" />
                        <span className="group-hover/item:text-slate-900 dark:group-hover/item:text-slate-200 transition-colors">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
{/* Dynamic Engineering Highlights Section */}
<section id="projects" className="py-24 px-6 md:px-24 max-w-[1400px] mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-4xl font-bold flex items-center gap-3">
              <Zap className="text-blue-600" /> Engineering <span className="text-blue-600">Highlights</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl">
              Exploring the latest repositories from my GitHub, automatically synchronized and sorted by creation date.
            </p>
          </div>
          
          {/* Custom Navigation Buttons */}
          <div className="flex gap-4">
            <button className="swiper-prev p-3 rounded-full border border-slate-800 hover:border-blue-600 hover:text-blue-600 transition-all">
              <ChevronLeft size={24} />
            </button>
            <button className="swiper-next p-3 rounded-full border border-slate-800 hover:border-blue-600 hover:text-blue-600 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {repos.map((repo) => (
              <SwiperSlide key={repo.id} className="h-auto">
                <a 
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col h-[320px]"
                >
                  <div className="absolute -right-4 -top-4 text-slate-800/30 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                    <FolderCode size={140} />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">
                        {repo.name.replace(/-/g, ' ')}
                      </h3>
                      <ExternalLink size={20} className="text-slate-500 group-hover:text-blue-600" />
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                      {repo.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-800/50">
                      <span className="text-[10px] font-black tracking-widest px-4 py-1.5 bg-blue-600/10 text-blue-400 rounded-full uppercase border border-blue-500/20">
                        {repo.language || 'Explore'}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        {repo.stargazers_count}
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* Education Section */}
<section id="education" className="py-24 px-6 md:px-24 bg-[#020617]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center tracking-tight text-white">
            Academic <span className="text-blue-600">Foundation</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {educationData.map((edu, idx) => (
              <div 
                key={idx} 
                className="relative p-8 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900/60 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {edu.institution}
                    </h3>
                    <p className="text-blue-500 font-semibold mt-1 flex items-center gap-2">
                      <GraduationCap size={18} /> {edu.degree}
                    </p>
                  </div>
                  <div className="text-slate-400 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} /> {edu.period}
                    </div>
                  </div>
                </div>

                <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-xl border border-blue-500/20">
                  <Award size={16} className="text-blue-400" />
                  <span className="text-sm font-bold text-blue-400">
                    {edu.gradeLabel}: {edu.grade}
                  </span>
                </div>

                <div>
                  <h4 className="text-slate-200 font-bold flex items-center gap-2 mb-4">
                    <BookOpen size={16} className="text-blue-500" /> Key Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course) => (
                      <span 
                        key={course} 
                        className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs font-medium rounded-full border border-slate-700/50"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 md:px-24 bg-[#020617] relative overflow-hidden flex items-center justify-center">
  {/* Decorative Background Glows */}
  <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
  <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

  <div className="max-w-4xl w-full relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
        Let's Connect <span className="text-blue-600">Now</span>
      </h2>
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
        Currently seeking new opportunities in AI, Cloud, and Full-Stack Development. Based in St. Louis, MO — Available for Remote & Relocation.
      </p>
    </div>

    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Centered Email Card */}
      <div 
        onClick={copyEmail}
        className="group p-10 bg-slate-900/40 backdrop-blur-md rounded-[40px] border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer relative overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Mail size={32} />
            </div>
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">Direct Mail</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-1">sagarbadgujar3181@gmail.com</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-500 group-hover:text-blue-500 transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest">{copied ? 'Copied!' : 'Copy'}</span>
            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
          </div>
        </div>
      </div>

      {/* Centered LinkedIn Card */}
      <a 
        href="https://www.linkedin.com/in/s-badgujar/" 
        target="_blank"
        className="block group p-10 bg-slate-900/40 backdrop-blur-md rounded-[40px] border border-slate-800 hover:border-blue-500/50 transition-all shadow-2xl"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Linkedin size={32} />
            </div>
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">Professional Network</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-1">linkedin.com/in/s-badgujar</h3>
            </div>
          </div>
          <ExternalLink size={24} className="text-slate-500 group-hover:text-blue-500 transition-colors" />
        </div>
      </a>

      {/* Centered Location Info */}
      <div className="p-8 bg-slate-950/50 backdrop-blur-sm rounded-[30px] border border-slate-800 border-dashed text-center">
        <div className="flex items-center justify-center gap-4 text-slate-400">
          <MapPin size={20} className="text-blue-500" />
          <p className="text-sm font-medium">St. Louis, Missouri, USA — Open to Relocation.</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-slate-500 text-sm border-t dark:border-slate-800">
        <p>© 2026 Sagar Rajesh Badgujar. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </main>
  );
}