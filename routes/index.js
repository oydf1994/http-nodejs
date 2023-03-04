const router = require('koa-router')()
const os = require('os');
const { PassThrough } = require("stream");

router.get('/', async (ctx, next) => {
  ctx.request.socket.setTimeout(0);
  ctx.req.socket.setNoDelay(true);
  ctx.req.socket.setKeepAlive(true);
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  const stream = new PassThrough();
  ctx.status = 200;
  ctx.body = stream;
  setInterval(() => {
    stream.write(`data: ${new Date()}\n\n`);
  }, 1000);

})

router.get('/query', async (ctx, next) => {
  ctx.request.socket.setTimeout(0);
  ctx.req.socket.setNoDelay(true);
  ctx.req.socket.setKeepAlive(true);
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  const stream = new PassThrough();
  ctx.status = 200;
  ctx.body = stream;
  const { ChatGPTAPI } = await import('chatgpt')
  const api = new ChatGPTAPI({
    apiKey: process.env.apikey,
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
      stream.write(partialResponse.text);
    }
  })
  stream.end()
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    freemem: '你的剩余内存:' + os.freemem() / 1024 / 1024,
    cpus: os.cpus(),
  }
})

module.exports = router
