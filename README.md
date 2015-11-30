# Sky News Narrate

> Static websites for long-form content

## Environments

* Development - Development takes place locally, see development section for details
* Staging - http://news-narrate.cf.stage-paas.bskyb.com/
* Production - http://narrate.news.sky.com/ / http://news-narrate.cf.paas.bskyb.com/

## Prerequisites

  * [Node.js](http://nodejs.org/)
  * [npm](http://npmjs.org/)

## Installing

Clone the repository:

```
git clone https://github.com/sky-uk/news-narrate-web.git
```

`cd` into the directory:

```
cd news-narrate-web
```

Instal the project dependencies:

```
npm install
```

## Development

### London 7-7 feature

http://narrate.news.sky.com/london7-7

In the london7-7 directory.
Run `gulp` to build the index.html

### People smuggler feature

http://narrate.news.sky.com/people-smuggler

In the people-smuggler directory, run `build.sh`

## Build and deploy

The project is deployed by SDC's Jenkins instance and hosted on Nimbus.

* Navigate to `http://devbuild.ssdm.bskyb.com:8080/jenkins/job/news-narrate-web/`
* Click 'Release' in the sidebar
* Choose your branch and target location
* Click 'Schedule Release Build' to start a build
