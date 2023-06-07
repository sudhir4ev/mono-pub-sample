#!/bin/sh
set -e

PACKAGE_NAME=$1

node scripts/prepare-release.js ${PACKAGE_NAME}
node scripts/release.js ${PACKAGE_NAME}
