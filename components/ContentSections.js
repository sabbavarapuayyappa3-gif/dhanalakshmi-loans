import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CarFront,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Eye,
  FileCheck2,
  FileText,
  Globe,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  HeartPulse,
  House,
  Layers3,
  LifeBuoy,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  PhoneCall,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  UserRound,
  UserRoundCheck,
  X,
} from "lucide-react";
import {
  contactPhone,
  dllBenefits,
  faqItems,
  financialGoals,
  formattedPhone,
  founderInfo,
  loanTypes,
  processSteps,
  trustPoints,
  whatsappUrl,
} from "../data/siteContent";
import { Reveal, SectionIntro } from "./MotionBits";

const iconMap = {
  HandCoins,
  BriefcaseBusiness,
  CarFront,
  GraduationCap,
  House,
  Building2,
  Globe,
  Target,
  Sparkles,
  ClipboardCheck,
  Layers3,
  HeartHandshake,
  BadgeCheck,
  MessageCircle,
  MapPin,
  SlidersHorizontal,
  Search,
  FileCheck2,
  FileText,
  ArrowUpRight,
  UserRound,
  HeartPulse,
  LifeBuoy,
  CircleHelp,
  ShieldCheck,
  UserRoundCheck,
  PhoneCall,
  Award,
};

function LineIcon({ name, size = 21, strokeWidth = 1.8, ...props }) {
  const Icon = iconMap[name] || Sparkles;
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" {...props} />;
}

export function TrustBar() {
  return (
    <section className="trust-strip" aria-label="DLL service qualities">
      <div className="page-wrap trust-strip__inner">
        {trustPoints.map((point) => (
          <div className="trust-point" key={point.title}>
            <span className="trust-point__icon"><LineIcon name={point.icon} size={18} /></span>
            <span>{point.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LoanSolutions({ onApply }) {
  const [posterOpen, setPosterOpen] = useState(false);

  return (
    <section className="section loans-section" id="loans" aria-labelledby="loans-title">
      <div className="page-wrap">
        <SectionIntro
          eyebrow="Types of Loans & Services"
          title="All Banks • Corporate Banks • NBFCs"
          description="Loan options tailored to your CIBIL score and eligibility. Explore our 6 core services and consult directly for seamless approval."
          id="loans-title"
        />

        <div className="loan-grid">
          {loanTypes.map((loan, index) => (
            <Reveal as="article" className="loan-card" delay={index * 0.04} key={loan.id}>
              <div className="loan-card__top">
                <span className="icon-tile"><LineIcon name={loan.icon} size={24} /></span>
                <span className="loan-badge">{loan.highlight}</span>
              </div>
              <div className="loan-category-label">{loan.category}</div>
              <h3>{loan.title}</h3>
              <p>{loan.description}</p>
              <div className="loan-card__benefit">
                <span className="benefit-check"><Check size={14} /></span>
                {loan.benefit}
              </div>
              <div className="loan-card__actions">
                <button
                  className="button button--small button--primary"
                  type="button"
                  onClick={() => onApply(loan.title)}
                >
                  Apply for {loan.title.split(" ")[0]} <ArrowRight size={15} />
                </button>
                <a
                  className="whatsapp-quick-btn"
                  href={`https://wa.me/918919995865?text=Hello%20Dhana%20Lakshmi%20Loans%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(loan.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  title={`Chat on WhatsApp about ${loan.title}`}
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Official Banner & Partner Network Showcase */}
        <div className="official-banner-card">
          <div className="banner-card__art">
            <div className="banner-image-preview" onClick={() => setPosterOpen(true)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setPosterOpen(true)}>
              <Image
                src="/dll-services-banner.png"
                alt="Official Dhanalakshmi Loans Services Poster"
                width={260}
                height={390}
                className="banner-poster-thumb"
              />
              <span className="banner-zoom-badge"><Maximize2 size={15} /> Click to View Full Poster</span>
            </div>
          </div>
          <div className="banner-card__info">
            <span className="eyebrow eyebrow--on-blue">Official Lending Partner</span>
            <h3>Your Dreams, Our Guidance</h3>
            <p className="banner-card__subtitle">
              We connect you with all Nationalized Banks, Top Corporate Banks, and registered NBFCs across India.
            </p>
            <div className="banner-highlights">
              <div className="highlight-pill"><BadgeCheck size={16} /> PAN India Service</div>
              <div className="highlight-pill"><Target size={16} /> CIBIL Score Matching</div>
              <div className="highlight-pill"><Building2 size={16} /> All Major Banks & NBFCs</div>
              <div className="highlight-pill"><Globe size={16} /> Full Passport Services</div>
            </div>
            <div className="banner-card__actions">
              <a className="button button--yellow" href={`tel:${contactPhone}`}>
                <PhoneCall size={16} /> Call {formattedPhone}
              </a>
              <button className="button button--outline-light" type="button" onClick={() => setPosterOpen(true)}>
                <Eye size={16} /> View Official Poster
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Full-Size Poster */}
        {posterOpen && (
          <div className="poster-modal-overlay" onClick={() => setPosterOpen(false)} role="dialog" aria-modal="true">
            <div className="poster-modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="poster-modal-close"
                onClick={() => setPosterOpen(false)}
                aria-label="Close poster view"
              >
                <X size={24} />
              </button>
              <div className="poster-modal-body">
                <Image
                  src="/dll-services-banner.png"
                  alt="Dhanalakshmi Loans Official Services Flyer"
                  width={680}
                  height={1020}
                  className="poster-modal-image"
                  priority
                />
              </div>
              <div className="poster-modal-footer">
                <a className="button button--primary" href={`tel:${contactPhone}`}>
                  <PhoneCall size={16} /> Call {formattedPhone}
                </a>
                <a className="button button--outline" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle size={16} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        )}

        <p className="section-footnote">Loan options, interest rates, and approval tenures are subject to bank terms, credit verification, and CIBIL score evaluation.</p>
      </div>
    </section>
  );
}

export function WhyDll() {
  return (
    <section className="section why-section" id="why-dll" aria-labelledby="why-title">
      <div className="page-wrap why-layout">
        <div className="why-intro">
          <SectionIntro
            eyebrow="Why Choose DLL"
            title="Good guidance makes all the difference."
            description="With ties to All Banks, Corporate Banks, and NBFCs, we guide you to the loan that matches your exact financial profile."
            id="why-title"
          />
          <div className="why-note">
            <div className="why-note__mark"><ShieldCheck size={24} /></div>
            <div>
              <strong>Transparent Guidance • Zero Hassle</strong>
              <p>Compare interest rates, tenure options, and processing terms with complete clarity before proceeding.</p>
            </div>
          </div>
        </div>
        <div className="benefit-grid">
          {dllBenefits.map((benefit, index) => (
            <Reveal as="article" className="benefit-card" delay={index * 0.035} key={benefit.title}>
              <span className="benefit-card__icon"><LineIcon name={benefit.icon} size={20} /></span>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="section process-section" aria-labelledby="process-title">
      <div className="page-wrap">
        <SectionIntro
          eyebrow="How it works"
          title="Fast, Transparent & Simple Process."
          description="From initial profile consultation to final loan disbursal or passport receipt, we handle the complexity for you."
          align="center"
          id="process-title"
        />
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <Reveal as="article" className="process-card" delay={index * 0.06} key={step.number}>
              <div className="process-card__top">
                <span className="process-number">{step.number}</span>
                <span className="process-icon"><LineIcon name={step.icon} size={21} /></span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {index < processSteps.length - 1 && <span className="process-connector" aria-hidden="true"><ArrowRight size={18} /></span>}
            </Reveal>
          ))}
        </div>
        <p className="process-disclaimer">Loan sanction, interest rates, and final disbursal are subject to lender underwriting and KYC verification.</p>
      </div>
    </section>
  );
}

export function FinancialGoals() {
  return (
    <section className="section goals-section" aria-labelledby="goals-title">
      <div className="page-wrap">
        <SectionIntro
          eyebrow="Tailored Solutions"
          title="Whatever your requirement, we have the right loan."
          description="Explore financial support for every phase of life, education, business, and international travel."
          id="goals-title"
        />
        <div className="goals-grid">
          {financialGoals.map((goal, index) => (
            <Reveal as="article" className="goal-card" delay={(index % 4) * 0.045} key={goal.title}>
              <span className="goal-card__icon"><LineIcon name={goal.icon} size={20} /></span>
              <div>
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
              </div>
              <span className="goal-card__arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
            </Reveal>
          ))}
        </div>
        <div className="responsible-note">
          <span className="responsible-note__icon"><ShieldCheck size={18} /></span>
          <p>We believe in responsible borrowing: we match you with affordable repayment plans that support your financial well-being.</p>
        </div>
      </div>
    </section>
  );
}

export function AboutDll() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="page-wrap about-layout">
        {/* Real Executive Portrait Presentation */}
        <Reveal className="about-founder-card">
          <div className="founder-image-wrapper">
            <Image
              src="/dhana-lakshmi-rekha.png"
              alt="Dhana Lakshmi Rekha - Founder & Managing Director of Dhana Lakshmi Loans"
              width={380}
              height={480}
              priority
              className="founder-portrait"
            />
            <div className="founder-image-badge">
              <Award size={18} />
              <span>Founder &amp; Financial Consultant</span>
            </div>
          </div>
          <div className="founder-card-meta">
            <h4>{founderInfo.name}</h4>
            <p className="founder-role">{founderInfo.title}</p>
            <p className="founder-tagline">“{founderInfo.tagline}”</p>
            <div className="founder-card-stats">
              <div className="founder-stat-item">
                <strong>PAN India</strong>
                <small>Service Area</small>
              </div>
              <div className="founder-stat-item">
                <strong>All Banks &amp; NBFCs</strong>
                <small>Lending Network</small>
              </div>
              <div className="founder-stat-item">
                <strong>6 Services</strong>
                <small>Loans &amp; Passport</small>
              </div>
            </div>
            <div className="founder-quick-actions">
              <a className="button button--primary button--small" href={`tel:${founderInfo.phone}`}>
                <PhoneCall size={15} /> Call {founderInfo.phone}
              </a>
              <a className="button button--outline button--small" href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        </Reveal>

        <div className="about-copy">
          <SectionIntro
            eyebrow="About Dhana Lakshmi Loans"
            title="Your Dreams, Our Guidance."
            description="Founded by Dhana Lakshmi Rekha, Dhana Lakshmi Loans is a premier financial advisory and loan facilitation firm based in Visakhapatnam, offering dedicated PAN-India support."
            id="about-title"
          />
          <p className="about-extra">
            Navigating multiple banks, documentation guidelines, and fluctuating interest rates can be overwhelming. We streamline the entire journey by assessing your CIBIL score and profile eligibility, then matching you with the ideal public sector bank, private corporate bank, or NBFC.
          </p>
          <ul className="about-values">
            <li><span><Check size={15} /></span> <b>Education, Personal, Home, Vehicle &amp; Mortgage Loans</b></li>
            <li><span><Check size={15} /></span> <b>Full Passport Documentation &amp; Appointment Services</b></li>
            <li><span><Check size={15} /></span> <b>Tie-ups across All Nationalized &amp; Corporate Banks and NBFCs</b></li>
            <li><span><Check size={15} /></span> <b>Personalized CIBIL score analysis for maximum loan approval</b></li>
            <li><span><Check size={15} /></span> <b>Direct assistance with complete transparency and zero hidden fees</b></li>
          </ul>
          <div className="about-actions-row">
            <a href="#contact" className="button button--primary">
              Book a Consultation <ArrowRight size={16} />
            </a>
            <a href={`tel:${founderInfo.phone}`} className="text-link text-link--strong">
              Direct Helpline: {founderInfo.formattedPhone} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ApplicationCta({ onApply }) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="page-wrap cta-band__inner">
        <Reveal className="cta-copy">
          <p className="eyebrow eyebrow--on-blue">Your next step</p>
          <h2 id="cta-title">Let's find the right loan for you.</h2>
          <p>Tell us what you need and our team will help you explore the available options.</p>
          <small>Options, eligibility and terms are subject to DLL's assessment.</small>
        </Reveal>
        <Reveal className="cta-action" delay={0.08}>
          <button type="button" className="button button--yellow button--large" onClick={onApply}>
            Start Your Application <ArrowRight size={17} aria-hidden="true" />
          </button>
          <span className="cta-action__hint">A conversation to understand your needs.</span>
        </Reveal>
        <span className="cta-sun" aria-hidden="true" />
      </div>
    </section>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="page-wrap faq-layout">
        <SectionIntro
          eyebrow="Frequently asked questions"
          title="A few things you might be wondering."
          description="If your question isn't here, bring it to DLL when you discuss your requirement."
          id="faq-title"
        />
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            return (
              <div className={`faq-item${isOpen ? " faq-item--open" : ""}`} key={item.question}>
                <h3>
                  <button className="faq-question" type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                    <span>{item.question}</span><span className="faq-chevron"><ChevronDown size={18} /></span>
                  </button>
                </h3>
                <div id={answerId} className="faq-answer" hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
          <p className="faq-footnote"><ShieldCheck size={16} aria-hidden="true" /> Details can change. Confirm current availability and terms directly with DLL.</p>
        </div>
      </div>
    </section>
  );
}
