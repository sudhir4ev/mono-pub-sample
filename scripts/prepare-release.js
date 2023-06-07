#!/usr/bin/env node

const utils = require("./utils");
const rootPkgJson = require("../package.json");
const prepareTargetPackage = require("./prepareTargetPacakage");

const [, , packageName] = process.argv;

utils.runTask("Configure package.json for release", () =>
  prepareTargetPackage(rootPkgJson, packageName)
);
