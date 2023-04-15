export type OpenSourceItem = {
  repo: string;
  prLink: string;
  description: string;
  index: number;
};

export const openSourceItems: OpenSourceItem[] = [
  {
    repo: "ng-web-apis/common",
    prLink: "https://github.com/ng-web-apis/common/pull/45",
    description:
      "Fixed a bug where any subscriber after the first would not get page visibility data until changing windows or tabs. This was an inconsistent behavior that was confusing to work with, and caused bugs in my work project at the time.",
    index: 0,
  },
];
