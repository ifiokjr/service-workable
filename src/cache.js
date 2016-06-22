import { install$, fetch$, activate$ } from './streams'
import debug from 'debug'

const log = debug('sw:cache')
const CACHE_NAME = 'deps'


function openCaches() {
  caches.open(CACHE_NAME)
    .then(cache =>
      fetch('files-to-cache.json')
        .then(response =>
          response.json()
        ).then(files => {
          log(`[openCaches] adding files from json file: ${files}`)
          return cache.addAll(files)
        })
    ).then(() => {
      log('[openCaches] All required resources have been cached and the installation successful')
      return self.skipWaiting()
    })
}

function matchCaches(event) {
  caches.match(event.request)
    .then(response => {
      if (response) {
        log(`[fetch] returning from service worker cache: ${event.request.url}`)
        return response
      }
      log(`[fetch] returning from the server ${event.request.url}`)
      return fetch(event.request)
    })
}


install$
  .subscribe(event => {
    log('[install] kicking off service worker registration')
    event.waitUntil(openCaches())
  })

fetch$
  .subscribe(event =>
    event.respondWith(matchCaches(event))
  )

activate$
  .subscribe(event =>
    event.waitUntil(self.clients.claim())
  )
