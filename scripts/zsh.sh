#!/bin/sh

set -e

if ! which zsh >/dev/null; then
  echo installing zsh…
  apt-get --yes install zsh
fi
echo zsh installed

# setting up oh my zsh
if [ ! -d ~/.oh-my-zsh/ ]; then
  echo 'installing oh my zsh'
  curl -L http://install.ohmyz.sh | sudo sh

  if ! grep -q LC_INITIALDIR /home/vagrant/.zshrc
  then
      echo 'setting cd initial dir at .zshrc'
      echo '# Take ssh initial dir from client var' >> .zshrc
      echo 'export INITIALDIR=$LC_INITIALDIR' >> .zshrc
      echo 'if [ -n $INITIALDIR ]; then cd "${INITIALDIR#* }";fi' >> .zshrc
  fi

fi
echo oh-my-zsh installed
