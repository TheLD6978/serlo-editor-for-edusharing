import { loadEnvConfig } from '@next/env'
import express from 'express'
import next from 'next'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

loadEnvConfig('./', dev)

void (async () => {
  await app.prepare()

  const server = express()
  server.post('/lti/save-content', async (req, res) => {
    return res.status(200).send('success')
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})()
