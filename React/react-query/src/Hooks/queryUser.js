import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

const req = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API + '/users'
})

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
    queryFn: async () => (await req.get()).data,
    ...queryOptions
  })

export const useQueryUsers = (queryOptions = {}) =>
  useInfiniteQuery({
    queryKey: ['users'],
    queryFn: async (context) => {
      console.log('🚀 ~ queryFn: ~ context:', context)

      const _page = context.pageParam ?? 1
      const _limit = 2

      const { data, headers, ...rest } = await req.get('', { params: { _page, _limit } })
      console.log('🚀 ~ queryFn: ~ rest:', rest)

      const totalPages = Math.ceil(headers['x-total-count'] / _limit)

      return { data, totalPages, currentPage: _page }
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log('🚀 ~ getNextPageParam: ~ lastPage:', lastPage) // data page hiện tại
      console.log('🚀 ~ allPages:', allPages) // data của tất cả các page
      if (lastPage.currentPage === lastPage.totalPages) return void 0 // nếu current page === totalPages thì sẽ ko next nữa
      return allPages.length + 1
    },
    getPreviousPageParam: (lastPage, allPages) => {
      if (lastPage.currentPage > 1 && lastPage.currentPage === allPages.length) return void 0 // nếu page === 1 thì sẽ ko previous nữa
      return allPages.length
    },
    refetchOnWindowFocus: false,
    select: (data) => data?.pages?.flatMap((page) => page.data) || [],
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
export const useQueryUserDetail = (id, queryOptions = {}) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: async (context) => (await req.get(context.queryKey[1])).data,
    initialData: {
      name: 'Loading...',
      email: 'Loading...',
      status: 'Loading...'
    },
    ...queryOptions
  })
