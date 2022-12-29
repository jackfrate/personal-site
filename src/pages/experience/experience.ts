export type JobItem = {
  companyName: string;
  startDate: string;
  endDate: string;
  jobTitle: string;
  jobPoints: string[];
  // use index to sort by date, date objects might be yikes here
  index: number;
};

export const jobItems: JobItem[] = [
  {
    jobTitle: "Software Engineer",
    companyName: "Showpad",
    startDate: "08/2021",
    endDate: "12/2022",
    jobPoints: [
      "Rapidly iterated on a web based video recording & editing solution, making it best in class. Notable features are virtual backgrounds (via TensorFlow + WebGL), video trimming, thumbnail editing, and streaming uploads while recording.",
      "Worked in a task force to re-design the platform’s learning solution, focusing on architecture for upload & recording flows.",
      "Gave frequent demos to stakeholders in department wide meetings.",
      "Received Gold Spot Award for engineering growth and performance.",
      "Angular, Typescript, RxJS, Webpack, Playwright, Docker, Kubernetes, Bash.",
    ],
    index: 0,
  },
  {
    jobTitle: "Engineering Lead",
    companyName: "Cyber Surfer, LLC",
    startDate: "06/2020",
    endDate: "06/2021",
    jobPoints: [
      "Led implementation of the world’s first hoverboard controller for VR.",
      "Collaborated on architecture in C#/Unity to optimize performance for the game to board communication.",
      "Implemented and led team processes for code best practices, CI pipelines, and Git workflows.",
      "Led creation of a Kanban/SCRUM Ceremony workflow for an interdisciplinary team of programmers, artists, industrial designers, and game designers.",
      "C#, Python, Gitlab CI, Unity, Oculus VR.",
    ],
    index: 1,
  },
  {
    jobTitle: "Software Engineer Co-Op",
    companyName: "Datto",
    startDate: "01/2020 ",
    endDate: "05/2020",
    jobPoints: [
      "Worked with the core product team, maintaining flagship device image recovery software for thousands of customers.",
      "Reworked a monolithic PHP application to a REST based architecture, removing tech debt so features could ship faster.",
      "Fixed a key storage bug that impacted almost all customers.",
      "PHP, JavaScript, Bash, Symfony, JQuery, Scrum.",
    ],
    index: 2,
  },
  {
    jobTitle: "Software Engineer Co-Op",
    companyName: "Solu Technology Partners",
    startDate: "01/2019",
    endDate: "08/2019",
    jobPoints: [
      "Maintained front & back end microservices for an internal personnel management app.",
      "Independently designed and implemented Google Calendar integration, helping managers coordinate teams.",
      "Angular, TypeScript, Java, Bash, Spring Boot, AWS, Jenkins.",
    ],
    index: 3,
  },
];
