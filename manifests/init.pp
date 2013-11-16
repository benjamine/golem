group { "puppet":
    ensure => "present",
}

File { owner => 0, group => 0, mode => 0644 }

file { '/etc/motd':
    content => template('/vagrant/resources/banner.erb')
}

exec { 'chrome-driver':
    command => "/vagrant/scripts/chrome-driver.sh",
    logoutput => on_failure,
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

class { 'ruby':
    ruby_package => 'ruby1.9.1-full',
    gems_version => 'latest'
}

define check_alternatives($linkto) {
  exec { "/usr/sbin/update-alternatives --set $name $linkto":
    unless => "/bin/sh -c '[ -L /etc/alternatives/$name ] && [ /etc/alternatives/$name -ef $linkto ]'"
  }
}

# We want to use ruby 1.9.3 (1.9.1 in ubuntu)
check_alternatives { "ruby":
  linkto => "/usr/bin/ruby1.9.1",
  require => Class[ruby];
}

# We want to use gem 1.9.1
check_alternatives { "gem":
  linkto => "/usr/bin/gem1.9.1",
  require => Class[ruby],
}

package { 'bundler':
    ensure   => 'installed',
    provider => 'gem',
    require => Check_alternatives[gem],
}

package { 'rake':
    ensure   => 'installed',
    provider => 'gem',
    require => Check_alternatives[gem],
}
