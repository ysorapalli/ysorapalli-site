import type { Metadata } from "next";
import { site } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import PageCard, { RunningHead } from "@/components/PageCard";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Resume",
  description: `${site.name}'s one-page resume.`,
};

export default function ResumePage() {
  return (
    <>
      <SiteHeader current="resume" />
      <PageCard variant="sub">
        <section className="page-head" aria-labelledby="resume-h">
          <RunningHead left="The author" right="Resume" />
          <div className="page-head__body">
            <h1 id="resume-h" className="page-h1">
              Resume
            </h1>
            <p className="page-intro">
              Everything on one page: education, projects and experience.
            </p>
            <div className="resume-actions">
              <a
                className="btn btn--ink"
                href={site.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open PDF ↗
              </a>
              <a
                className="btn btn--outline"
                href={site.resumePdf}
                download="Yashasvi-Sorapalli-Resume.pdf"
              >
                Download
              </a>
            </div>
          </div>
        </section>
        <iframe
          className="resume-frame"
          src={site.resumePdf}
          title={`${site.name}'s resume`}
        />
        <SiteFooter />
      </PageCard>
    </>
  );
}
