# <p align="center"> Github Search Engine </p>

## Table of Contents
- <a href="#about">About the Project</a>
  - <a href="#built-with">Built With</a>
  - <a href="#feature">Feature</a>
- <a href="#getting-started">Getting Started</a>
  - <a href="#prerequisites">Prerequisites</a>
  - <a href="#installation">Installation</a>

## <a id="about">About the Project</a>
A github search engine developed with Next.js
- <a id="built-with">Built with:</a>
  - <a href="https://nextjs.org/">Next.js</a>
  - <a href="https://ant.design/">Antd</a>


- <a id="feature">Features:</a>
  - Applied Github OAuth that allow users to login via github account
  - Redux applied with its middleware Thunk to perform async requests
  - Compile Github markdown readme files via <a href="https://github.com/sindresorhus/github-markdown-css">github-markdown-css</a> & <a href="https://github.com/markdown-it/markdown-it">markdown-it</a>
  - Use cache(<a href="https://www.npmjs.com/package/lru-cache">LRU</a>) to reduce the amount of requests only if it is necessary to be triggered

## <a id="getting-started">Getting Started:</a>
### <a id="prerequisites">Prerequisites</a>
This section is about some tips to help you play with this demo on your own device 🛀
  - npm `npm install npm@latest -g` to install latest npm
  - in your vsCode terminal, try enter `npm -v` and make sure it gives the version of your npm
### <a id="installation">Installation</a>
