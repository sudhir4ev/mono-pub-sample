const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

async function workspacesInfo() {
  const workspacesOutput = await exec("yarn workspaces info --json");

  const lines = workspacesOutput.stdout.split(/\n/);
  const workspacesStr = lines.slice(1, lines.length - 2).join("");

  return JSON.parse(workspacesStr);
}

module.exports = {
  workspacesInfo,
};
