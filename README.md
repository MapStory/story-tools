# story-tools

## Installation

run

    npm install
    bower install
    gulp develop

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
