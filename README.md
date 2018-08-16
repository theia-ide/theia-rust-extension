# Theia Rust Extension
[![Build Status](https://travis-ci.org/theia-ide/theia-rust-extension.svg?branch=master)](https://travis-ci.org/theia-ide/theia-rust-extension)

An extension for the Theia-IDE to support the Rust language, using the
[Rust language server](https://github.com/rust-lang-nursery/rls).

## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

Install npm and node.

    nvm install 8
    nvm use 8

Install yarn.

    npm install -g yarn

## Running the browser example

    yarn rebuild:browser
    cd browser-app
    yarn start

Open http://localhost:3000 in the browser.

## Running the Electron example

    yarn rebuild:electron
    cd electron-app
    yarn start

## Developing with the browser example

Start watching of the rust extension.

    cd rust
    yarn watch

Start watching of the browser example.

    yarn rebuild:browser
    cd browser-app
    yarn watch
    yarn start

Open http://localhost:3000 in the browser.

## Developing with the Electron example

Start watching of the rust extension.

    cd rust
    yarn watch

Start watching of the electron example.

    yarn rebuild:electron
    cd electron-app
    yarn watch
    yarn start

## Publishing @theia/rust

Each change on master triggers a build on travis against Theia `latest`.
The resulting package is automatically published to [](http://www.npmjs.org) as
`@theia/rust:latest`.
