import { defineConfig } from 'cypress'
import { EdusharingServer } from './src/edusharing-server-mock'
import { loadEnvConfig } from './src/server-utils'

export default defineConfig({
  // Disable checks in chrome "same-origin" in HTTP requests. Normally cypress
  // implements measures to avoid this problem. However due to the LTI the
  // domain changes often in the LTI worflow.
  //
  // see https://docs.cypress.io/guides/guides/web-security for more details
  //
  // TODO: Find a way to avoid this setting
  chromeWebSecurity: false,

  e2e: {
    setupNodeEvents(on, config) {
      on('before:run', (details) => {
        loadEnvConfig()
        const server = new EdusharingServer()
        return new Promise(resolve => {
          server.listen(8100, resolve)
        })
      })
    },
  },
})
