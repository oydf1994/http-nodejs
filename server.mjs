import { ChatGPTAPI } from "chatgpt"
import Koa from "koa"
const app = new Koa();
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
app.use(async (ctx, next) => {
  const r = await api.sendMessage("hello", {
    promptPrefix: " ",
    promptSuffix: ".",
    timeoutMs: 10 * 60 * 1000,
  })
  ctx.body = r
})
app.listen(process.env.PORT || 3000)