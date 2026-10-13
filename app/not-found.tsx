import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageCard, { RunningHead } from "@/components/PageCard";

export default function NotFound() {
  return (
    <>
      <SiteHeader current="book" />
      <PageCard variant="sub">
        <section className="page-head" style={{ paddingBottom: 96 }}>
          <RunningHead left="Yashasvi Sorapalli" right="Missing page" />
          <div className="page-head__body">
            <h1 className="page-h1">This page isn&apos;t in the book.</h1>
            <p className="page-intro">It may have moved, or the link is off by a page or two.</p>
            <Link className="btn btn--ink" style={{ alignSelf: "flex-start" }} href="/">Back to the contents</Link>
          </div>
        </section>
      </PageCard>
    </>
  );
}
