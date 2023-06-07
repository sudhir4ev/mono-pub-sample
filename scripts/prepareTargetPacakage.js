const path = require("path");
const assert = require("assert");
const fs = require("fs");

async function prepareTargetPackage(packageName, options) {
  const { workspaceInfo, rootPkgJson } = options;
  const targetPackagePath = path.resolve(
    workspaceInfo.location,
    "package.json"
  );

  assert(packageName, "No package path specified");
  assert(
    fs.existsSync(targetPackagePath),
    `\`package.json\` not found. \npath: \`${targetPackagePath}\`\n`
  );

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
}

module.exports = prepareTargetPackage;
