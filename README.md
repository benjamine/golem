Golem
=====

automatically provisioned virtual machine to run docker containers and headless web automation.

- includes [docker](http://www.docker.com/) inside an Ubuntu VM
- ready for headless web automation using real Firefox and Chrome (using [Xfvb](http://en.wikipedia.org/wiki/Xvfb))
- provisioned with ruby stack (ruby, gem, bundler, cucumber, rake)
- powered by [Vagrant](http://www.vagrantup.com/), [Puppet](https://puppetlabs.com/), [VirtualBox](http://www.virtualbox.org/) and [Ubuntu](http://www.ubuntu.com/) 14.04 LTS

Curl Install
--------

``` sh
curl -s http://benjamine.github.io/golem/curl-install/install.sh | sh
```
This will clone you a golem (on ```~/golem```) and take care of all requirements.

***Note***: this requires ```curl``` and ```sh```. On windows the easiest way to get that is to install [git for windows](http://msysgit.github.io/) and check the "Unix tools on PATH" option during installation.

Requirements
--------

- Windows, Mac OS X, Linux, or Solaris
- [vagrant](http://www.vagrantup.com/)
- [virtualbox](http://www.virtualbox.org/)

Manual Install
-----

``` sh
git clone https://github.com/benjamine/golem.git
cd golem
make
# this will take some time! (first time it will download an ubuntu image
# and provision it with all the required software)
```

Updates
-----

You can keep golem up-to-date by running:
``` sh
# download updates, reload and re-provision will happen if necessary
golem update
```

Usage
-----

Once golem is ready, you can start running commands on your golem machine

```
# Summon your Golem! (in case the vm is down)
golem summon

golem do echo \$OSTYPE
# prints "linux-gnu" (the Ubuntu running in the VM)

# golem will run the command (after "do" word) in the vm
# first time you run "golem do" on a directory, a synced folder is created to
# mirror cwd on guest vm, then commands are executed in that guest folder
golem do ls
# will list the files in current host folder, shared into the VM
```
or you can just open an ssh session starting a the synced folder with:
``` sh
golem do
```

### Docker
you can run docker commands with:
``` sh
golem docker run ubuntu echo "hi, from docker"
# note: "golem docker" is just a shortcut to "golem do sudo docker"
```
### Port Forwarding
In some cases you want to forward ports in the VM to your host machine (eg. from you docker containers)
```
# expose port 80 in the VM as 8080 in your host machine
golem expose 80 8080
```
### Browser automation
You can try the included cucumber example:

``` sh
cd ~/golem/example

golem do sudo bundle install
golem do cucumber

# now using chrome
golem do BROWSER=chrome cucumber
```
