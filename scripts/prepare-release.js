#!/usr/bin/env node

const utils = require("./utils");
const rootPkgJson = require("../package.json");
const prepareTargetPackage = require("./prepareTargetPacakage");
const prepareReleaseConfig = require("./prepareReleaseConfig");

const [, , packageName] = process.argv;

(async () => {
  const workspaces = await utils.workspacesInfo();
  const workspaceInfo = workspaces[packageName];

  await Promise.all([
    // utils.runTask(`Configure package.json for \`${packageName}\``, () =>
    //   prepareTargetPackage(packageName, { rootPkgJson, workspaceInfo })
    // ),
    utils.runTask(`Configure release.config for \`${packageName}\``, () =>
        prepareReleaseConfig(packageName, { workspaceInfo })
    ),
  ]);
})();
