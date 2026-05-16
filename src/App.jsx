import React, { useState, useEffect, useRef } from 'react';
import {
  Plane, Globe, Award, Users, CheckCircle2, Phone, Mail, MapPin,
  Send, ArrowRight, ArrowUpRight, Star, Briefcase, GraduationCap, Building2,
  Shield, ShieldCheck, Calendar, Menu, X, MessageCircle,
  Facebook, Instagram, Linkedin, ChevronDown, ChevronRight,
  Compass, Sparkles, Target, TrendingUp, FileCheck, HeartHandshake,
  Quote, Search, BookOpen, Clock, Anchor, Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from './logo.png'; // Handled via bundler configuration

/* ============================================================
   ACCURATE CONSULTANCY — Premium Immigration Website
   Main App component. Global styles live in src/index.css
   Routing is state-based for simplicity (no router dependency)
============================================================ */

const BRAND = {
  name: 'Accurate Consultancy',
  short: 'Accurate Consultancy',
  domain: 'accurate-consultancy.com',
  email: 'info@accurate-consultancy.com',
  phone1: '+92 316 0285386',
  phone2: '+92 303 0411114',
  whatsapp1: '923160285386',
  whatsapp2: '923030411114',
};

/* ---------- Reusable: Animated Counter ---------- */
const Counter = ({ end, suffix = '', duration = 2000, label }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(end / (duration / 16)));
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [started, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl font-bold gradient-gold-text">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/70 mt-3 uppercase tracking-widest text-xs font-medium">{label}</div>
    </div>
  );
};

/* ---------- World Map SVG (simplified continent dots) ---------- */
const WorldMapBg = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-25"
    viewBox="0 0 1200 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <defs>
      <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#c9a55a" />
      </pattern>
      <mask id="continent-mask">
        {/* North America */}
        <path d="M 130 130 Q 200 100 280 120 Q 340 140 360 200 Q 350 260 280 280 Q 200 290 150 260 Q 100 220 130 130 Z" fill="white"/>
        {/* South America */}
        <path d="M 280 320 Q 320 300 350 330 Q 360 400 340 460 Q 310 500 290 470 Q 260 410 280 320 Z" fill="white"/>
        {/* Europe */}
        <path d="M 530 140 Q 600 130 650 150 Q 670 180 640 210 Q 580 220 540 200 Q 510 170 530 140 Z" fill="white"/>
        {/* Africa */}
        <path d="M 560 240 Q 630 230 680 270 Q 700 350 660 420 Q 610 450 580 410 Q 540 340 560 240 Z" fill="white"/>
        {/* Asia */}
        <path d="M 680 130 Q 800 110 920 150 Q 980 200 950 260 Q 870 280 770 260 Q 700 230 680 130 Z" fill="white"/>
        {/* Australia */}
        <path d="M 920 380 Q 990 370 1030 400 Q 1040 440 1000 450 Q 940 450 920 420 Z" fill="white"/>
      </mask>
    </defs>
    <rect width="1200" height="600" fill="url(#dots)" mask="url(#continent-mask)" />
  </svg>
);

/* ---------- Floating decorations ---------- */
const FloatingDecor = () => (
  <>
    {/* Floating flags */}
    <div className="absolute top-20 left-[8%] text-3xl animate-float-slow opacity-70" style={{ animationDelay: '0s' }}>🇺🇸</div>
    <div className="absolute top-32 right-[10%] text-3xl animate-float-medium opacity-70" style={{ animationDelay: '1.2s' }}>🇨🇦</div>
    <div className="absolute top-1/2 left-[5%] text-3xl animate-float-slow opacity-70" style={{ animationDelay: '2s' }}>🇬🇧</div>
    <div className="absolute bottom-40 right-[8%] text-3xl animate-float-medium opacity-70" style={{ animationDelay: '0.6s' }}>🇦🇺</div>
    <div className="absolute top-2/3 right-[20%] text-3xl animate-float-slow opacity-60" style={{ animationDelay: '1.8s' }}>🇩🇪</div>
    <div className="absolute bottom-1/3 left-[15%] text-3xl animate-float-medium opacity-60" style={{ animationDelay: '2.4s' }}>🇦🇪</div>

    {/* Airplanes */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      <div className="absolute animate-plane">
        <Plane size={36} className="text-gold" style={{ filter: 'drop-shadow(0 0 12px rgba(201,165,90,0.6))' }} />
      </div>
      <div className="absolute animate-plane-2">
        <Plane size={28} className="text-gold-light" style={{ filter: 'drop-shadow(0 0 8px rgba(230,201,128,0.5))' }} />
      </div>
    </div>

    {/* Visa stamp decorations */}
    <div className="absolute top-1/4 right-[25%] hidden lg:block opacity-30 animate-stamp">
      <div className="visa-stamp text-gold text-xs font-bold">
        <div>★ APPROVED ★</div>
        <div className="text-center mt-1">2026</div>
      </div>
    </div>
  </>
);

/* ---------- Rotating Globe (CSS) ---------- */
const RotatingGlobe = ({ size = 280 }) => (
  <div
    className="relative animate-spin-very-slow"
    style={{ width: size, height: size }}
  >
    <div className="absolute inset-0 rounded-full globe-shadow"
         style={{ background: 'radial-gradient(circle at 30% 30%, #1a2f56 0%, #0a1628 70%)' }}>
      {/* meridians */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-gold-soft opacity-30"
          style={{ transform: `rotateY(${i * 30}deg)`, borderColor: 'rgba(201, 165, 90, 0.25)' }}
        />
      ))}
      {/* parallels */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 border-t opacity-30"
          style={{
            top: `${(i + 1) * (100 / 6)}%`,
            borderColor: 'rgba(201, 165, 90, 0.25)',
          }}
        />
      ))}
      {/* dot markers — destinations */}
      {[
        { top: '30%', left: '25%' }, { top: '35%', left: '50%' }, { top: '40%', left: '75%' },
        { top: '60%', left: '30%' }, { top: '55%', left: '60%' }, { top: '50%', left: '15%' },
        { top: '65%', left: '80%' }, { top: '25%', left: '65%' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gold animate-pulse-gold"
          style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </div>
  </div>
);

/* ============================================================
   NAVIGATION
============================================================ */
const Navigation = ({ activePage, setActivePage, mobileOpen, setMobileOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'immigration', label: 'Immigration' },
    { id: 'study', label: 'Study Abroad' },
    { id: 'business', label: 'Business' },
    { id: 'tourist', label: 'Tourist Visas' },
    { id: 'countries', label: 'Countries' },
    { id: 'stories', label: 'Success' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-navy-deep shadow-2xl py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0 }); }}
            className="flex items-center gap-3 group"
          >
            <img
              src={logoImg}
              alt="Accurate Consultancy"
              className="h-16 w-auto"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); window.scrollTo({ top: 0 }); }}
                className={`px-3 py-2 text-sm tracking-wide transition-colors relative ${
                  activePage === item.id ? 'text-gold' : 'text-white/80 hover:text-gold'
                }`}
              >
                {item.label}
                {activePage === item.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold" />
                )}
              </button>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0 }); }}
              className="hidden md:inline-flex btn-gold px-5 py-2.5 rounded-full text-sm items-center gap-2"
            >
              Book Consultation <ArrowRight size={14} />
            </button>
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-navy-deepest/98 lg:hidden pt-24 px-6 animate-fade-in">
          <div className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setMobileOpen(false); window.scrollTo({ top: 0 }); }}
                className={`text-left py-4 border-b border-gold-soft text-lg font-display tracking-wide transition-colors animate-fade-up ${
                  activePage === item.id ? 'text-gold' : 'text-white/90'
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {item.label}
                <ArrowRight size={16} className="inline ml-2 opacity-50" />
              </button>
            ))}
            <button
              onClick={() => { setActivePage('contact'); setMobileOpen(false); window.scrollTo({ top: 0 }); }}
              className="btn-gold py-4 mt-6 rounded-full text-center font-semibold"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/* ============================================================
   HERO SECTION
============================================================ */
const Hero = ({ setActivePage }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-navy">
    <WorldMapBg />
    <div className="absolute inset-0 world-dots opacity-40" />
    <div className="absolute inset-0 gradient-radial-gold" />
    <FloatingDecor />

    <div className="relative z-10 max-w-7xl mx-auto px-5 py-32 grid lg:grid-cols-12 gap-12 items-center w-full">
      <div className="lg:col-span-7 text-center lg:text-left">
        <div className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full mb-7 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-xs tracking-[0.25em] uppercase">15+ Years of Trusted Experience</span>
        </div>

        <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-7 animate-fade-up delay-100">
          Your <span className="gradient-gold-text italic font-medium">Global Mobility</span><br />
          Partner.
        </h1>

        <p className="text-white/75 text-lg md:text-xl max-w-2xl lg:max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0 animate-fade-up delay-200">
          Strategic immigration, study abroad and global business solutions —
          turning visa goals into approved realities through bespoke advisory
          for discerning clients across the world.
        </p>

        <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up delay-300">
          <button
            onClick={() => setActivePage('contact')}
            className="btn-gold px-8 py-4 rounded-full text-sm font-semibold tracking-wide inline-flex items-center gap-2"
          >
            <Calendar size={18} /> Book Consultation
          </button>
          <a
            href={`https://wa.me/${BRAND.whatsapp1}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-outline-gold px-8 py-4 rounded-full text-sm font-semibold tracking-wide inline-flex items-center gap-2"
          >
            <MessageCircle size={18} /> WhatsApp Us
          </a>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 animate-fade-up delay-500">
          {[
            { icon: ShieldCheck, label: 'Licensed' },
            { icon: Award, label: 'Award-winning' },
            { icon: Globe, label: '50+ Countries' },
          ].map((b, i) => (
            <div key={i} className="text-center">
              <b.icon size={22} className="text-gold mx-auto mb-2" />
              <div className="text-white/60 text-[10px] tracking-[0.2em] uppercase">{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col items-center animate-scale-in delay-300">
        <RotatingGlobe size={320} />
        <div className="grid grid-cols-2 gap-5 mt-10 w-full max-w-sm">
          <Counter end={5000} suffix="+" label="Successful Visas" />
          <Counter end={50} suffix="+" label="Countries" />
        </div>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up delay-1000">
      <div className="flex flex-col items-center gap-2 text-gold/70">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </div>
  </section>
);

/* ============================================================
   WHY CHOOSE US
============================================================ */
const WhyChooseUs = () => {
  const features = [
    { icon: Award, title: 'Proven Track Record', text: 'Nearly two decades of successful visa approvals across complex immigration jurisdictions worldwide.' },
    { icon: Crown, title: 'Premium Advisory', text: 'White-glove service for high-net-worth individuals, executives, families and ambitious entrepreneurs.' },
    { icon: ShieldCheck, title: 'Regulated & Trusted', text: 'Compliant practices aligned with USCIS, IRCC, UKVI, ICA and Schengen consular requirements.' },
    { icon: Target, title: 'Bespoke Strategies', text: 'Every case is custom-architected — from EB-1A profile building to business plan structuring.' },
    { icon: HeartHandshake, title: 'End-to-End Partnership', text: 'From initial assessment through landing services in your destination country.' },
    { icon: TrendingUp, title: 'Outcome-Focused', text: 'Industry-leading approval rates backed by transparent process and honest case evaluation.' },
  ];

  return (
    <section className="py-24 md:py-32 bg-ivory relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 world-dots" />
      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="max-w-3xl mb-16">
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Why Choose Us</p>
          <h2 className="font-display text-navy-deep text-4xl md:text-5xl lg:text-6xl leading-[1.05] heading-accent">
            The Quiet Confidence of <em className="gradient-gold-text not-italic">Authentic Expertise</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-8 bg-white rounded-sm hover-gold-border card-lift relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 gradient-radial-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-sm flex items-center justify-center bg-navy-deep mb-6 group-hover:bg-gold transition-colors">
                  <f.icon size={26} className="text-gold group-hover:text-navy-deep transition-colors" />
                </div>
                <h3 className="font-display text-navy-deep text-2xl mb-3">{f.title}</h3>
                <p className="text-navy/70 leading-relaxed">{f.text}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FEATURED VISA PROGRAMS
============================================================ */
const FeaturedPrograms = ({ setActivePage }) => {
  const programs = [
    { code: '01', title: 'Canada Immigration', sub: 'Express Entry · PNP', desc: "Permanent residency through Express Entry, Provincial Nominee Programs and category-based draws — Canada's flagship skilled migration pathway.", tag: 'Premier' },
    { code: '02', title: 'USA EB-2 NIW', sub: 'National Interest Waiver', desc: 'Self-petition green card for advanced-degree professionals whose work substantially benefits the United States.', tag: 'Top Tier' },
    { code: '03', title: 'E-2 Treaty Investor', sub: 'United States Investor Visa', desc: 'Live and operate a business in the United States through a substantial investment from a qualifying treaty country.', tag: 'Investment' },
    { code: '04', title: 'Australia Immigration', sub: 'Skilled Migration Program', desc: 'Skilled Independent (189), Skilled Nominated (190) and Employer-Sponsored streams to Australian permanent residency.', tag: 'Premier' },
    { code: '05', title: 'Job Seeker Visa', sub: 'Germany & Beyond', desc: 'Six-month residency to seek qualified employment in Germany and select EU jurisdictions — the gateway to the EU Blue Card.', tag: 'Career' },
    { code: '06', title: 'Start-up Visa', sub: 'Founder Pathway', desc: 'Permanent residency for innovative founders backed by designated organisations — Canada Start-up Visa and equivalent routes.', tag: 'Founder' },
  ];

  return (
    <section className="py-24 md:py-32 gradient-navy relative overflow-hidden">
      <WorldMapBg />
      <div className="absolute inset-0 gradient-radial-gold opacity-30" />

      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Featured Visa Programs</p>
            <h2 className="font-display text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Premier Pathways to <em className="gradient-gold-text not-italic font-medium">Global Citizenship</em>.
            </h2>
          </div>
          <button
            onClick={() => setActivePage('immigration')}
            className="btn-outline-gold px-6 py-3 rounded-full text-sm inline-flex items-center gap-2"
          >
            All Programs <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((p, i) => (
            <div
              key={i}
              className="glass p-8 rounded-sm hover-gold-border card-lift group cursor-pointer relative overflow-hidden"
              onClick={() => setActivePage('immigration')}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-gold/40 text-4xl">{p.code}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase border border-gold-soft text-gold px-3 py-1 rounded-full">
                  {p.tag}
                </span>
              </div>
              <h3 className="font-display text-white text-2xl mb-1">{p.title}</h3>
              <p className="text-gold text-sm font-italic-serif italic mb-4">{p.sub}</p>
              <p className="text-white/65 text-sm leading-relaxed mb-6">{p.desc}</p>
              <div className="flex items-center gap-2 text-gold text-sm group-hover:gap-4 transition-all">
                <span>Explore Pathway</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   COUNTRIES WE SERVE
============================================================ */
const COUNTRY_DATA = [
  { code: 'US', name: 'United States', flag: '🇺🇸', tag: 'Marquee Destination', desc: 'EB-1A, EB-2 NIW, O-1, E-2, L-1 and B1/B2 — comprehensive US immigration counsel.', highlights: ['Investor & Talent Visas', 'Green Card Strategy', 'Business Pathways'] },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', tag: 'Permanent Residency', desc: 'Express Entry, PNP, Start-Up Visa and Study Permits — premium Canadian advisory.', highlights: ['Express Entry', 'Start-Up Visa', 'Study Permits'] },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', tag: 'Innovator & Talent', desc: 'Innovator Founder, Global Talent, Skilled Worker, Student and Visit Visa pathways.', highlights: ['Innovator Founder', 'Global Talent', 'Visit Visa'] },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', tag: 'Skilled Migration', desc: 'Skilled Independent (189), Skilled Nominated (190) and Business Innovation streams.', highlights: ['Subclass 189/190', 'Business Innovation', 'Student Visas'] },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', tag: 'Engineering & Study', desc: 'EU Blue Card, Job Seeker, Opportunity Card and tuition-free university admissions.', highlights: ['EU Blue Card', 'Opportunity Card', 'Free Tuition'] },
  { code: 'FR', name: 'France', flag: '🇫🇷', tag: 'Talent Passport', desc: 'Passeport Talent, business setup and prestigious grandes écoles admissions.', highlights: ['Talent Passport', 'Business Setup', 'Top Universities'] },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', tag: 'Entrepreneur & Study', desc: 'Entrepreneur Visa, Non-Lucrative Visa and study programmes across Spain.', highlights: ['Entrepreneur Visa', 'Non-Lucrative', 'University Admissions'] },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', tag: 'D2 & Golden Door', desc: 'D2 Entrepreneur, D7 Passive Income and pathways to EU permanent residency.', highlights: ['D2 Visa', 'D7 Visa', 'EU Residency'] },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', tag: 'Business Hub', desc: 'Mainland & Free Zone company formation, Golden Visa and family residency.', highlights: ['Free Zone Setup', 'Golden Visa', 'Investor Routes'] },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', tag: 'Visit & Study', desc: 'Tourist visa, business meetings, education and family visit visa support.', highlights: ['Tourist Visa', 'Business Meetings', 'Student Routes'] },
];

const CountriesGrid = ({ setActivePage }) => (
  <section className="py-24 md:py-32 bg-cream relative overflow-hidden">
    <div className="absolute inset-0 world-dots opacity-30" />
    <div className="max-w-7xl mx-auto px-5 relative">
      <div className="text-center mb-16">
        <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Countries We Serve</p>
        <h2 className="font-display text-navy-deep text-4xl md:text-5xl lg:text-6xl leading-[1.05] heading-accent-center">
          A World of <em className="gradient-gold-text not-italic font-medium">Opportunity</em>.
        </h2>
        <p className="text-navy/70 max-w-2xl mx-auto mt-6 text-lg">
          Curated pathways across ten flagship destinations — every case handled with regulatory precision and discretion.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {COUNTRY_DATA.map((c, i) => (
          <div
            key={i}
            onClick={() => setActivePage('countries')}
            className="bg-white p-6 rounded-sm border border-navy/5 hover-gold-border card-lift cursor-pointer group relative overflow-hidden animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="absolute top-3 right-3 text-4xl opacity-90">{c.flag}</div>
            <div className="text-gold text-[10px] tracking-[0.2em] uppercase mb-3 mt-1">{c.tag}</div>
            <h3 className="font-display text-navy-deep text-xl leading-tight mb-3">{c.name}</h3>
            <p className="text-navy/65 text-xs leading-relaxed mb-4 line-clamp-3">{c.desc}</p>
            <div className="gold-line mb-3" />
            <div className="flex items-center gap-1 text-gold text-xs group-hover:gap-2 transition-all">
              Explore <ChevronRight size={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   STUDY ABROAD STRIP
============================================================ */
const StudyAbroadStrip = ({ setActivePage }) => {
  const destinations = [
    { country: 'United Kingdom', flag: '🇬🇧', count: '160+', label: 'Russell Group & beyond' },
    { country: 'Canada', flag: '🇨🇦', count: '95+', label: 'Designated Learning Institutions' },
    { country: 'Australia', flag: '🇦🇺', count: '40+', label: 'Group of Eight & top tier' },
    { country: 'Germany', flag: '🇩🇪', count: '380+', label: 'Tuition-free public universities' },
    { country: 'France', flag: '🇫🇷', count: '70+', label: 'Grandes écoles partnerships' },
    { country: 'Spain', flag: '🇪🇸', count: '60+', label: 'Bilingual programmes' },
    { country: 'Portugal', flag: '🇵🇹', count: '30+', label: 'EU pathway via study' },
  ];

  return (
    <section className="py-24 md:py-32 bg-navy-deepest relative overflow-hidden">
      <div className="absolute inset-0 world-dots opacity-15" />
      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-12">
          <div className="lg:col-span-7">
            <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Global Education</p>
            <h2 className="font-display text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Prestigious Institutions.<br />
              <em className="gradient-gold-text not-italic font-medium">Seamless Admissions.</em>
            </h2>
            <p className="text-white/70 mt-6 text-lg leading-relaxed max-w-2xl">
              We bridge the gap between world-class ambition and global top-tier academic placements. 
              From application mapping to student visa procurement, secure your path to high-ranking institutions.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <button
              onClick={() => setActivePage('study')}
              className="btn-gold px-8 py-4 rounded-full text-sm font-semibold tracking-wide inline-flex items-center gap-2"
            >
              Explore Study Options <GraduationCap size={18} />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {destinations.map((d, i) => (
            <div key={i} className="glass p-6 rounded-sm border border-gold/10 hover-gold-border transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{d.flag}</span>
                <span className="font-display text-gold text-2xl font-bold">{d.count}</span>
              </div>
              <h3 className="font-display text-white text-lg mb-1">{d.country}</h3>
              <p className="text-white/66 text-xs">{d.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
