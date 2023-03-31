# local_smartclippy

A moodle plugin that brings everyone's favorite mascot from 90's computing to Moodle.

## Requirements

- [smartclippy-server](https://github.com/devnoot/smartclippy-server)

## Installation

- Create a `.env` file in `app` with the contents `VITE_APIURL=https://your/api/url`

- `cd` into the `app` folder and run `pnpm build` to build the app. 

- Copy the root folder to `local/smartclippy` to enable Clippy on your course pages.

- NOTE: It will ask you to set an API URL in Moodle settings. Just type in anything as the app doesn't actually look at it.
