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
  // Detail sections take one paragraph or a list of points.
  approach?: string | string[];
  skills: string[];
  challenges?: string | string[];
  resolution?: string | string[];
  results?: string | string[];
  lessons?: string | string[];
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    position?: string;
    caption?: string;
  };
  paper?: string;
  paperLabel?: string;
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
    role: "CMU MRSD capstone, team of five, sponsored by Prof. Min Xu.",
    // Details below come from the team's November 2026 presentation.
    contributions: [
      "Presented the performance requirements, non-functional requirements and functional architecture.",
      "Helped build the presentation.",
      "Equal share of the stakeholder conversations for our needs analysis.",
    ],
    description:
      "Make lab automation practical for academic labs. Integrated workcells can cost over $1M, so researchers lose hours to grunt work like moving plates and loading instruments, and when an experiment fails, someone has to notice and step in. DARWIN aims to run wet-lab experiments autonomously in a closed loop.",
    tasks: [
      "Run one end-to-end experiment, a yeast growth workflow, to show the combined capabilities in a real lab.",
      "Build a modular library of skills, so new labware, stations and workflows can be added through configuration.",
      "Detect anomalies like contamination and misplaced or tilted well plates.",
      "Recover gracefully from failures, or alert the researcher.",
      "Work in both traditional and automated labs.",
    ],
    approach: [
      "Builds on the previous team's mobile manipulator: an xArm 6 with a parallel gripper on a swerve-drive base, with compute split across a desktop, a Jetson Thor running ROS 2, and a Jetson Xavier for perception.",
      "A researcher submits a plain-text protocol or config file. A language layer turns it into a structured file, and a symbolic planner compiles the plan into two behavior trees: one for navigation and pick-and-place, and one that drives the lab instruments (OT-2, shaker, plate reader) over their APIs.",
      "Markerless localization, fused with two LiDARs and an IMU in SLAM, replaces the previous team's AprilTags.",
      "Two ZED X cameras with oriented-box YOLO detect well plates, tubes and pipette racks. The arm switches to visual servoing at about 30 Hz and closes the gripper on force-sensor feedback.",
      "Every action is checked for placement, anomalies, grasp contact and container health. State is saved after each step, so on a failure DARWIN resumes from the last verified state instead of restarting the run.",
    ],
    challenges: [
      "Most academic labs can't afford fixed lab automation.",
      "Placing well plates within 2 mm without fiducial markers.",
      "Failures mid-experiment that waste time and materials if nobody notices.",
      "Working safely around people in a shared lab.",
    ],
    resolution: [
      "Chose a single arm on a mobile base in a system-level trade study of five options, with under $5,000 of added hardware and software.",
      "Planned: markerless localization plus wrist-camera visual servoing for precise placement.",
      "Planned: checks after every action, saved state for recovery, and alerts to the researcher (UI, remote channel and a red base light) when recovery fails.",
      "Requirement: speed limits near people (base up to 0.5 m/s, arm up to 250 mm/s) and an e-stop that responds within 0.5 s.",
    ],
    skills: [...selected[0].tags],
    featured: true,
    image: {
      ...images.lab,
      alt: selected[0].alt,
      position: selected[0].imagePosition,
    },
    results: [
      "Analysis phase. The team presented DARWIN's requirements, architecture and trade studies in November 2026.",
      "Targets: well plate position error under 2 mm, docking error under 10 cm, over an hour of autonomous operation, over 80% anomaly detection accuracy and labware handling success, and station-to-station transfers under 3 minutes.",
    ],
    // TODO: expand only after the author provides corrected What I'm Working On copy.
  },
  // TODO: space project details and any course repos/visuals to come from Yashasvi.
  ...projectsPage.courseProjects.map((c): Project => ({
    title: c.title,
    slug: c.slug,
    date: "2026",
    dateLabel: c.meta,
    summary: c.summary,
    description: c.description,
    role: c.role,
    tasks: c.tasks,
    approach: c.approach,
    contributions: c.contributions,
    challenges: c.challenges,
    resolution: c.resolution,
    results: c.results,
    lessons: c.lessons,
    skills: [...c.tags],
    image: c.image,
    paper: c.paper,
    paperLabel: c.paperLabel,
    repository: c.repository,
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
    // TODO: confirm individual contribution (the paper doesn't list author roles).
    // Details below come from the IJEECS 2025 paper.
    tasks: [
      "Recorded seven single-camera and ten multi-camera test scenarios with occlusions, crossovers and changes of direction.",
      "Extended DeepSORT with four new track states: Occluding, PersonOccluded, ObjectOccluded and Inactive.",
      "Paused appearance updates while tracks overlap, so one person's features don't overwrite another's.",
      "Shared track features between two cameras through a MySQL database.",
    ],
    approach:
      "YOLOv4 detects people in each frame, and DeepSORT tracks them with Kalman filter motion prediction and appearance features. When tracks overlap, only their motion is updated. When a person crosses a writing region near the cameras' shared view, their features are written to MySQL and read by the other camera, so they keep the same ID in both views.",
    skills: [...selected[1].tags, "YOLOv4", "Kalman filter"],
    paper: papers[0].href,
    featured: true,
    image: {
      ...images.tracking,
      alt: selected[1].alt,
      position: selected[1].imagePosition,
    },
    challenges: [
      "Identity switches when people hid each other or were hidden by objects.",
      "Keeping one ID for a person across two cameras with overlapping views.",
      "Sharing features between cameras fast enough to keep up with the video.",
    ],
    resolution: [
      "New track states and paused appearance updates during occlusion.",
      "A feature table per camera plus a shared table in MySQL for passing track data between cameras.",
      "Benchmarked MySQL and MongoDB read and write times over 10,000 frames before choosing the database.",
    ],
    results: [
      "The enhanced DeepSORT assigned correct IDs more often than the original in all seven single-camera videos.",
      "People kept consistent IDs across both cameras.",
      papers[0].venue,
    ],
    lessons: [
      "Bounding-box overlap alone can mislabel who is occluding whom, so better detection would reduce state errors.",
      "Cross-camera identity depends on people passing through the writing region before they leave a camera's view.",
    ],
  },
  {
    title: selected[2].title,
    slug: "decentralized-document-storage",
    date: "2024",
    dateLabel: selected[2].meta,
    summary: selected[2].summary,
    role: "System and authentication workflow validation.",
    contributions: ["Validated the system and its authentication workflow."],
    // Details below come from the IEEE CSITSS 2024 paper.
    tasks: [
      "A smart contract that mints an NFT for each user, with its file stored on IPFS.",
      "Sign-in with that NFT to a company document portal.",
      "Document upload through a smart contract, signed with MetaMask and recorded on the blockchain.",
    ],
    approach:
      "Built on Polygon, an Ethereum Layer 2, with Solidity smart contracts. A company mints NFTs for its people; they sign in with their NFT through MetaMask and upload documents, which are encrypted before upload and recorded on-chain as a tamper-proof audit trail.",
    challenges: [
      "Transactions on the Ethereum mainnet are expensive and slow.",
      "Keeping documents private on a public, decentralized network.",
    ],
    resolution: [
      "Used Polygon for cheaper, faster transactions while staying Ethereum compatible.",
      "Encrypted documents before upload and limited access to NFT holders.",
    ],
    skills: [...selected[2].tags, "Solidity", "Polygon", "MetaMask"],
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
