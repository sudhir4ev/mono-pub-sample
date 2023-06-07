const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

async function workspacesInfo() {
  const workspacesOutput = (await exec("yarn workspaces info --json")).stdout;
  const workspacesStr = workspacesOutput.substring(
      workspacesOutput.indexOf('{'),
      workspacesOutput.lastIndexOf('}')+1
  )

  return JSON.parse(workspacesStr);
}

async function runTask(taskLog, taskFn) {
  console.log(`>> ${taskLog}`);
  return taskFn()
}

module.exports = {
  workspacesInfo,
  runTask
};

