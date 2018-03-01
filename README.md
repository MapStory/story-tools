[![Build Status](https://travis-ci.org/MapStory/story-tools.svg?branch=master)](https://travis-ci.org/MapStory/story-tools)

# story-tools

## Installation

run
```
    yarn install
    gulp build
```
If you haven't used or installed Gulp previously, you may also need to run
`npm install --global gulp-cli` before running `gulp develop`.

Alternatively, run
```
    docker-compose build
    docker-compose up
```

## Developing Locally

If you want to watch your files for changes and bundle everything each time a change is made run
```
gulp watch
```

If you want to run the development server so you can access the examples and see your changes live run
```
gulp develop
```

## Accessing the examples

Example index will be available at: http://localhost:8001

## Getting around

There are 3 large distinctions in the structure and bundling of code:

* core - any core viewing/playback logic + provided UI
  this includes API, controller logic and the timeline and timeslider UI
* edit - any non-UI editing related logic, parsing, etc.
* ng - angular wrappers/integration for both core and edit

Within these categories, the specific functionality includes (not all physically separate):

* time - timeline and timeslider integration
* style - ol3/SLD styling
* pins - spatial story-telling annotations
* boxes - spatial story-telling chapters
* layout - layout of viewing mode

## Running tests in the browser

run

    gulp karma --server

Karma will be available at: http://localhost:9876/debug.html
