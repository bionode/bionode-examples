# Install Node.js

## Using package managers

### Mac
```bash
brew install node
```

### Ubuntu
```bash
sudo apt-get install nodejs npm
```


## Using installer from website
Go to http://nodejs.org and click install, then follow the instructions.


## Using Node.js version manager [n](https://github.com/visionmedia/n)
### Download [n](https://github.com/visionmedia/n) from the following url
https://github.com/visionmedia/n/archive/master.zip

Suggestion, use curl or simply [git clone](http://git-scm.com/book/en/Git-Basics-Getting-a-Git-Repository#Cloning-an-Existing-Repository) it.

#### Install curl if needed
```bash
# OSX
brew install curl
# Ubuntu
sudo apt-get update
sudo apt-get install curl
```

#### Download
```bash
curl -o master.zip https://codeload.github.com/visionmedia/n/zip/master
```
### Extract it (if you didn't use git)
```bash
# Install unzip if needed like curl
unzip master.zip
```

### Install build tools to get make (if necessary)
```bash
# OSX
xcode-select --install
# Ubuntu
sudo apt-get install build-essential
```

### Install n in user space
```bash
cd n-master
mkdir $HOME/bin
PREFIX=$HOME make install
```

### Set n environment variables
```bash
export N_PREFIX=$HOME
export PATH=$HOME/bin:$PATH
# Save them
echo 'export N_PREFIX=$HOME' >> ~/.profile
echo 'export PATH=$HOME/bin:$PATH' >> ~/.profile
```

### Download and Install the latest stable version of Node.js
```bash
n stable
```
