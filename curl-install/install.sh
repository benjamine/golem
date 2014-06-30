#!/bin/bash

set -e

if which golem >/dev/null; then
  echo golem is already installed
  exit 0
fi

if [[ "$OSTYPE" == "darwin"* ]]; then

  # on OSX use brew (and cask) to install dependencies

  if ! which brew >/dev/null; then
    echo installing brew…
    ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
  fi

  echo brew update…
  brew update

  if [ ! -d /opt/homebrew-cask/ ]; then
    # set homebrew cask options
    export HOMEBREW_CASK_OPTS="--appdir=/Applications"
    brew tap caskroom/cask
    brew install brew-cask
  fi
  if ! which git >/dev/null; then
    brew install git
  fi
  if ! which VBoxManage >/dev/null; then
    brew cask install virtualbox
  fi
  if ! which vagrant >/dev/null; then
    brew cask install vagrant
  fi
else
  # other OSes, just point to a download url
  if ! which git >/dev/null; then
    echo git not found, please install it first:
    echo    http://git-scm.com/downloads
    exit 1
  fi
  if ! which VBoxManage >/dev/null; then
    echo VirtualBox not found, please install it first:
    echo    https://www.virtualbox.org
    exit 1
  fi
  if ! which vagrant >/dev/null; then
    echo vagrant not found, please install it first:
    echo    http://www.vagrantup.com/
    exit 1
  fi
fi

cd ~
git clone https://github.com/benjamine/golem.git
cd golem
make

golem summon
