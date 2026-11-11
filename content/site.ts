// All copy for design C, as data. Components render from this file; edit text here, not in JSX.
// Writing rules from Yashasvi: no em dashes, keep it plain and human, handwriting/cursive nowhere.

export const site = {
  name: "Yashasvi Sorapalli",
  url: "https://ysorapalli.vercel.app",
  location: "Pittsburgh, PA",
  resume: "/resume",
  // Public one-page resume. Checked for personal contact details before publishing.
  resumePdf: "/data/Yashasvi-Sorapalli-Resume.pdf",
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
    "Hi, I'm Yashasvi, a graduate student in Robotic Systems Development at Carnegie Mellon! I'm moving into robotics from a purely computer science background, and I'm most interested in perception, planning, SLAM and deep learning. I studied computer science at R.V. College of Engineering in Bangalore, where I headed the Centre for Interdisciplinary Research in Quantum Information Technology and got my start in research. This fall, I also attended IROS 2026.",
    "Before making the switch, I spent two years as a software engineer at Visa and BT Group. At Visa, I built real-time Grafana dashboards that brought metrics and logs for VisaPay's core services into one view for on-call debugging, and helped move VisaPay in-house from an outside vendor. At BT, I automated database cleanup with AWS Lambda, cutting stale data by 80%, worked with stakeholders to grow adoption of an unused internal product 7x, and kept an internal analysis tool running through a company-wide restructuring.",
    "Outside the lab I sketch, swim, rollerskate and read, usually with indie music playing, and I'm happiest when it's raining.",
    "I'm looking for Summer 2027 robotics software engineering internships!",
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
    href: "https://www.researchgate.net/publication/391352244_Multi-camera_multi-person_tracking_with_DeepSORT_and_MySQL",
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

export const furtherReading = {
  coursework: {
    label: "Coursework, fall 2026",
    items: ["Introduction to Deep Learning", "Robot Autonomy", "Robot Mobility on Air, Land and Sea", "Systems Engineering and Project Management"],
  },
  plannedCoursework: {
    label: "Coursework, spring 2027 (planned)",
    items: ["Manipulation, Estimation, and Control", "Robot Localization and Mapping", "Introduction to Robotics Business", "MRSD Project I (capstone)"],
  },
  certificates: {
    label: "Certificates",
    items: [
      "Modern Robotics, Courses 1 and 2, Northwestern University (2025)",
      "Mathematics for Machine Learning, Imperial College London (2023)",
      "Accelerated Computer Science Fundamentals, University of Illinois Urbana-Champaign (2023)",
    ],
  },
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
  intro: "Robotics, research, and software projects.",
  githubHeading: "Fresh off the shelf",
  githubIntro: "My public repositories, newest push first.",
  githubPraise: { text: "Pushed to main. Respectfully.", who: "Her git history" },
  emptySlot: "Next push lands here automatically.",
  works: [
    {
      title: "DARWIN: Autonomous Robotic System for Wet Lab Experiments",
      meta: "CMU MRSD capstone · 2026-2028", ongoing: true,
      image: "/images/projects/darwin.jpg", imagePosition: "50% 50%",
      alt: "Line drawing of a robot arm on a mobile base reaching over a well plate, from the DARWIN title slide",
      summary: "DARWIN is my capstone team's robot arm on a mobile base that runs wet-lab experiments end to end, notices when something goes wrong, and recovers. Our first target is a full yeast growth experiment.",
      tags: ["ROS 2", "Manipulation", "Task planning", "Behavior trees", "SLAM", "Perception", "Anomaly detection", "Failure recovery", "Systems engineering"],
    },
    {
      title: "Multi-camera multi-person tracking with DeepSORT and MySQL",
      meta: "RVCE · 2022-2023 · IJEECS 2025", ongoing: false,
      image: "/images/projects/multicamera-tracking.jpg", imagePosition: "50% 0%",
      alt: "Accuracy chart and ID assignment frames comparing original and enhanced DeepSORT",
      summary: "Extended single-camera DeepSORT to a network of cameras, sharing track data through MySQL and keeping identities stable through occlusion. Built with a team of four.",
      tags: ["Python", "DeepSORT", "MySQL", "Computer vision"],
    },
    {
      title: "Decentralized document storage with NFT authentication",
      meta: "IEEE CSITSS · 2024", ongoing: false,
      image: "/images/projects/blockchain-document-storage.jpg", imagePosition: "50% 10%",
      alt: "Architecture diagram for document storage using blockchain, IPFS and smart contracts",
      summary: "A blockchain, NFT and IPFS based system for storing and authenticating documents. My main role was validating the system and its authentication workflow.",
      tags: ["Blockchain", "NFTs", "IPFS", "Smart contracts"],
    },
  ],
  // Course and side projects. `featured` ones join the main selection; planned ones list after it.
  courseProjects: [
    {
      title: "Stress-Testing Deep Learning Models for Drone Energy Prediction",
      slug: "drone-energy-models",
      meta: "CMU 11-785 Introduction to Deep Learning · Fall 2026",
      featured: true,
      summary: "Tested whether neural networks that predict a drone's power use still hold up in conditions they weren't trained on, like new payloads, speeds or wind. Also explored combining them with physics models to make them more reliable.",
      image: {
        src: "/images/projects/drone-energy-generalization.png",
        width: 1650,
        height: 570,
        alt: "Two bar charts of the extra power and energy prediction error for two TCN models when each flight condition is held out of training",
        caption: "Extra prediction error when each flight condition is left out of training. Bars near zero mean the model generalizes well. Wind and new routes stand out.",
      },
      description: "Find out whether drone energy models can be trusted outside their training conditions, which matters for planning flights on a limited battery.",
      role: "Course project, team of four.",
      tasks: [
        "Rebuilt a published drone energy model in PyTorch.",
        "Designed tests that hold out specific flight conditions.",
        "Investigated why the models struggle in wind.",
        "Built a hybrid physics and neural network model.",
      ],
      approach: "Trained neural networks on real drone flight data, then compared their accuracy on unseen conditions against fair, size-matched baselines. Added a physics model so the network only has to learn what physics misses.",
      contributions: [
        "Designed and ran the experiment showing whether the models' errors came from wind or just from different flight days.",
        "Built the physics and neural network hybrid model and its experiment setup.",
        "Found that a properly fitted physics model performs much better than previously reported.",
        "Ran large-scale model training and analysis.",
      ],
      challenges: "Wind data was tangled up with flight dates. Some models trained unreliably. Compute was limited.",
      resolution: "Designed a matched comparison to separate wind from date effects. Repeated runs to measure reliability. Moved heavy training to a GPU workstation.",
      results: [
        "Models generalize well to new payloads, speeds and altitudes, but lose accuracy in unseen wind.",
        "Confirmed the drop comes from the wind itself, not from flying on a different day.",
        "Hybrid model built; results pending.",
      ],
      lessons: [
        "Standard random testing can overstate how well a model generalizes.",
        "Careful experiment design changes the conclusions.",
        "Simple physics is a stronger baseline than expected.",
      ],
      tags: ["Python", "PyTorch", "NumPy", "pandas", "SciPy", "Git", "Linux", "Experimental design", "Model evaluation", "Physics-informed ML"],
      paper: "https://arxiv.org/abs/2105.15189",
      paperLabel: "Reference paper: Choudhry et al., ICRA 2021",
      repository: "https://github.com/wouyang26/idl_project_38",
    },
    {
      title: "F1TENTH Autonomous Racing",
      slug: "f1tenth-racing",
      meta: "CMU 16-665 Robot Mobility on Air, Land and Sea · Fall 2026",
      featured: true,
      summary: "The autonomous driving part of CMU's Robot Mobility course, where teams program a 1/10 scale F1TENTH race car to drive itself, first in simulation and then on the real car.",
      image: {
        src: "/images/projects/f1tenth-car.jpg",
        width: 1400,
        height: 1392,
        alt: "The team's 1/10 scale F1TENTH car on a lab bench, with its compute board, motor controller and LiDAR mounted on the chassis",
        position: "50% 55%",
        caption: "Our team's F1TENTH car in the lab.",
      },
      description: "Learn and implement core autonomous driving algorithms in simulation and on a real mini F1 car, and have the team car complete laps around a track while avoiding obstacles and other cars.",
      role: "Course team project.",
      tasks: [
        "RRT path planning.",
        "Pure Pursuit waypoint tracking.",
        "Follow the Gap obstacle avoidance.",
        "Disparity extension for safety.",
      ],
      approach: [
        "Deployed RRT* to plan paths around obstacles, with Pure Pursuit following the planned path.",
        "Next improvement: combine Pure Pursuit and Follow the Gap, so the car follows a map's waypoints until it detects an obstacle and then switches to Follow the Gap.",
      ],
      contributions: [
        "Ran my own simulations of the algorithms in RViz2.",
        "Equal (50%) share of the sim-to-real transfer to the real car.",
      ],
      challenges: [
        "Sim-to-real transfer was tricky at first: the car couldn't localize in the real world.",
        "Tuning the PID controller was tricky at first.",
      ],
      resolution: [
        "Figured out the provided map was wrong. With that fixed, the car estimated its pose accurately and localized.",
        "Ran many trials and adjusted the gains step by step based on the car's response.",
      ],
      results: [
        "The car completed multiple laps without crashing and avoided other cars on the track, stopping before it could collide with them.",
        "Raced in an autonomous-driving race in the NSH Atrium at Carnegie Mellon in November 2026.",
      ],
      lessons: [
        "A much better understanding of autonomous driving algorithms and how to implement them.",
        "When something works in simulation but not on the car, check the inputs (like the map) before the algorithm.",
        "Tuning on real hardware takes many small, careful iterations.",
      ],
      tags: ["ROS 2", "C++", "Python", "RViz2", "LiDAR", "Particle filter localization", "PID control", "Pure Pursuit", "RRT*", "Follow the Gap"],
    },
    {
      title: "Etch A Sketch using a Franka Arm",
      slug: "franka-etch-a-sketch",
      meta: "CMU 16-662 Robot Autonomy · Fall 2026",
      featured: true,
      summary: "Commanding a single Franka robotic arm to draw an image we provide on an Etch A Sketch.",
      image: {
        src: "/images/projects/franka-etch-a-sketch.jpg",
        width: 1536,
        height: 1024,
        alt: "Concept image of a Franka Emika arm turning the knob of a red Etch A Sketch with a house drawn on its screen",
        position: "60% 50%",
        caption: "Concept image of the goal. The project hasn't started yet.",
      },
      description: "The arm alternates between the Etch A Sketch's knobs to recreate a design, then resets the board by shaking it clean. The project demonstrates basic manipulation techniques on a robot arm.",
      tasks: [
        "Convert an image into a drawing an Etch A Sketch can make.",
        "Plan the flow of tasks and the key waypoints for the arm.",
        "Execute the tasks to produce the final drawing.",
      ],
      approach: [
        "This is the planned approach; work hasn't started yet.",
        "Turn the image into a path of horizontal and vertical strokes, since each knob moves the stylus along one axis.",
        "Convert each stroke into a knob and an amount to turn it, then plan grasp and turning waypoints for the arm.",
        "Check the full sequence in MuJoCo simulation before running it on the real arm with frankapy.",
        "Reset by lifting the board and shaking it.",
      ],
      results: "Upcoming project.",
      tags: ["Python", "Franka Panda", "frankapy", "MuJoCo", "Inverse kinematics", "Motion planning", "Grasping", "Image processing"],
    },
    {
      title: "Space robotics side project",
      slug: "space-robotics",
      meta: "Side project · Starting soon",
      featured: false,
      summary: "A space robotics side project I'm starting soon. More once there's something to show.",
      results: "Planned.",
      tags: [] as string[],
    },
  ],
  // Repos to hide from the shelf even if public.
  hideRepos: ["ysorapalli.com"] as string[],
  // Repos listed under "Hackathon projects" instead of the main project list, with the event.
  hackathonRepos: { "stroke-detection": "HackCMU 2026" } as Record<string, string>,
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
  lab: { src: "/images/projects/darwin.jpg", width: 1400, height: 875 },
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

