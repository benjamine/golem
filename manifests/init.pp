group { "puppet":
    ensure => "present",
}

File { owner => 0, group => 0, mode => 0644 }

file { '/etc/motd':
    content => template('/vagrant/resources/banner.erb')
}

package { 'dos2unix':
    ensure => 'installed'
}

file { '/vagrant/scripts/zsh.sh':
    ensure => present,
    mode => '0755'
}

exec { 'docker':
    command => "/vagrant/scripts/zsh.sh",
    logoutput => on_failure,
    require => File['/vagrant/scripts/zsh.sh']
}

file { '/vagrant/scripts/docker.sh':
    ensure => present,
    mode => '0755'
}

exec { 'docker':
    command => "/vagrant/scripts/docker.sh",
    logoutput => on_failure,
    require => File['/vagrant/scripts/docker.sh']
}

file { '/vagrant/scripts/chrome-driver.sh':
    ensure => present,
    mode => '0755'
}

exec { 'chrome-driver':
    command => "/vagrant/scripts/chrome-driver.sh",
    logoutput => on_failure,
    require => File['/vagrant/scripts/chrome-driver.sh']
}

package { 'google-chrome-stable':
    ensure   => 'installed',
    require => Exec[chrome-driver]
}

package { 'firefox':
    ensure   => 'installed'
}

package { 'xvfb':
    ensure   => 'installed'
}



package { 'qt4-qmake':
    ensure   => 'installed'
}

package { 'libqt4-dev':
    ensure   => 'installed'
}

#package { 'libicu48':
#    ensure   => 'installed'
#}



# sudo apt-add-repository ppa:ubuntu-sd k-team/ppa

package { 'qtdeclarative5-dev':
    ensure   => 'installed'
}

#package { 'qt5-make':
#    ensure   => 'installed'
#}

package { 'qt5-default':
    ensure   => 'installed'
}

package { 'libqt5webkit5-dev':
    ensure   => 'installed'
}

package { 'libsqlite3-dev':
    ensure   => 'installed'
}



package { 'ruby':
    name   => 'ruby1.9.1-full',
}

define check_alternatives($linkto) {
  exec { "/usr/bin/update-alternatives --set $name $linkto":
    unless => "/bin/sh -c '[ -L /etc/alternatives/$name ] && [ /etc/alternatives/$name -ef $linkto ]'"
  }
}

package { 'bundler':
    ensure   => 'installed',
    provider => 'gem',
}

package { 'rake':
    ensure   => 'installed',
    provider => 'gem',
}
