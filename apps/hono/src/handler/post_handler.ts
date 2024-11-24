import type { Hono } from 'hono'
import { vValidator } from '@hono/valibot-validator'
import { PostService } from '@packages/service'
import { PostDomain } from '@packages/domain'
import { postSchema } from '@packages/schema'
import { Post } from '@packages/prisma'
import * as v from 'valibot'

export class PostHandler {
  static apply(app: Hono) {
    return app
      .post('/posts', vValidator('json', v.pick(postSchema, ['post'])), async (c) => {
        const valid = c.req.valid('json')
        const req = valid.post
        await PostService.postPosts(req)
        return c.json({ message: 'Created' }, 201)
      })
      .get(
        '/posts',
        vValidator(
          'query',
          v.object({
            page: v.string(),
            rows: v.string(),
          }),
        ),
        async (c) => {
          const valid = c.req.valid('query')
          const { page, rows } = PostDomain.convertNumberQueryParams(valid)
          if (isNaN(page) || isNaN(rows) || page < 1 || rows < 1) {
            return c.json({ message: 'Bad Request' }, 400)
          }
          const limit = rows
          const offset = (page - 1) * rows
          const res: Post[] = await PostService.getPosts(limit, offset)
          return c.json(res, 200)
        },
      )
      .put(
        '/posts/:id',
        vValidator(
          'param',
          v.object({
            id: v.pipe(v.string(), v.uuid()),
          }),
        ),
        vValidator('json', v.pick(postSchema, ['post'])),
        async (c) => {
          const param_valid = c.req.valid('param')
          const id = param_valid.id
          const json_valid = c.req.valid('json')
          const { post } = json_valid
          await PostService.putPostsId(id, post)
          return new Response(null, { status: 204 })
        },
      )
      .delete(
        '/posts/:id',
        vValidator(
          'param',
          v.object({
            id: v.pipe(v.string(), v.uuid()),
          }),
        ),
        async (c) => {
          const valid = c.req.valid('param')
          const id = valid.id
          await PostService.deletePostsId(id)
          return new Response(null, { status: 204 })
        },
      )
  }
}
