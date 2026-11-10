import type { Metadata } from "next";
import Link from "next/link";
import { hackathonProjects, projects } from "@/content/projects";
import { site } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import PageCard, { RunningHead } from "@/components/PageCard";
import ProjectCard from "@/components/ProjectCard";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Robotics, research and software projects by Yashasvi Sorapalli.",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader current="projects" />
      <PageCard variant="sub">
        <section className="page-head" aria-labelledby="projects-h">
          <RunningHead
            left={<Link href="/">← Back to the book</Link>}
            right="Projects"
          />
          <div className="page-head__body">
            <h1 id="projects-h" className="page-h1">
              Collected works
            </h1>
            <p className="page-intro">
              Robotics, research, and software. Open a project for the story
              behind the work.
            </p>
            <p className="note">
              Current work first, then published research and repositories.
            </p>
          </div>
        </section>
        <section className="project-list" aria-labelledby="all-h">
          <h2 id="all-h" className="label">
            All projects
          </h2>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </section>
        {hackathonProjects.length > 0 && (
          <section className="hackathons" aria-labelledby="hackathons-h">
            <details>
              <summary>
                <h2 id="hackathons-h" className="shelf__title">
                  Hackathon projects
                </h2>
                <span className="micro">
                  {hackathonProjects.length} quick{" "}
                  {hackathonProjects.length === 1 ? "build" : "builds"}
                </span>
              </summary>
              <ul className="hackathon-list">
                {hackathonProjects.map((h) => (
                  <li key={h.slug}>
                    <p className="micro">{h.dateLabel}</p>
                    <h3>{h.title}</h3>
                    <p>{h.summary}</p>
                    {h.contributions?.map((c) => (
                      <p key={c} className="note">
                        {c}
                      </p>
                    ))}
                    {h.skills.length > 0 && (
                      <ul className="tags" aria-label="Skills">
                        {h.skills.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    )}
                    {h.repository && (
                      <a
                        className="text-link"
                        href={h.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Repository ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          </section>
        )}
        <section className="shelf compact-shelf" aria-labelledby="shelf-h">
          <h2 id="shelf-h" className="shelf__title">
            On the shelf
          </h2>
          <p className="note">More code and experiments on GitHub.</p>
          <a
            className="text-link"
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Browse repositories ↗
          </a>
        </section>
        <SiteFooter />
      </PageCard>
    </>
  );
}
