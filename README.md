Golem
=====

Run apps in automatically provisioned virtual machines or docker containers.

- includes [docker](http://www.docker.com/) (inside an Ubuntu VM)
- powered by [Vagrant](http://www.vagrantup.com/), [VirtualBox](http://www.virtualbox.org/) and [Ubuntu](http://www.ubuntu.com/) 14.04 LTS
- takes care of folder sync and port forwarding

Requirements
--------

- Windows, Mac OS X, Linux, or Solaris
- [vagrant](http://www.vagrantup.com/)
- [virtualbox](http://www.virtualbox.org/)

Note: ```golem init``` will check these requirements for you (and on OSX it will try to install them using `brew` and `brew cask`).

Install
-----
``` sh
npm i -g golem
```
now you can create a global golem for your user:
``` sh
golem init --global
```
or create one for the current folder (```./.golem```):
``` sh
golem init
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

Once a golem is ready, you can start running commands on the golem virtual machine

``` sh
# Summon your Golem! (spin up the vm)
golem summon

golem do pwd
# prints the synced guest folder (created on the VM)

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

To recreate your golem from scratch, you can always:
``` sh
# remove the VM
golem destroy
# re-create (and re-provision)
golem summon
```

### Docker
you can run docker commands with:
``` sh
golem docker run ubuntu echo "hi, from docker"
# note: "golem docker" is just a shortcut to "golem do sudo docker"
```
### Port Forwarding
In some cases you want to forward ports in the VM to your host machine (eg. from you docker containers)
``` sh
# expose port 80 in the VM as 8080 in your host machine, 443 as 8443
golem expose 80:8080,443:8443
# list exposed ports
golem expose list
# remove all exposed ports
golem expose clear
```
