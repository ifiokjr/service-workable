import Koa from 'koa'
import serve from 'koa-static'
import 'colors'

const app = new Koa()
const PORT = 3000

app.use(async () => {
  await serve('.')
})

app.listen(PORT)
console.log(`listening on port ${PORT}`.bold.green)
