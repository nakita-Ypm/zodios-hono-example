import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core'
import { z } from 'zod'

const endpoints = makeApi([
  {
    method: 'get',
    path: '/',
    alias: 'get',
    requestFormat: 'json',
    response: z.object({ message: z.string() }).passthrough(),
  },
  {
    method: 'post',
    path: '/posts',
    alias: 'postPosts',
    description: `create a new post`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ post: z.string().min(1).max(140) }).passthrough(),
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/posts',
    alias: 'getPosts',
    description: `get PostList posts with optional pagination`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'page',
        type: 'Query',
        schema: z.string(),
      },
      {
        name: 'rows',
        type: 'Query',
        schema: z.string(),
      },
    ],
    response: z.array(
      z
        .object({
          id: z.string().uuid(),
          post: z.string().min(1).max(140),
          createdAt: z.string(),
          updatedAt: z.string(),
        })
        .passthrough(),
    ),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: 'put',
    path: '/posts/:id',
    alias: 'putPostsId',
    description: `update Post`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ post: z.string().min(1).max(140) }).passthrough(),
      },
      {
        name: 'id',
        type: 'Path',
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: 'delete',
    path: '/posts/:id',
    alias: 'deletePostsId',
    description: `delete post`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
])

export const api = new Zodios(endpoints)

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options)
}
