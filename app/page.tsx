import Image from "next/image";
import Link from "next/link";
import { images, prologue, site, titlePage } from "@/content/site";
import { latestProjects } from "@/content/projects";
import SiteHeader from "@/components/SiteHeader";
import PageCard, { RunningHead } from "@/components/PageCard";
import ArmSketchPad from "@/components/ArmSketchPad";
import ProjectCard from "@/components/ProjectCard";
import SiteFooter from "@/components/SiteFooter";

export default function BookPage() {
  return (
    <>
      <SiteHeader current="book" />
      <PageCard variant="book">
        <section className="title-page" aria-labelledby="home-h">
          <div className="title-page__text">
            <p className="kicker">{titlePage.kicker}</p>
            <h1 id="home-h" className="title">
              {site.name}
            </h1>
            <p className="subtitle">{titlePage.subtitle}</p>
            <div className="hero-author">
              <Image
                className="hero-portrait"
                src={images.portrait.src}
                width={112}
                height={112}
                alt={prologue.plate.alt}
                priority
                sizes="112px"
              />
              <div>
                <p>Robotics graduate student at Carnegie Mellon.</p>
                <p className="note">
                  Perception, Planning, SLAM, Deep Learning, SWE at Visa &amp;
                  BT Group.
                </p>
                <Link className="text-link" href="/about">
                  Meet the author →
                </Link>
              </div>
            </div>
            <p className="imprint">{titlePage.imprint}</p>
          </div>
          <ArmSketchPad />
        </section>
        <section
          id="projects"
          className="home-projects"
          aria-labelledby="recent-h"
        >
          <RunningHead left="Collected works" right="01 / Projects" />
          <div className="section-heading">
            <h2 id="recent-h" className="chapter__title">
              Recent projects
            </h2>
            <p className="note">
              Current work first, then published research and repositories.
            </p>
          </div>
          {latestProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
          <div className="project-pagination">
            <span className="micro">
              {latestProjects.length} projects in this selection
            </span>
            <Link className="btn btn--outline" href="/projects">
              Next: all projects →
            </Link>
          </div>
        </section>
        <SiteFooter />
      </PageCard>
    </>
  );
}
