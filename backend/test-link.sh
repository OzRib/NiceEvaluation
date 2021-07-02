#!/bin/bash

serverBaseDir=/srv
DIRNAME=$(dirname $0)

dirsToCheck=( "classes" "utilities" )

checkDirs(){
	dir=$1
	projectContent=$(cat $DIRNAME/$dir/* || echo 'Error in project')
	serverContent=$(cat $serverBaseDir/$dir/* || echo 'Error in server')

	if [ "$projectContent" = "$serverContent" ]
	then
	       echo "$1 OK"
	else
		echo "$1 WARNING"
	fi
}

checkTemplates(){
	projectContent=$(
		cat $DIRNAME/templates/**/*.* || 
		echo 'Error in project'
	)

	serverContent=$(
		cat /srv/templates/**/*.* || 
		echo 'Error in server'
	)

	if [ "$projectContent" = "$serverContent" ]
	then
		echo 'templates OK'
	else
		echo 'templates WARNING'
	fi
}

checkWorkflow(){
	projectContent=$(cat $DIRNAME/workflow/* || echo 'Error in project')
	serverContent=$(cat $serverBaseDir/http/*.php || echo 'Error in server')

	if [ "$projectContent" = "$serverContent" ]
	then
		echo 'workflow OK'
	else
		echo 'workflow WARNING'
	fi
}

for dir in ${dirsToCheck[*]}
do
	checkDirs $dir
done

checkTemplates
checkWorkflow
