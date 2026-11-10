import { images, projectsPage, papers } from "./site";

export type Project = {
  title: string;
  slug: string;
  date: string;
  dateLabel: string;
  summary: string;
  description?: string;
  role?: string;
  contributions?: string[];
  tasks?: string[];
  approach?: string;
  skills: string[];
  challenges?: string;
  resolution?: string;
  results?: string;
  lessons?: string;
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    position?: string;
  };
  paper?: string;
  repository?: string;
  demo?: string;
  featured: boolean;
};

// Dates describe documented activity/publication, not invented completion dates.
// TODO: confirm project start/end dates and chronology with Yashasvi, especially
// tracking (2022-23 work, 2025 paper) and storage (only publication year is known).
const selected = projectsPage.works;
const shelfRepos = projectsPage.githubSnapshot.repos.filter(
  (repo) => !projectsPage.hideRepos.includes(repo.name),
);
type Repo = (typeof shelfRepos)[number];
const repoProject = (repo: Repo): Project => ({
  title: repo.name === "stroke-detection" ? "Stroke detection" : repo.name,
  slug: repo.name.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
  date: repo.pushedAt,
  dateLabel: `Repository updated ${repo.pushedAt.slice(0, 10)}`,
  summary: repo.description,
  skills: repo.language ? [repo.language] : [],
  contributions: projectsPage.repoNotes[repo.name]
    ? [projectsPage.repoNotes[repo.name]]
    : undefined,
  repository: repo.url,
  featured: false,
  // TODO: confirm completion status before adding a results line.
});
const projectEntries: Project[] = [
  {
    title: selected[0].title,
    slug: "autonomous-laboratory",
    date: "2026",
    dateLabel: selected[0].meta,
    summary: selected[0].summary,
    role: "CMU MRSD team project.",
    skills: [...selected[0].tags],
    featured: true,
    image: {
      ...images.lab,
      alt: selected[0].alt,
      position: selected[0].imagePosition,
    },
    results: "Ongoing. First team presentation delivered in November 2026.",
    // TODO: expand only after the author provides corrected What I'm Working On copy.
  },
  // TODO: space project details and any course repos/visuals to come from Yashasvi.
  ...projectsPage.courseProjects.map((c): Project => ({
    title: c.title,
    slug: c.slug,
    date: "2026",
    dateLabel: c.meta,
    summary: c.summary,
    role: c.role,
    tasks: c.tasks && [...c.tasks],
    approach: c.approach,
    skills: [...c.tags],
    results: c.results,
    featured: c.featured,
  })),
  ...shelfRepos
    .filter((repo) => !(repo.name in projectsPage.hackathonRepos))
    .map(repoProject),
  {
    title: selected[1].title,
    slug: "multicamera-tracking",
    date: "2025",
    dateLabel: selected[1].meta,
    summary: selected[1].summary,
    role: "Team of four.",
    // TODO: confirm individual contribution.
    tasks: ["Extended single-camera DeepSORT to a network of cameras."],
    approach:
      "Shared track data through MySQL to keep identities stable across cameras and through occlusion.",
    skills: [...selected[1].tags],
    paper: papers[0].href,
    featured: true,
    image: {
      ...images.tracking,
      alt: selected[1].alt,
      position: selected[1].imagePosition,
    },
    challenges: "Maintaining consistent identities through occlusion.",
    results: papers[0].venue,
  },
  {
    title: selected[2].title,
    slug: "decentralized-document-storage",
    date: "2024",
    dateLabel: selected[2].meta,
    summary: selected[2].summary,
    role: "System and authentication workflow validation.",
    contributions: ["Validated the system and its authentication workflow."],
    approach:
      "Blockchain, NFTs and IPFS for storing and authenticating documents.",
    skills: [...selected[2].tags],
    paper: papers[1].href,
    featured: true,
    image: {
      ...images.blockchain,
      alt: selected[2].alt,
      position: selected[2].imagePosition,
    },
    results: papers[1].venue,
  },
];

// Featured work leads; within each group, newest first. Compare years only so a
// full repository timestamp doesn't outrank a year-only project date.
export const projects = projectEntries.sort(
  (a, b) =>
    Number(b.featured) - Number(a.featured) ||
    b.date.slice(0, 4).localeCompare(a.date.slice(0, 4)),
);
// The home page shows every featured project: current work and published papers.
export const latestProjects = projects.filter((p) => p.featured);
// Small hackathon builds, shown in their own collapsed section on /projects.
export const hackathonProjects = shelfRepos
  .filter((repo) => repo.name in projectsPage.hackathonRepos)
  .map((repo) => ({
    ...repoProject(repo),
    dateLabel: projectsPage.hackathonRepos[repo.name],
  }));
