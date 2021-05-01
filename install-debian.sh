#!/bin/bash

#Installing PHP 8 for Debian GNU/Linux
apt install lsb-release apt-transport-https ca-certificates
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/php.list
apt update
apt install php8.0 php8.0-intl php8.0-mysql php8.0-sqlite3 php8.0-gd
echo "$(php -v)"
echo "PHP8 Installed"
