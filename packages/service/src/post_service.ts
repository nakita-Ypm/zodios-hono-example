import { Post, Prisma, prisma } from '@packages/prisma'
import { PostDomain } from '@packages/domain'

export class PostService {
  /**
   * postPosts
   * @param post
   * @returns Promise<Post>
   */
  static async postPosts(post: string): Promise<Post> {
    const data: Prisma.PostCreateArgs = PostDomain.buildPostPostsParams(post)
    return await prisma.post.create(data)
  }

  /**
   * getPosts
   * @param limit
   * @param offset
   * @returns Promise<Post[]>
   */
  static async getPosts(limit: number = 0, offset: number = 10): Promise<Post[]> {
    const data: Prisma.PostFindManyArgs = PostDomain.buildGetPostsParams(limit, offset)
    return await prisma.post.findMany(data)
  }

  /**
   * putPostsId
   * @param id
   * @param post
   * @returns Promise<Post>
   */
  static async putPostsId(id: string, post: string): Promise<Post> {
    const data: Prisma.PostUpdateArgs = PostDomain.buildPutPostParams(id, post)
    return await prisma.post.update(data)
  }

  /**
   * deletePostsId
   * @param id
   * @returns Promise<Post>
   */
  static async deletePostsId(id: string): Promise<Post> {
    const data: Prisma.PostDeleteArgs = PostDomain.buildDeletePostsId(id)
    return await prisma.post.delete(data)
  }
}
