"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { MessageCircle, PhoneCall } from "lucide-react";
import SiteNav from "./SiteNav";
import Hero from "./Hero";
import { AboutDll, ApplicationCta, FaqSection, FinancialGoals, HowItWorks, LoanSolutions, TrustBar, WhyDll } from "./ContentSections";
import InstagramFeed from "./InstagramFeed";
import { ContactSection, SiteFooter } from "./ContactAndFooter";
import { contactPhone, formattedPhone, whatsappUrl } from "../data/siteContent";

export default function LandingPage() {
  const [selectedLoan, setSelectedLoan] = useState("");
  const reduceMotion = useReducedMotion();

  const startEnquiry = (loanName = "") => {
    if (loanName) setSelectedLoan(loanName);
    document.getElementById("contact")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <SiteNav onApply={() => startEnquiry()} />
      <main id="main-content">
        <Hero onApply={() => startEnquiry()} />
        <TrustBar />
        <LoanSolutions onApply={startEnquiry} />
        <WhyDll />
        <HowItWorks />
        <FinancialGoals />
        <InstagramFeed />
        <AboutDll />
        <ApplicationCta onApply={() => startEnquiry()} />
        <FaqSection />
        <ContactSection selectedLoan={selectedLoan} onSelectedLoanChange={setSelectedLoan} />
      </main>
      <SiteFooter />

      {/* Floating Quick Helpline */}
      <aside className="floating-helpline" aria-label="Quick contact helpline">
        <a
          href={`tel:${contactPhone}`}
          className="floating-btn floating-btn--call"
          title={`Call ${formattedPhone}`}
        >
          <PhoneCall size={19} />
          <span className="floating-btn__text">Call Us</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="floating-btn floating-btn--wa"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={20} />
          <span className="floating-btn__text">WhatsApp</span>
        </a>
      </aside>
    </>
  );
}
