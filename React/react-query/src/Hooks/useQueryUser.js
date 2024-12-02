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
 * const { data, isLoading } = useQueryUserDetail(1)
 * if (isLoading) return <div>Loading...</div>
 * return <div>{data.name}</div>
 */
export const useQueryUserDetail = (id = '', queryOptions = {}) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: async ({ signal }) => (await Req.getUserDetail({ id, signal })).data,
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
 * if (hasNextPage) {
 *   fetchNextPage()
 * }
 */

export const useInfiniteQueryUserList = (queryOptions = { initialPageParam: 1 }) => {
  return useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users', 'loadMore'],
    queryFn: async ({ pageParam: _page, signal }) => await Req.getUserList({ params: { _page, _limit: 10 }, signal }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
    select: (data) => data?.pages?.flatMap((page) => page.data) || [],
    ...queryOptions
  })
}

// select: (data) => data?.pages?.map((page) => page.data) || [],
