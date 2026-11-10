import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import SiteHeader from "@/components/SiteHeader";
import PageCard, { RunningHead } from "@/components/PageCard";
import SiteFooter from "@/components/SiteFooter";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.title ?? "Project", description: project?.summary };
}
function Detail({
  title,
  text,
  items,
}: {
  title: string;
  text?: string;
  items?: string[];
}) {
  // Sections without confirmed content stay hidden until the author fills them in.
  if (!text && !items?.length) return null;
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      {text ? (
        <p>{text}</p>
      ) : (
        <ul>
          {items!.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  return (
    <>
      <SiteHeader current="projects" />
      <PageCard variant="sub">
        <section className="page-head" aria-labelledby="project-h">
          <RunningHead
            left={<Link href="/projects">← All projects</Link>}
            right={`Chapter ${String(index + 1).padStart(2, "0")}`}
          />
          <div className="page-head__body">
            <p className="kicker">{p.dateLabel}</p>
            <h1 id="project-h" className="page-h1">
              {p.title}
            </h1>
            <p className="page-intro">{p.summary}</p>
          </div>
        </section>
        <div className="project-detail">
          <div className="prose">
            {p.image && (
              <figure className="figure">
                <div className="figure__plate">
                  <Image
                    src={p.image.src}
                    width={p.image.width}
                    height={p.image.height}
                    alt={p.image.alt}
                    sizes="(max-width: 700px) 85vw, 620px"
                  />
                </div>
              </figure>
            )}
            <Detail title="Goal" text={p.description ?? p.summary} />
            <Detail title="Major tasks" items={p.tasks} />
            <Detail title="Technical approach" text={p.approach} />
            <Detail
              title="My contributions"
              text={p.contributions?.length ? undefined : p.role}
              items={p.contributions}
            />
            <Detail title="Challenges" text={p.challenges} />
            <Detail title="How they were addressed" text={p.resolution} />
            <Detail title="Results or current status" text={p.results} />
            <Detail title="Key takeaways" text={p.lessons} />
          </div>
          <aside className="project-resources" aria-labelledby="resources-h">
            <h2 id="resources-h">Project notes</h2>
            <p className="note">{p.dateLabel}</p>
            {p.skills.length > 0 && (
              <>
                <h3>Tools and skills</h3>
                <ul className="tags">
                  {p.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </>
            )}
            {(p.paper || p.repository || p.demo) && <h3>Resources</h3>}
            {p.paper && (
              <a
                className="text-link"
                href={p.paper}
                target="_blank"
                rel="noopener noreferrer"
              >
                Paper ↗
              </a>
            )}
            {p.repository && (
              <a
                className="text-link"
                href={p.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                Repository ↗
              </a>
            )}
            {p.demo && (
              <a
                className="text-link"
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo ↗
              </a>
            )}
          </aside>
        </div>
        <nav className="project-pagination" aria-label="Project navigation">
          {projects[index - 1] ? (
            <Link href={`/projects/${projects[index - 1].slug}`}>
              ← Previous: {projects[index - 1].title}
            </Link>
          ) : (
            <Link href="/projects">← All projects</Link>
          )}
          {projects[index + 1] && (
            <Link href={`/projects/${projects[index + 1].slug}`}>
              Next: {projects[index + 1].title} →
            </Link>
          )}
        </nav>
        <SiteFooter />
      </PageCard>
    </>
  );
}
