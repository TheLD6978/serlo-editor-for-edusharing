import express from 'express'
import nextEnv from '@next/env'

const { loadEnvConfig } = nextEnv

loadEnvConfig(process.cwd())
const edusharingPort = 8100

const app = express()

app.get('/', (_req, res) => {
  res.setHeader('Content-type', 'text/html').send(
    autoFormHtml({
      targetUrl: process.env.EDITOR_URL + 'lti/login',
      params: {
        target_link_uri: 'http://localhost:3000/lti',
        iss: 'http://repository.127.0.0.1.nip.io:8100/edu-sharing',

        // Test whether this is optional
        login_hint: 'admin',
        lti_message_hint: 'd882efaa-1f84-4a0f-9bc9-4f74f19f7576',
        lti_deployment_id: '1',
        client_id: 'qsa2DgKBJ2WgoJO',
      },
    })
  )
})

app.get('/edu-sharing/rest/ltiplatform/v13/auth', (req, res) => {
  // http://repository.127.0.0.1.nip.io:8100/edu-sharing/rest/ltiplatform/v13/auth?response_type=id_token&response_mode=form_post&id_token_signed_response_alg=RS256&scope=openid&client_id=qsa2DgKBJ2WgoJO&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flti&login_hint=admin&nonce=43pesgc8i6ptw83xpvwaa00tc&prompt=none&state=5e867c7aae19b74e9a3815ea38b2c8f848f91c6b2c4468d890&lti_message_hint=d882efaa-1f84-4a0f-9bc9-4f74f19f7576&lti_deployment_id=1

  res.send('Nonce: ' + req.query['nonce'])
})

app.listen(edusharingPort, () => {
  console.log('INFO: Mocked version of edusharing is ready.')
  console.log(
    `Open http://localhost:${edusharingPort}/ to open the Serlo Editor via LTI`
  )
})

function autoFormHtml({
  method = 'GET',
  targetUrl,
  params,
}: {
  method?: 'GET' | 'POST'
  targetUrl: string
  params: Record<string, string>
}) {
  const formDataHtml = Object.entries(params)
    .map(([name, value]) => {
      const encodedValue = encodeURI(value)

      return `<input type="hidden" name="${name}" value="${encodedValue}" />`
    })
    .join('\n')

  return `
    <!DOCTYPE html>
    <html>
    <head><title>Redirect to ${targetUrl}</title></head>
    <body>
      <form id="form" action="${targetUrl}" method="${method}">
        ${formDataHtml}
      </form>
      <script type="text/javascript">
        document.getElementById("form").submit();
      </script>
    </body>
    </html>
  `.trim()
}

export {}
