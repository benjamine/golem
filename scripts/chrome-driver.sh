#!/bin/sh

set -e

if ! grep -q linux/chrome/deb /etc/apt/sources.list
then
  echo 'adding google chrome apt list...'

  # Add Google public key to apt
  wget -q -O - "https://dl-ssl.google.com/linux/linux_signing_key.pub" | sudo apt-key add -

  # Add Google to the apt-get source list
  echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list

  # refresh apt-get list
  apt-get update
fi

if [ -e "/usr/local/bin/chromedriver" ]; then
  echo 'chromedriver is present.'
else
  echo 'installing chromedriver...'

  # we need unzip
  apt-get -y install unzip

  # download and copy chromeDriver to /usr/local/bin
  cd /tmp

  wget -nv "http://chromedriver.storage.googleapis.com/2.9/chromedriver_linux64.zip"
  unzip chromedriver_linux64.zip
  mv chromedriver /usr/local/bin
  chmod a+rx /usr/local/bin/chromedriver

  echo 'chromedriver installed.'
fi
