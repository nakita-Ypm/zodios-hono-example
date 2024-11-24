import { beforeEach, describe, expect, it } from 'vitest'
import { createApiClient } from '@packages/-zod-client'
import { prisma, Post } from '@packages/prisma'
import { App } from '../app'
import { randomUUID } from 'crypto'

App.init()

const testClient = createApiClient('http://localhost:3000')

describe('Zodios Hono🔥 Test', () => {
  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  it('Hono API', async () => {
    const input = await testClient.get()
    expect(input).toEqual({
      message: 'Zodios Hono🔥',
    })
  })

  it('postPosts', async () => {
    const input = await testClient.postPosts({
      post: 'Zodios Hono🔥',
    })

    console.log(input)
    expect(input).toEqual({ message: 'Created' })
  })

  it('getPosts', async () => {
    const generatePosts = (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: randomUUID(),
        post: `Zodios Hono🔥${i + 1}`,
        createdAt: new Date(`2021-01-${i + 1}`),
        updatedAt: new Date(`2021-01-${i + 1}`),
      }))
    }

    const postDatas = await Promise.all(
      generatePosts(20).map(async (data) => {
        return prisma.post.create({
          data,
        })
      }),
    )

    const input: Post[] = await testClient.getPosts({
      queries: {
        page: '1',
        rows: '10',
      },
    })

    const expected = postDatas
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
      .map((data) => ({
        ...data,
        createdAt: data.createdAt.toISOString(),
        updatedAt: data.updatedAt.toISOString(),
      }))

    expect(input).toEqual(expected)
  })

  it('putPostsId', async () => {
    const post = await prisma.post.create({
      data: {
        id: randomUUID(),
        post: 'Zodios Hono🔥 Update',
      },
    })

    const updateData = { post: 'Zodios Hono🔥🔥🔥 Update' }
    await testClient.putPostsId(updateData, {
      params: {
        id: post.id,
      },
    })

    const updatedPost = await prisma.post.findUnique({
      where: {
        id: post.id,
      },
    })
    expect(updatedPost?.post).toEqual('Zodios Hono🔥🔥🔥 Update')
  })

  it('deletePostsId', async () => {
    const post = await prisma.post.create({
      data: {
        id: randomUUID(),
        post: 'Zodios Hono🔥 Delete',
      },
    })

    await testClient.deletePostsId(undefined, {
      params: {
        id: post.id,
      },
    })

    const deletedPost = await prisma.post.findUnique({
      where: {
        id: post.id,
      },
    })

    expect(deletedPost).toBeNull()
  })
})
