
group { "puppet":
	ensure => 'present',
}

File {
	owner => 'vagrant',
	group => 'vagrant',
	mode => 0644
}

Exec {
	path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ]
}

exec { "apt-update":
    command => "/usr/bin/apt-get update"
}

Package {
	require => Exec['apt-update']
}

file { 'profile':
	path => '/home/vagrant/.profile',
	ensure => present,
	content => "cd /vagrant; exec /bin/bash",
}

$packages = [ 'rake', 'vim-nox', 'git', 'ruby1.9.3', 'librmagick-ruby', 'libgsl-ruby' ]
package { $packages:
	ensure => 'latest',
}

$gems = [ 'jekyll', 'rdiscount' ]
package { $gems:
	ensure => 'latest',
	provider => 'gem',
}

