import { createServer } from 'http';
import { ChatGPTAPI } from "chatgpt"
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
createServer(async (req, res) => {
  const r = await api.sendMessage(res.text, {
    promptPrefix: " ",
    promptSuffix: ".",
    timeoutMs: 10 * 60 * 1000,
  })
  res.json(r)
  res.end();
}).listen(process.env.PORT);
