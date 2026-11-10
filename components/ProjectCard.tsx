import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

export default function ProjectCard({
  project: p,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="work-row project-card"
      aria-labelledby={`project-${p.slug}`}
    >
      <div className="work-row__plate">
        {p.image ? (
          <Image
            src={p.image.src}
            width={p.image.width}
            height={p.image.height}
            alt={p.image.alt}
            sizes="(max-width: 700px) 85vw, 350px"
            style={{ objectPosition: p.image.position }}
          />
        ) : (
          <div className="project-plate" aria-hidden="true">
            <span className="micro">Collected works</span>
            <span>Chapter {String(index + 1).padStart(2, "0")}</span>
            <span className="project-plate__mark">✦</span>
          </div>
        )}
      </div>
      <div className="work-row__text">
        <p className="work-row__meta">{p.dateLabel}</p>
        <h3 id={`project-${p.slug}`}>{p.title}</h3>
        <p className="work-row__summary">{p.summary}</p>
        {p.role && <p className="note">Role: {p.role}</p>}
        {p.skills.length > 0 && (
          <ul className="tags" aria-label="Skills">
            {p.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        )}
        <span className="project-card__arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}
