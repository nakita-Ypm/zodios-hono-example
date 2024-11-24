import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { ZodiosHonoHandler } from '../handler/zodios_hono_handler'
import { PostHandler } from '../handler/post_handler'

export class App {
  static init() {
    const app = new Hono()
    const port = 3000

    console.log(`Server is running on http://localhost:${port}`)

    serve({
      fetch: app.fetch,
      port,
    })

    app.use('*', logger())
    app.use('*', (c, next) => {
      console.log(`  ::: ${c.req.method} ${c.req.url}`)
      return next()
    })

    app.use('*', async (c, next) => {
      try {
        await next()
      } catch (e) {
        return c.json({ error: (e as Error).message }, 500)
      }
    })

    return this.applyRoutes(app)
  }

  static applyRoutes(app: Hono) {
    return app.route('/', ZodiosHonoHandler.apply(app)).route('/', PostHandler.apply(app))
  }
}
