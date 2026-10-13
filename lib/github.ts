import { projectsPage, site } from "@/content/site";

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  fork: boolean;
  pushedAt: string;
  url: string;
};

export type RepoShelf = { repos: Repo[]; pulledAt: string; live: boolean };

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived?: boolean;
  pushed_at: string;
  html_url: string;
};

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  Python: "#3572A5",
  "C++": "#F34B7D",
  C: "#555555",
  Java: "#B07219",
  MATLAB: "#E16737",
  CMake: "#DA3434",
  Shell: "#89E051",
  "Jupyter Notebook": "#DA5B0B",
};

function applyFilters(repos: Repo[]): Repo[] {
  return repos.filter((r) => !projectsPage.hideRepos.includes(r.name) && !(projectsPage.hideForks && r.fork));
}

/**
 * Public repos, newest push first. Revalidated hourly (ISR), so new repos show up
 * without a redeploy. Falls back to the last known snapshot if GitHub can't be reached.
 */
export async function getRepoShelf(): Promise<RepoShelf> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ysorapalli.com",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${site.links.githubUser}/repos?sort=pushed&direction=desc&per_page=12&type=owner`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const data = (await res.json()) as ApiRepo[];
    const repos: Repo[] = data
      .filter((r) => !r.archived)
      .map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        fork: r.fork,
        pushedAt: r.pushed_at,
        url: r.html_url,
      }));
    return { repos: applyFilters(repos), pulledAt: new Date().toISOString(), live: true };
  } catch {
    const snap = projectsPage.githubSnapshot;
    return { repos: applyFilters(snap.repos as Repo[]), pulledAt: snap.pulledAt, live: false };
  }
}
