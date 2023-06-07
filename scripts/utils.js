const { promisify } = require("util");
const execPromise = promisify(require("child_process").exec);

async function workspacesInfo() {
  const workspacesOutput = (await execPromise("yarn workspaces info --json")).stdout;
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
  runTask,
};

