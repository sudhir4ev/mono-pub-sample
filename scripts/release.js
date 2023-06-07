#!/usr/bin/env node

const { exec } = require("child_process");
const utils = require("./utils");
const assert = require("assert");
const path = require("path");

const [, , packageName] = process.argv;

assert(packageName, "No package name provided");

(async () => {
  const workspaces = await utils.workspacesInfo();
  const workspaceInfo = workspaces[packageName];

  const packagePath = path.resolve(workspaceInfo.location);

  await utils.runTask(`Running release for \`${packageName}\``, async () => {
    console.log(`path: \`${workspaceInfo.location}\``);
    console.log(`semantic-release`);

    const releaseProcess = exec(
      `cd ${packagePath} && semantic-release --colors`
    );
    releaseProcess.stdout.pipe(process.stdout);
    releaseProcess.stderr.pipe(process.stderr);
  });
})();
