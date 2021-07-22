# <p align="center"> Github Search Engine </p>

## Table of Contents
- <a href="#about">About the Project</a>
  - <a href="#built-with">Built With</a>
  - <a href="#feature">Feature</a>
- <a href="#getting-started">Getting Started</a>
  - <a href="#prerequisites">Prerequisites</a>
  - <a href="#installation">Installation</a>
- <a href="#demo">Demo</a>
- <a href="#contact">Contact</a>

## <a id="about">About the Project</a>
A github search engine developed with Next.js
- <a id="built-with">Built with:</a>
  - <a href="https://nextjs.org/">Next.js</a>
  - <a href="https://ant.design/">Antd</a>


- <a id="feature">Features:</a>
  - [x] Applied Github OAuth that allow users to login via github account
  - [x] Redux applied with its middleware Thunk to perform async requests
  - [x] Compile Github markdown readme files via <a href="https://github.com/sindresorhus/github-markdown-css">github-markdown-css</a> & <a href="https://github.com/markdown-it/markdown-it">markdown-it</a>
  - [x] Use cache(<a href="https://www.npmjs.com/package/lru-cache">LRU</a>) to reduce the amount of requests only if it is necessary to be triggered

## <a id="getting-started">Getting Started:</a>
### <a id="prerequisites">Prerequisites</a>
This section is about some tips to help you play with this demo on your own device 🛀
 1. (Optional) Enter `npm install npm@latest -g` in your vsCode terminal to install latest npm globally
 2. (Optional) Enter `npm -v` in your vsCode terminal and make sure it gives the version of your npm
 3. Login your github account and under <a href="https://github.com/settings/developers">Github Developer Setting</a> to get your free CLIENT_ID and CLIENT_SECRET Key by creating a New OAuth App
### <a id="installation">Installation</a>
1. Clone the repo to your local device
`git clone https://github.com/Syberseul/github_SE.git`
2. Install required dependencies  
`npm install`
3. Create `.env` file at the root of the folder, and enter:  
```
GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
SCOPE = 'user'
CLIENT_ID = 'CLIENT_ID goes here'
CLIENT_SECRET = 'CLIENT_SECRET goes here'
REQUEST_TOKEN_URL = 'https://github.com/login/oauth/access_token'
```
4. Install Redis <a href="https://redis.io/download">>Reference Link<</a>

## <a id="demo">Demo:</a>
  
## <a id="contact">Contact Email:</a>
yteng.huang@gmail.com
