"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  Send,
  ShieldCheck,
} from "lucide-react";

function InstagramIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}
import {
  brandName,
  brandTagline,
  contactPhone,
  footerNav,
  formattedPhone,
  founderInfo,
  instagramUrl,
  loanTypes,
  officeAddress,
  officeHours,
  officialEmail,
  whatsappUrl,
} from "../data/siteContent";
import BrandLogo from "./BrandLogo";
import { Reveal, SectionIntro } from "./MotionBits";

const fullAddress = officeAddress.join(" ");
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

export function ContactSection({ selectedLoan = "", onSelectedLoanChange }) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") || "";
    const contact = formData.get("contact") || "";
    const loan = formData.get("loanType") || selectedLoan || "General Loan Consultation";
    const message = formData.get("message") || "";

    const whatsappMessage = `*New Loan Enquiry - Dhana Lakshmi Loans*%0A%0A*Name:* ${encodeURIComponent(
      name
    )}%0A*Contact:* ${encodeURIComponent(contact)}%0A*Service:* ${encodeURIComponent(
      loan
    )}%0A*Requirement:* ${encodeURIComponent(message)}`;

    const waLink = `https://wa.me/918919995865?text=${whatsappMessage}`;

    setFeedback(`Opening WhatsApp to connect you directly with Dhana Lakshmi Rekha...`);

    setTimeout(() => {
      window.open(waLink, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
      form.reset();
      onSelectedLoanChange("");
    }, 400);
  };

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="page-wrap">
        <SectionIntro
          eyebrow="Get In Touch"
          title="Let's start with a conversation."
          description="Have questions about Education, Personal, Home, Vehicle, Mortgage loans or Passport Services? Reach out directly via Call or WhatsApp."
          id="contact-title"
        />
        <div className="contact-layout">
          <Reveal as="article" className="contact-card contact-card--form">
            <div className="contact-card__heading">
              <span className="contact-heading-icon"><Send size={20} /></span>
              <div>
                <h3>Tell us what you need</h3>
                <p>Fill out this quick form to connect directly with our chief consultant on WhatsApp.</p>
              </div>
            </div>
            <form className="enquiry-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="form-field">
                  <span>Your name <i>*</i></span>
                  <input id="contact-name" name="name" autoComplete="name" placeholder="Enter your full name" required />
                </label>
                <label className="form-field">
                  <span>Phone Number / Email <i>*</i></span>
                  <input name="contact" autoComplete="tel" placeholder="e.g. 9876543210" required />
                </label>
              </div>
              <label className="form-field">
                <span>Select Service / Loan Category <i>*</i></span>
                <select name="loanType" value={selectedLoan} onChange={(event) => onSelectedLoanChange(event.target.value)} required>
                  <option value="">Choose a loan or service</option>
                  {loanTypes.map((loan) => (
                    <option key={loan.id} value={loan.title}>
                      {loan.title}
                    </option>
                  ))}
                  <option value="CIBIL & Eligibility Assessment">CIBIL &amp; Eligibility Assessment</option>
                  <option value="Other Financial Requirement">Other Financial Requirement</option>
                </select>
              </label>
              <label className="form-field">
                <span>Tell us a little about your requirement <i>*</i></span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Share details like required loan amount, preferred bank, or passport requirements..."
                  required
                />
              </label>
              <button className="button button--primary form-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Connecting..." : "Submit & Chat on WhatsApp"} <ArrowRight size={16} aria-hidden="true" />
              </button>
              {feedback && (
                <div className="form-feedback form-feedback--success" role="status">
                  <CheckCircle2 size={16} />
                  <span>{feedback}</span>
                </div>
              )}
              <p className="form-privacy">
                <ShieldCheck size={15} aria-hidden="true" /> Your data is confidential and used solely for loan eligibility guidance.
              </p>
            </form>
          </Reveal>

          <div className="contact-side">
            <Reveal as="article" className="contact-card contact-card--address">
              <div className="contact-card__heading">
                <span className="contact-heading-icon"><MapPin size={20} /></span>
                <div>
                  <h3>Visit our office</h3>
                  <p>Visakhapatnam, Andhra Pradesh</p>
                </div>
              </div>
              <address>
                {officeAddress.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <div className="office-action-row">
                <a className="button button--small button--outline" href={mapsHref} target="_blank" rel="noreferrer">
                  <MapPin size={15} /> Open in Google Maps <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>

            <Reveal as="article" className="contact-card contact-card--details" delay={0.06}>
              <div className="contact-detail">
                <span className="detail-icon"><PhoneCall size={18} /></span>
                <div>
                  <strong>Phone / Direct Call</strong>
                  <a href={`tel:${contactPhone}`} className="contact-link">{formattedPhone}</a>
                  <small>Direct line to Dhana Lakshmi Rekha</small>
                </div>
              </div>
              <div className="contact-detail">
                <span className="detail-icon detail-icon--wa"><MessageCircle size={18} /></span>
                <div>
                  <strong>WhatsApp Helpline</strong>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="contact-link">
                    Chat on WhatsApp (+91 8919995865)
                  </a>
                  <small>Fast response for enquiries &amp; CIBIL check</small>
                </div>
              </div>
              <div className="contact-detail">
                <span className="detail-icon"><Clock size={18} /></span>
                <div>
                  <strong>Office Working Hours</strong>
                  <span>{officeHours}</span>
                  <small>PAN India assistance available online</small>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-wrap">
        <div className="footer-main">
          <div className="footer-brand">
            <BrandLogo footer />
            <p className="footer-tagline">“{brandTagline}”</p>
            <p>
              Premier financial consulting and loan facilitation across All Banks, Corporate Banks, and NBFCs. Direct assistance by Dhana Lakshmi Rekha.
            </p>
            <div className="footer-social-links">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                title="Follow on Instagram"
              >
                <InstagramIcon size={18} />
                <span>Instagram: {founderInfo.instagramHandle}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn footer-social-btn--wa"
                title="Message on WhatsApp"
              >
                <MessageCircle size={18} />
                <span>WhatsApp: {formattedPhone}</span>
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            {footerNav.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="footer-column">
            <h3>Services</h3>
            {loanTypes.map((loan) => (
              <a href="#loans" key={loan.id}>
                {loan.title}
              </a>
            ))}
          </div>
          <div className="footer-column footer-address">
            <h3>Head Office</h3>
            <address>
              {officeAddress.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="footer-contact-links">
              <a className="text-link" href={`tel:${contactPhone}`}>
                Call: {formattedPhone} <ArrowUpRight size={14} />
              </a>
              <a className="text-link" href="#contact">
                Office Directions &amp; Form <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-legal-links" aria-label="Legal information links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms &amp; Conditions</a>
          <a href="#disclaimer">Regulatory Disclaimer</a>
        </div>
        <div className="legal-notes">
          <details id="privacy">
            <summary>Privacy &amp; Data Protection</summary>
            <p>
              Dhana Lakshmi Loans respects client privacy. All personal information, KYC documents, and financial details provided during loan or passport consultation are handled strictly in compliance with applicable Indian privacy norms and verified banking guidelines. We never sell or share client data with unauthorized third parties.
            </p>
          </details>
          <details id="terms">
            <summary>Service Terms &amp; Conditions</summary>
            <p>
              Dhana Lakshmi Loans acts as an independent financial consultant and facilitation partner between clients and authorized financial institutions (Banks and NBFCs). All loan approvals, interest rates, processing charges, and repayment tenures remain subject to individual lender sanction terms and credit underwriting.
            </p>
          </details>
          <details id="disclaimer">
            <summary>Financial &amp; Legal Disclaimer</summary>
            <p>
              Website content is provided for informational and consultation purposes only. Submitting an enquiry does not guarantee loan approval or instant disbursal. Final loan sanction is dependent on CIBIL score verification, borrower eligibility, and lender documentation standards. Review all loan agreements and repayment obligations carefully before borrowing.
            </p>
          </details>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {brandName} (DLL) • Pan India Service</span>
          <span>{brandTagline} • Direct Helpline: {formattedPhone}</span>
        </div>
      </div>
    </footer>
  );
}
