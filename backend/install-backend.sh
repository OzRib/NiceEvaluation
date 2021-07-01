#!/bin/bash

DIRNAME=$(dirname $0)

install-dependencies(){
	echo 'Installing dependencies...'

	#vendor
	cp -rf $DIRNAME/vendor /srv/vendor

	#env
	cp -rf $DIRNAME/env /srv/env

	#composer 
	cp -rf $DIRNAME/composer.* /srv
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
	ln -f $DIRNAME/classes/* /srv/classes
}

reinstall-classes(){
	echo 'Removing classes...'

	rm -rf /srv/classes

	install-classes
}

install-utilities(){
	echo 'Installing utilities...'

	mkdir /srv/utilities
	ln -f $DIRNAME/utilities/* /srv/utilities
}

reinstall-utilities(){
	echo 'Removing utilities...'

	rm -rf /srv/utilities

	install-utilities
}

install-templates(){
	echo 'Installing templates...'

	for dir in $DIRNAME/templates $DIRNAME/templates/**/
	do
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

	ln -f $DIRNAME/workflow/* /srv/http
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
