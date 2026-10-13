// All copy for design C, as data. Components render from this file; edit text here, not in JSX.
// Writing rules from Yashasvi: no em dashes, keep it plain and human, handwriting/cursive nowhere.

export const site = {
  name: "Yashasvi Sorapalli",
  url: "https://ysorapalli.vercel.app",
  email: "ysorapalli@gmail.com",
  location: "Pittsburgh, PA",
  resume: "/data/YashasviSorapalli-Resume.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/yashasvi-s/",
    github: "https://github.com/ysorapalli",
    githubUser: "ysorapalli",
    scholar: "https://scholar.google.com/citations?user=qdXeEYEAAAAJ&hl=en",
  },
  description:
    "Yashasvi Sorapalli is a robotics graduate student at Carnegie Mellon University (MRSD), looking for Summer 2027 software engineering internships in robotics.",
} as const;

export const titlePage = {
  kicker: "A portfolio",
  subtitle: "Robots, research, and figuring out what I want to build next.",
  imprint: "Carnegie Mellon University · Pittsburgh · 2026",
  armCaption: "click and drag in the pad. it'll sketch for you",
};

export const dedication = {
  kicker: "To",
  line: "the recruiters who made it past the title page.",
  body: "I'm looking for Summer 2027 software engineering internships in robotics. If that's you, you can read through the pages or skip straight to the last chapter.",
  cta: { label: "Skip to Correspondence", href: "#correspondence" },
};

// Order = reading order = route rail order. `short` is the label on the rails/top bar.
export const chapters = [
  { id: "prologue", title: "Prologue", short: "Prologue", note: "who I am, briefly" },
  { id: "work", title: "What I'm working on", short: "Working on", note: "a lab robot that runs its own experiments" },
  { id: "papers", title: "Published works", short: "Papers", note: "two papers" },
  { id: "before", title: "Before all this", short: "Before", note: "Bangalore, BT, Visa, CMU" },
  { id: "further", title: "Further reading", short: "Reading", note: "coursework and certificates" },
  { id: "index", title: "Index of tools", short: "Tools", note: "what I build with" },
  { id: "correspondence", title: "Correspondence", short: "Contact", note: "how to reach me" },
] as const;

// One review per chapter, same order as `chapters`. Always shown with five full stars.
export const praise = [
  { text: "Best read on a rainy day.", who: "Pittsburgh weather" },
  { text: "Noticed when things went wrong, then fixed them. Would malfunction for her again.", who: "The lab robot, probably" },
  { text: "Kept track of everyone, even through occlusion.", who: "A DeepSORT tracker" },
  { text: "A real page-turner. I logged every single page.", who: "Her Grafana dashboards" },
  { text: "Grew on me.", who: "Bacteria on a petri dish, probably" },
  { text: "Compiled on the first try. Mostly.", who: "Her C++ code" },
  { text: "Would connect again.", who: "Her LinkedIn connect button" },
];

export const contentsNote = "Start anywhere, it's not that kind of book. The route in the margin will keep track of where you are.";

export const prologue = {
  paragraphs: [
    "Hi, I'm Yashasvi, a graduate student in Robotic Systems Development at Carnegie Mellon. I'm still exploring different corners of robotics to figure out where I fit. Planning and decision making are what I'm most curious about and hope to work on next; for now I'm learning a bit of everything, perception included.",
    "Before CMU I spent two years as a software engineer at Visa and BT Group, building dashboards, automating cleanup jobs, and keeping systems running for the people who depended on them.",
    "Outside the lab I sketch, swim, rollerskate and read, usually with indie music playing, and happiest when it's raining.",
  ],
  plate: { src: "/images/YashasviSorapalliPic-optimized.jpg", alt: "Portrait of Yashasvi Sorapalli", caption: "Plate · The author, Pittsburgh" },
};

export const work = {
  status: "Status: ongoing",
  meta: "CMU MRSD · 2026-2028",
  lead: "A lab robot that runs its own experiments, and notices when they go wrong.",
  paragraphs: [
    "At Carnegie Mellon, my team is building an autonomous robotic system for running closed-loop lab experiments. The goal is cell cultures, but they're hard to train on, so we're starting with bacterial growth as a baseline that behaves in a similar way.",
    "The robot has to see the bench, plan a sequence of steps, handle samples, and log what happened. Right now the project's focus is anomaly detection and failure recovery: noticing that something went wrong, and deciding what to do about it.",
  ],
  figure: { src: "/images/projects/autonomous-laboratory.jpg", alt: "System diagram: task input, perception, planning, grasping, transport, logging and feedback around a robot arm", caption: "Fig. · The loop, from a task request to a logged result" },
  closing: "If it works, the stretch goal is to run the full loop on real cell culture experiments, and to look inside the vision-language-action models that drive it.",
  more: { label: "See all projects, including GitHub →", href: "/projects" },
};

export const papers = [
  {
    title: "Multi-camera Multi-person Tracking with DeepSORT and MySQL",
    venue: "Indonesian Journal of Electrical Engineering and Computer Science · vol. 38, no. 2 · 2025",
    summary: "Extended single-camera DeepSORT to a network of cameras, sharing track data through MySQL and keeping identities stable through occlusion. It started as an undergrad project, built with a team of four.",
    href: "https://ijeecs.iaescore.com/index.php/IJEECS/article/view/37989",
    doi: "10.11591/ijeecs.v38.i2.pp997-1009",
  },
  {
    title: "Decentralized Document Storage with NFT Authentication Using Blockchain Technology",
    venue: "IEEE CSITSS · 2024",
    summary: "A blockchain, NFT and IPFS based system for storing and authenticating documents. My main role was validating the system and its authentication workflow.",
    href: "https://doi.org/10.1109/CSITSS64042.2024.10816830",
    doi: "10.1109/CSITSS64042.2024.10816830",
  },
];

// Timeline. The second-to-last node is "you are here" (filled); the last is dashed (future).
export const history = [
  { years: "2020-24", text: "I studied computer science at R.V. College of Engineering in Bangalore, where I also headed the Centre for Interdisciplinary Research in Quantum Information Technology and started doing research." },
  { years: "2024-25", text: "At BT Group, first as an intern and then full time, I automated database cleanup with AWS Lambda and helped bring an unused internal product back into use." },
  { years: "2025-26", text: "At Visa, I helped onboard a cross-border payments project and built monitoring dashboards in Grafana, so problems were easier to spot and debug." },
  { years: "2026-now", text: "I came to Carnegie Mellon for the M.S. in Robotic Systems Development. Recently, I attended IROS 2026." },
  { years: "Next", text: "A Summer 2027 software engineering internship in robotics. Still planning the route." },
];

export const furtherReading = {
  coursework: { label: "Coursework, fall 2026", text: "Introduction to Deep Learning. Robot Autonomy. Robot Mobility on Air, Land and Sea." },
  certificates: { label: "Certificates", text: "Modern Robotics, Courses 1 and 2, Northwestern University (2025). Mathematics for Machine Learning, Imperial College London (2023). Accelerated Computer Science Fundamentals, University of Illinois Urbana-Champaign (2023)." },
};

export const tools = ["C++", "Deep learning", "Java", "LabVIEW", "Linux", "MATLAB", "Python", "PyTorch", "ROS 2", "Spring Boot", "SQL / MySQL"];

export const correspondence = {
  body: "If you're hiring for summer 2027, or just want to talk about robots, books, or the weather, write to me. I'd love to hear from you.",
  greetings: [
    { lang: "en", text: "hello" },
    { lang: "hi", text: "नमस्ते" },
    { lang: "te", text: "నమస్కారం" },
    { lang: "kn", text: "ನಮಸ್ಕಾರ" },
    { lang: "fr", text: "bonjour*" },
  ],
  greetingsNote: "Any of these work. *French is a work in progress.",
};

export const colophon = {
  text: "Set in Geist and Geist Mono. Written in Pittsburgh, ideally on a rainy day.",
  reading: { title: "Exhalation", by: "Ted Chiang" },
  onRepeat: { title: "Arz Kiya Hai", by: "Anuv Jain" },
};

// /projects
export const projectsPage = {
  title: "Collected works",
  intro: "Everything I've built or am building. The shelf at the bottom keeps itself up to date from my GitHub.",
  githubHeading: "Fresh off the shelf",
  githubIntro: "My public repositories, newest push first.",
  githubPraise: { text: "Pushed to main. Respectfully.", who: "Her git history" },
  emptySlot: "Next push lands here automatically.",
  works: [
    {
      title: "Autonomous robotic system for closed-loop lab experiments",
      meta: "CMU MRSD · 2026-2028", ongoing: true,
      image: "/images/projects/autonomous-laboratory.jpg", imagePosition: "50% 20%",
      alt: "System diagram of the autonomous lab robot workflow",
      summary: "A lab robot that runs experiments end to end. The goal is cell cultures; for now we use bacterial growth as a baseline. Current focus: anomaly detection and failure recovery.",
      tags: ["Manipulation", "Task planning", "Anomaly detection", "Failure recovery", "Perception"],
      cta: { label: "Read the chapter →", href: "/#work" },
    },
    {
      title: "Multi-camera multi-person tracking with DeepSORT and MySQL",
      meta: "RVCE · 2022-2023 · IJEECS 2025", ongoing: false,
      image: "/images/projects/multicamera-tracking.jpg", imagePosition: "50% 0%",
      alt: "Accuracy chart and ID assignment frames comparing original and enhanced DeepSORT",
      summary: "Extended single-camera DeepSORT to a network of cameras, sharing track data through MySQL and keeping identities stable through occlusion. Built with a team of four.",
      tags: ["Python", "DeepSORT", "MySQL", "Computer vision"],
      cta: { label: "Read the paper ↗", href: "https://ijeecs.iaescore.com/index.php/IJEECS/article/view/37989" },
    },
    {
      title: "Decentralized document storage with NFT authentication",
      meta: "IEEE CSITSS · 2024", ongoing: false,
      image: "/images/projects/blockchain-document-storage.jpg", imagePosition: "50% 10%",
      alt: "Architecture diagram for document storage using blockchain, IPFS and smart contracts",
      summary: "A blockchain, NFT and IPFS based system for storing and authenticating documents. My main role was validating the system and its authentication workflow.",
      tags: ["Blockchain", "NFTs", "IPFS", "Smart contracts"],
      cta: { label: "Read the paper ↗", href: "https://doi.org/10.1109/CSITSS64042.2024.10816830" },
    },
  ],
  // Repos to hide from the shelf even if public.
  hideRepos: [] as string[],
  hideForks: false,
  // Extra line shown under a repo's description.
  repoNotes: {
    "stroke-detection": "We built this together, side by side on the same laptop (pair programming!).",
  } as Record<string, string>,
  // Last known list, used only if the GitHub API can't be reached at build/revalidate time.
  githubSnapshot: {
    pulledAt: "2026-10-12T00:00:00Z",
    repos: [
      { name: "ysorapalli.com", description: "Portfolio website", language: "TypeScript", stars: 0, fork: false, pushedAt: "2026-09-14T05:27:03Z", url: "https://github.com/ysorapalli/ysorapalli.com" },
      { name: "stroke-detection", description: "Integration of IR scans during FaceID to detect early signs of stroke based on a personal baseline of features.", language: null, stars: 0, fork: true, pushedAt: "2026-09-12T19:44:32Z", url: "https://github.com/ysorapalli/stroke-detection" },
    ],
  },
};

export const images = {
  portrait: { src: "/images/YashasviSorapalliPic-optimized.jpg", width: 1774, height: 1774 },
  lab: { src: "/images/projects/autonomous-laboratory.jpg", width: 1298, height: 745 },
  tracking: { src: "/images/projects/multicamera-tracking.jpg", width: 1302, height: 893 },
  blockchain: { src: "/images/projects/blockchain-document-storage.jpg", width: 969, height: 836 },
} as const;

// Message form in Correspondence (sent via app/api/contact).
export const contactForm = {
  heading: "Or send a note from here",
  topics: ["Roles & internships", "Research", "Coffee chat", "Just saying hi"],
  defaultTopic: "Roles & internships",
  messagePlaceholder: "Hi Yashasvi, I saw your work on…",
  sent: "Thanks! Your note is on its way. I'll reply shortly.",
};

