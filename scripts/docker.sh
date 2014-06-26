#!/bin/sh

set -e

if ! which docker >/dev/null; then
  echo installing docker…
  curl -s https://get.docker.io/ubuntu/ | sudo sh
fi
echo docker installed
