const router = require('koa-router')()
const os = require('os');

router.get('/', async (ctx, next) => {
  let index = 3
  let timer = setInterval(() => {
    ctx.sse.send("a notice");
    index--
    if (index == 0) {
      ctx.sse.sendEnd();
      clearInterval(timer);
    }
  }, 1000);

})

router.get('/query', async (ctx, next) => {
  const query = ctx.query;
  const { ChatGPTAPI } = await import('chatgpt')
  const api = new ChatGPTAPI({
    apiKey: process.env.apikey,
    userLabel: " ",
    completionParams: {
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
  })
  const res = await api.sendMessage(query.text, {
    promptPrefix: " ",
    promptSuffix: ".",
    timeoutMs: 10 * 60 * 1000,
  })
  ctx.body = res
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    freemem: '你的剩余内存:' + os.freemem() / 1024 / 1024,
    cpus: os.cpus(),
  }
})

module.exports = router
