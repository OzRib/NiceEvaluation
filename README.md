# What is this?
A web & mobile application to generate evaluations of my computer course.
The project has builded with React.js, React Native, PHP and Ruby.
I have used shell scripts to test archives links and to install the project in server. 

# What is the purpose of this creation?
This project has been built as a school project. 
The teacher requested me to do an evaluation generator system and I thougth to do it with the tecnologies I know.
This is the result☺️ ❤️

# Screenshots of website below

![login](https://github.com/OzRib/NiceEvaluation/blob/master/screenshots/login.png)
![generate](https://github.com/OzRib/NiceEvaluation/blob/master/screenshots/generate.png)
![generate-modal](https://github.com/OzRib/NiceEvaluation/blob/master/screenshots/generate-modal.png)
![manage-users](https://github.com/OzRib/NiceEvaluation/blob/master/screenshots/manage-users.png)
![show-questions](https://github.com/OzRib/NiceEvaluation/blob/master/screenshots/show-questions.png)
![teacher-page](https://github.com/OzRib/NiceEvaluation/blob/master/screenshots/teacher-page.png)

# How to install?
The first step is configure the environment variables.
You can view an example of the environment variables in the file 
[example.env](https://github.com/OzRib/NiceEvaluation/blob/master/example.env).

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

And now, access the docker ip what you have cofigured by your browser.
Same this: `http://172.17.0.1`

Have fun 😄
