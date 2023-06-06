const packageRoot = "packages/a1"

module.exports = {
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",

        releaseRules: [
          { type: "docs", scope: "README", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "style", release: "patch" },
          { type: "fix", release: "patch" },
        ],

        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
      },
    ],
    [
      "@semantic-release/npm",
      {
        pkgRoot: `${packageRoot}`,
        commitPaths: [`${packageRoot}/*`]
      },
    ],
    // "@semantic-release/release-notes-generator"
  ],
};
