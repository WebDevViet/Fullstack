import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
// import axios from 'axios'

import * as Req from '../services/user'

/**
 * Fetches all users.
 * @param {object} queryOptions Options passed to useQuery.
 * @returns {UseQueryResult} useQuery result.
 * @example
 * const { data, isLoading } = useQueryUserList()
 * if (isLoading) return <div>Loading...</div>
 * return <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>
 */
export const useQueryUserList = (queryOptions = {}) =>
  useQuery({
    queryKey: ['users'],
    queryFn: async ({ signal }) => (await Req.getUserList({ signal })).data,
    ...queryOptions
  })

/**
 * Fetches user detail by id.
 * @param {string} id User id.
 * @param {object} queryOptions Options passed to useQuery.
 * @returns {UseQueryResult} useQuery result.
 * @example
 * const { data, isLoading } = useQueryUserDetail('1')
 * if (isLoading) return <div>Loading...</div>
 * return <div>{data.name}</div>
 */
export const useQueryUserDetail = (id = 1, queryOptions = {}) =>
  useQuery({
    queryKey: ['user', +id],
    queryFn: async ({ queryKey, signal }) => (await Req.getUserDetail({ id: queryKey[1], signal })).data,
    initialData: {
      name: 'Loading...',
      email: 'Loading...',
      status: 'Loading...'
    },
    ...queryOptions
  })

/**
 * Fetches users with infinite query.
 * @param {object} queryOptions Options passed to useInfiniteQuery.
 * @returns {useInfiniteQueryUserList} useInfiniteQuery result.
 * @example
 * const { data, fetchNextPage, hasNextPage } = useInfiniteQueryUserList()
 * console.log('🚀 ~ data:', data)
 * if (hasNextPage) {
 *   fetchNextPage()
 * }
 */

export const useInfiniteQueryUserList = (queryOptions = { initialPageParam: 1 }) =>
  useInfiniteQuery({
    queryKey: ['users', 'loadMore'],
    refetchOnWindowFocus: false,
    queryFn: async (context) => {
      // console.log('🚀 ~ queryFn: ~ context:', context)
      const { pageParam, signal } = context
      const _page = pageParam
      const _limit = 2

      const { data, headers } = await Req.getUserList({ params: { _page, _limit }, signal })
      // console.log('🚀 ~ queryFn: ~ rest:', rest)

      const totalPages = Math.ceil(headers['x-total-count'] / _limit)

      return { data, totalPages, currentPage: _page }
    },
    getNextPageParam: (currPage) => {
      // console.log('🚀 ~ currPage:', currPage) // data page hiện tại
      // console.log('🚀 ~ allPages:', allPages) // data của tất cả các page đã query
      if (currPage.currentPage === currPage.totalPages) return void 0 // nếu current page === totalPages thì sẽ ko next nữa
      return currPage.currentPage + 1
    },
    getPreviousPageParam: (currPage) => {
      if (currPage.currentPage > 1 && currPage.currentPage <= currPage.totalPages) return currPage.currentPage - 1
      return void 0 // nếu page === 1 thì sẽ ko previous nữa
    },
    // select: (data) => data?.pages?.map((page) => page.data) || [],
    select: (data) => data?.pages?.flatMap((page) => page.data) || [],
    ...queryOptions
  })
