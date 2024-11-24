import type { Hono } from 'hono'

export class ZodiosHonoHandler {
  static apply(app: Hono) {
    return app.get('/', async (c) => {
      return c.json({ message: 'Zodios Hono🔥' })
    })
  }
}
