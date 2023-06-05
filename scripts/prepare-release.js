#!/usr/bin/env node
const assert = require("assert");
const path = require("path");
const fs = require("fs");
const utils = require("./utils");

const [, , targetPackage] = process.argv;

(async () => {

  const workspaces = await utils.workspacesInfo();
  const workspaceInfo = workspaces[targetPackage]
  const targetPackagePath = path.resolve(workspaceInfo.location, "package.json");

  assert(targetPackage, "No package path specified");
  assert(
    fs.existsSync(targetPackagePath),
    `\`package.json\` not found. \npath: \`${targetPackagePath}\`\n`
  );

  const rootPkgJson = require("../package.json");
  const targetPkgJson = require(targetPackagePath);

  const newTargetPkgJson = mergePackageJson(targetPkgJson, rootPkgJson);

  fs.writeFileSync(
    targetPackagePath,
    JSON.stringify(newTargetPkgJson, null, 2)
  );

  function mergePackageJson(target, source) {
    // publishConfig
    const publishConfig = {
      ...target.publishConfig,
      registry: source.publishConfig.registry,
    };

    // config.commitizen
    const config = {
      ...target.config,
      commitizen: source.config.commitizen,
    };

    // scripts.release
    const scripts = {
      ...target.scripts,
      release: ``,
    };

    return {
      ...target,
      publishConfig,
      config,
      scripts,
    };
  }
})();
