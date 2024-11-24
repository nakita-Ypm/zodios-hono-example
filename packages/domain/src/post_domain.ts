import { Prisma } from '@packages/prisma'

export type QueryValid = {
  page: string
  rows: string
}

export class PostDomain {
  /**
   * buildPostPostsParams
   * @param post
   * @returns Prisma.PostCreateArgs
   */
  static buildPostPostsParams(post: string): Prisma.PostCreateArgs {
    return {
      data: {
        post,
      },
    }
  }

  /**
   * buildGetPostsParams
   * @param limit
   * @param offset
   * @returns Prisma.PostFindManyArgs
   */
  static buildGetPostsParams(limit: number, offset: number): Prisma.PostFindManyArgs {
    return {
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }
  }

  /**
   * buildPutPostParams
   * @param id
   * @param post
   * @returns Prisma.PostUpdateArgs
   */
  static buildPutPostParams(id: string, post: string): Prisma.PostUpdateArgs {
    return {
      where: {
        id,
      },
      data: {
        post,
      },
    }
  }

  /**
   * buildDeletePostsId
   * @param id
   * @returns Prisma.PostDeleteArgs
   */
  static buildDeletePostsId(id: string): Prisma.PostDeleteArgs {
    return {
      where: {
        id,
      },
    }
  }

  /**
   * convertNumberQueryParams
   * @param page
   * @param rows
   * @returns { page: number; rows: number }
   */
  static convertNumberQueryParams(valid: QueryValid): { page: number; rows: number } {
    const { page, rows } = valid
    return {
      page: parseInt(page),
      rows: parseInt(rows),
    }
  }
}
