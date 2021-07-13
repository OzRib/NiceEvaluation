#What is this?
A web & mobile application to generate evaluations of my computer course.
The website is builded with React.js.
The mobile is builded with React Native.
The backend is builded with PHP and Ruby.
I have used shell scripts to test archives links and to install the project in server. 

# How to install?
The first step is configure the environment variables
You can view an example of the environment variables in file example.env
[environment example](https://github.com/OzRib/NiceEvaluation/blob/master/example.env)

The project server is builded to run in Linux servers.
To install project in the Linux server, first install docker in your Linux distro.

## Install docker in Debian/Ubuntu
To install in your Debian, Ubuntu or derivated, aplly this commands in your terminal with root user.

```
	apt install docker.io
	systemctl enable docker
	systemctl start docker
```

## Install docker in Arch Linux based systems
To install docker in Arch Linux or Manjaro, aplly this commads in your terminal with root user.

```
	pacman -S docker
	systemctl enable docker
	systemctl start docker	
```

### Install project with docker
Clone the project in your local machine and run the install.sh script.
To this, execute in your terminal the commands bellow with superuser.

```
	git clone https://github.com/OzRib/NiceEvaluation.git
	./NiceEvaluation/install.sh
```
