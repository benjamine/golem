Golem
=====

automatically provisioned virtual machine for headless web automation.

- ready for headless web automation using real Firefox and Chrome (using [Xfvb](http://en.wikipedia.org/wiki/Xvfb))
- provisioned with ruby stack (ruby, gem, bundler, cucumber, rake)
- powered by [Vagrant](http://www.vagrantup.com/), [Puppet](https://puppetlabs.com/), [VirtualBox](http://www.virtualbox.org/) and [Ubuntu](http://www.ubuntu.com/) 14.04 LTS
- includes [docker](http://www.docker.com/)

Curl-install
--------

``` sh
curl -s http://benjamine.github.io/golem/curl-install/install.sh | sh
```
This will clone you a golem (on ```~/golem```) and take care of all requirements.

Requirements
--------

- Windows, Mac OS X, Linux, or Solaris
- [vagrant](http://www.vagrantup.com/)
- [virtualbox](http://www.virtualbox.org/)

Usage
-----

``` sh

# Summon your Golem!
git clone https://github.com/benjamine/golem.git
cd golem
make

# this will take some time! (first time it will download an ubuntu image and provision it with all the required software)

# once ready, you can start running tests on your golem machine
# you can try the included example, or any project in your machine

cd example

# golem will run the command (after "do" word) in the vm
# first time you run "golem do" on a directory, a synced folder is created to mirror cwd on guest vm, then commands are executed in that guest folder
golem do sudo bundle install
golem do cucumber

# now using chrome
golem do BROWSER=chrome cucumber

# or open an ssh session in the synced folder
golem do

# port forwarding (expose port 80 in the VM as 8080 in your host machine)
golem expose 80 8080

```
