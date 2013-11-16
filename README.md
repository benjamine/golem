Golem
=====

Automatically provisioned virtual machine ready for headless web automation

Details
--------

- ready for headless web automation using firefox and chrome
- includes web automation tools for ruby or node.js
- built with [vagrant](http://www.vagrantup.com/)
- provisioned with [puppet](https://puppetlabs.com/).
- [virtualbox](http://www.virtualbox.org/) machine
- running Ubuntu 12.

Installation
------------

``` sh
git clone https://github.com/benjamine/golem.git
cd golem
golem up
```

Usage
-----

``` sh
cd myproject
golem do sudo bundle install && cucumber features
```