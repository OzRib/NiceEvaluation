#!/bin/bash

DIRNAME=$(dirname $0)

#You need docker installed in your Linux PC

#In .env file, declare: 
	#DB_ROOT_PASSWD (Database Root Password)
	#DB_USER (Database User) | Optional
	#DB_PASSWD (Database Password)

#Catching the environment variables
source $DIRNAME/.env

#Installing images
docker pull ozrib/nice-evaluation:database
docker pull ozrib/nice-evaluation:site

#Installing database
docker run --name database\
	-e MYSQL_ROOT_PASSWORD=$DB_ROOT_PASSWD\
       	-e MYSQL_USER=$DB_USER\
	-e MYSQL_PASSWORD=$DB_PASSWD\
	-d ozrib/nice-evaluation:database

#Installing site
docker run --name site -d ozrib/nice-evaluation:site
