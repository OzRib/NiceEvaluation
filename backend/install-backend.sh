#!/bin/bash

install-dependencies(){
	echo 'Installing dependencies...'

	#vendor
	sudo cp -rf vendor /srv/vendor

	#env
	sudo cp -rf env /srv/env

	#composer 
	sudo cp -rf composer.* /srv
}

reinstall-dependencies(){
	echo 'Removing dependencies...'

	baseDir=/srv
	toRemove=('vendor' 'env' 'composer.*')

	for file in $toRemove
	do
		sudo rm -rf $baseDir/$file
	done

	install-dependencies
}

install-classes(){
	echo 'Installing classes...'

	sudo mkdir /srv/classes
	sudo ln -f classes/* /srv/classes
}

reinstall-classes(){
	echo 'Removing classes...'

	sudo rm -rf /srv/classes

	install-classes
}

install-utilities(){
	echo 'Installing utilities...'

	sudo mkdir /srv/utilities
	sudo ln -f utilities/* /srv/utilities
}

reinstall-utilities(){
	echo 'Removing utilities...'

	sudo rm -rf /srv/utilities

	install-utilities
}

install-workflow(){
	echo 'Installing workflow...'

	sudo ln -f workflow/* /srv/http
}

reinstall-workflow(){
	echo 'Removing workflow...'

	sudo rm -rf /srv/http/*.php
	
	install-workflow
}

install(){
	echo 'Installing the project in /srv/http...'

	install-dependencies
	install-classes
	install-utilities
	install-workflow
}

reinstall(){
	echo 'This project alrealy installed.'
	echo 'Reinstalling the project in /srv/http...'

	reinstall-dependencies
	reinstall-classes
	reinstall-utilities
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
