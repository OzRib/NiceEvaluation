#!/bin/bash

install-dependencies(){
	echo 'Installing dependencies...'

	#vendor
	cp -rf vendor /srv/vendor

	#env
	cp -rf env /srv/env

	#composer 
	cp -rf composer.* /srv
}

reinstall-dependencies(){
	echo 'Removing dependencies...'

	baseDir=/srv
	toRemove=('vendor' 'env' 'composer.*')

	for file in $toRemove
	do
		rm -rf $baseDir/$file
	done

	install-dependencies
}

install-classes(){
	echo 'Installing classes...'

	mkdir /srv/classes
	ln -f classes/* /srv/classes
}

reinstall-classes(){
	echo 'Removing classes...'

	rm -rf /srv/classes

	install-classes
}

install-utilities(){
	echo 'Installing utilities...'

	mkdir /srv/utilities
	ln -f utilities/* /srv/utilities
}

reinstall-utilities(){
	echo 'Removing utilities...'

	rm -rf /srv/utilities

	install-utilities
}

install-templates(){
	echo 'Installing templates...'

	for dir in templates templates/**/
	do
		echo $dir
		mkdir /srv/$dir
		ln -f $dir/*.* /srv/$dir/
	done
}

reinstall-templates(){
	echo 'Removing templates...'

	rm -rf /srv/templates
	install-templates
}

install-workflow(){
	echo 'Installing workflow...'

	ln -f workflow/* /srv/http
}

reinstall-workflow(){
	echo 'Removing workflow...'

	rm -rf /srv/http/*.php
	
	install-workflow
}

install(){
	echo 'Installing the project in /srv/http...'

	install-dependencies
	install-classes
	install-utilities
	install-templates
	install-workflow
}

reinstall(){
	echo 'This project alrealy installed.'
	echo 'Reinstalling the project in /srv/http...'

	reinstall-dependencies
	reinstall-classes
	reinstall-utilities
	reinstall-templates
	reinstall-workflow
}

baseDir=/srv
dirChecks=('env' 'vendor' 'classes' 'utilities')
isInstalled=false

for dir in $dirChecks
do
	totalDir=$baseDir/$dir
	if [ -d $totalDir ]
	then
		isInstalled=true
	fi
done

if $isInstalled
then
	reinstall
else
	install
fi
