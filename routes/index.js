const router = require('koa-router')()
const os = require('os');

router.get('/', async (ctx, next) => {
  ctx.body = 1
})

router.post('/query', async (ctx, next) => {
  const query = ctx.request.body;
  const apiKey = ctx.headers["apikey"]
  const { ChatGPTAPI } = await import('chatgpt')
  const api = new ChatGPTAPI({
    apiKey: apiKey,
    userLabel: " ",
    completionParams: {
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
  })
  let option = {
    promptPrefix: " ",
    promptSuffix: ".",
    timeoutMs: 10 * 60 * 1000,
  }
  const res = await api.sendMessage(query.text, option)
  ctx.body = res
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    freemem: '你的剩余内存:' + os.freemem() / 1024 / 1024,
    cpus: os.cpus(),
  }
})

module.exports = router
