import { describe, expect, it } from 'vitest'
import {
  buildbuildPostPostsParamsTestCases,
  buildPutPostParamsTestCases,
  buildDeletePostsIdTestCases,
  convertNumberQueryParamsTestCases,
  buildGetPostsParamsTestCases,
} from '../data/post'
import { PostDomain } from '../post_domain'

describe('PostDomain Test', () => {
  // buildPostPostsParams
  it.concurrent.each(buildbuildPostPostsParamsTestCases)('buildPostPostsParams("%s") -> %j', (post, expected) => {
    const input = PostDomain.buildPostPostsParams(post)
    expect(input).toEqual(expected)
  })
  it.concurrent.each(buildGetPostsParamsTestCases)(
    'buildGetPostsParams("%s", "%s") -> %j',
    (limit, offset, expected) => {
      const input = PostDomain.buildGetPostsParams(limit, offset)
      expect(input).toEqual(expected)
    },
  )
  // buildPutPostParams
  it.concurrent.each(buildPutPostParamsTestCases)('buildPutPostParams("%s") -> %j', (id, post, expected) => {
    const input = PostDomain.buildPutPostParams(id, post)
    expect(input).toEqual(expected)
  })
  // buildDeletePostParams
  it.concurrent.each(buildDeletePostsIdTestCases)('buildDeletePostParams("%s") -> %j', (id, expected) => {
    const input = PostDomain.buildDeletePostsId(id)
    expect(input).toEqual(expected)
  })
  // convertNumberQueryParams
  it.concurrent.each(convertNumberQueryParamsTestCases)('convertNumberQueryParams(%j) -> %j', (query, expected) => {
    const input = PostDomain.convertNumberQueryParams(query)
    expect(input).toEqual(expected)
  })
})
