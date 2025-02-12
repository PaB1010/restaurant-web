'use client'

import React, { useState, useCallback, useEffect } from 'react'
import CategoryTabs from '../components/CategoryTabs'
import SearchForm from '../components/SearchForm'
import RestaurantItems from '../components/RestaurantItems'
import KakaoMap from '@/app/global/components/KakaoMap'

type SearchType = {
  sido?: string
  sigugun?: string
  category?: string[]
  sort?: string
  lat?: number
  lon?: number
  limit?: number
}

const RestaurantContainer = () => {
  const [search, setSearch] = useState<SearchType | undefined>()

  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {}, [categories]) // 카테고리가 변경될때마다 조회 내용 즉시 반영

  const onChange = useCallback((e) => {
    setSearch((search) => ({ ...search, [e.target.name]: e.target.value }))
  }, [])

  const onTabClick = useCallback((category) => {
    setCategories((categories) => {
      // 카테고리가 이미 있으면 중복 제거 (Set)
      const set = new Set(categories)

      // 토글 형태로 없는것만 추가, 있는것은 제거하는 기능
      if (set.has(category)) {
        set.delete(category)
      } else {
        set.add(category)
      }

      return [...set.values()]
    })
  }, [])

  const onSubmit = useCallback((e) => {
    e.preventDefault()

    // Tab 클릭시 바로 반영
    // 근처에서 찾는거에서 카테고리 추가하면 좋겠음

    /* 검색 처리 S */

    /* 검색 처리 E */
  }, [])

  return (
    <>
      <CategoryTabs categories={categories} onClick={onTabClick} />
      <SearchForm form={search} onChange={onChange} onSubmit={onSubmit} />
      <KakaoMap />
      <RestaurantItems />
    </>
  )
}

export default React.memo(RestaurantContainer)
