#!/bin/bash

DIRNAME=$(dirname $0)
WORKDIR=$(pwd)

install-backend(){
	$DIRNAME/backend/install-backend.sh
}

install-frontend(){
	cd $DIRNAME/frontend
	npm run deploy
	cd $WORKDIR
}

install-backend
install-frontend
