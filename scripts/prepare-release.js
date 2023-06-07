#!/usr/bin/env node

const utils = require("./utils");
const rootPkgJson = require("../package.json");
const prepareTargetPackage = require("./prepareTargetPackage");
const assert = require("assert");

const [, , packageName] = process.argv;

assert(packageName, "No package name provided");

(async () => {
  const workspaces = await utils.workspacesInfo();
  const workspaceInfo = workspaces[packageName];

  assert(workspaceInfo, `No workspace with name \`${packageName}\` found`);

  await utils.runTask(`Configure package.json for \`${packageName}\``, () =>
    prepareTargetPackage(packageName, { rootPkgJson, workspaceInfo })
  );
})();
