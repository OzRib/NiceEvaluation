#!/bin/bash

serverBaseDir=/srv

dirsToCheck=('classes' 'utilities')

checkDirs(){
	dir=$1
	projectContent=$(cat $dir/*)
	serverContent=$(cat $serverBaseDir/$dir/*)

	if [ "$projectContent"=="$serverContent" ]
	then
	       echo "$1 OK"
	else
		echo "$1 WARNING"
	fi
}

checkWorkflow(){
	projectContent=$(cat workflow/*)
	serverContent=$(cat $serverBaseDir/http/*.php)

	if [ "$projectContent"=="$serverContent" ]
	then
		echo "workflow OK"
	else
		echo "Workflow WARNING"
	fi
}

checkDirs 'classes'
checkDirs 'utilities'
checkWorkflow
