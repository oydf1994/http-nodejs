const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = process.env.apikey
})

router.get('/query', async (ctx, next) => {
  const { ChatGPTAPI } = await import('chatgpt')
  const api = new ChatGPTAPI({
    apiKey: "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",
    userLabel: " ",
    completionParams: {
      temperature: 0.7,
      max_tokens: 512,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
  })
  const r = await api.sendMessage("你在干什么?", {
    promptPrefix: " ",
    promptSuffix: ".",
    timeoutMs: 10 * 60 * 1000,
    onProgress: (partialResponse) => {
    }
  })
  ctx.body = r
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
