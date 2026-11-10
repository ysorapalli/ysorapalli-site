import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageCard, { RunningHead } from "@/components/PageCard";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = { title: "Resume" };
// TODO: add a sanitized public resume only after text and visual privacy review.
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
              A public resume will be available here soon.
            </p>
            <Link className="text-link" href="/contact">
              Get in touch →
            </Link>
          </div>
        </section>
        <SiteFooter />
      </PageCard>
    </>
  );
}
