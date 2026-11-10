import type { Metadata } from "next";
import { contactForm, correspondence, site } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import PageCard, { RunningHead } from "@/components/PageCard";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() {
  return (
    <>
      <SiteHeader current="contact" />
      <PageCard variant="sub">
        <section className="page-head" aria-labelledby="contact-h">
          <RunningHead left="The next conversation" right="Correspondence" />
          <div className="page-head__body">
            <h1 id="contact-h" className="page-h1">
              Send a note
            </h1>
            <p className="page-intro">{correspondence.body}</p>
            <a
              className="btn btn--ink"
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn ↗
            </a>
          </div>
        </section>
        <section className="panel contact-panel" aria-labelledby="form-h">
          <h2 id="form-h" className="panel__title">
            {contactForm.heading}
          </h2>
          <ContactForm />
        </section>
        <div className="greetings">
          <div className="greetings__words">
            {correspondence.greetings.map((g) => (
              <span key={g.lang} lang={g.lang}>
                {g.text}
              </span>
            ))}
          </div>
          <p className="note">{correspondence.greetingsNote}</p>
        </div>
        <SiteFooter />
      </PageCard>
    </>
  );
}
