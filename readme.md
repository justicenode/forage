# Forest

A package manager ipfs proxy cache packaged up as an electron menu bar app.

## How it works

Forest proxies package manager http requests and caches requested packages onto IPFS then announces the CID of newly cached packages on the IPFS public DHT.

Forest listens for announcements of packages being cached to IPFS and stores announced metadata. Next time forest proxies a request for a packages that it already has the CID for, it will attempt to download the package via IPFS first, falling back to downloading the package from the original source via http if the IPFS download fails.

Forest trusts other instances but also verifies that the packages downloaded from IPFS match the original copies from the upstream registry.

Package metadata is also cached locally so you can use your package manager whilst offline too.

## Features (coming soon)

Headless CLI - run forest as a daemon, ideal for usage on a server or in CI

Package index UI - see which packages have been proxied, cached and stored on IPFS

Local package search - search through locally available packages

Packrat mode - download all packages and their dependencies found in local metadata for resilient offline usage

Export/import - easily share multiple packages cached instantly with other instances via IPFS

Omninet mode - Attempt to import all packages announced on the IPFS public DHT

## Setup

Build from source on mac:

```shell
git clone http://github.com/forestpm/forest
cd forest
npm install
npm start
```

Configure npm to use forest as a proxy:

```shell
npm config add proxy http://0.0.0.0:8005/
npm config add https-proxy http://0.0.0.0:8005/
npm config add registry http://registry.npmjs.org/
npm config add strict-ssl false
```

Ensure IPFS is running locally with pubsub enabled:

```shell
ipfs daemon --enable-pubsub-experiment
```

## TODO

- tray menu (start, stop, about etc)
- connect to IPFS on startup
- cache downloaded package metadata
- store package tarballs in ipfs
- announce stored packages on DHT (pubsub)
- listed for package announcements on DHT (pubsub)
- store package data in a database
- package list UI
- show how much bandwidth saved overall (keep a record of ever request proxied)
- check for new versions from upstream (on demand or periodically)
- search
- export/import
- extract core proxy server as separate module
- CLI
- http api
- package search
- packrat mode
- omninet mode
- count how many nodes are

## BUGS

- node-gyp http requests not proxied (node-sass install)
- breaks if IPFS isn't running
