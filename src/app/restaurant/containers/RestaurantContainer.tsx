'use client'

import React, { useState, useCallback, useEffect } from 'react'
import CategoryTabs from '../components/CategoryTabs'
import SearchForm from '../components/SearchForm'
import KakaoMap from '@/app/global/components/KakaoMap'
import RestaurantItems from '../components/RestaurantItems'
import { getList } from '../services/actions'
import { List } from 'react-content-loader'

const Loading = () => <List />

type SearchType = {
  mode: 'current' | 'search'
  sido?: string
  sigugun?: string
  category?: string[]
  sort?: string
  lat?: number
  lon?: number
  limit?: number
}

const RestaurantContainer = () => {
  const [search, setSearch] = useState<SearchType>({ mode: 'current' })
  // mode값 -> current = 위치 기반 조회, search = 검색조건을 통한 검색

  const [_search, _setSearch] = useState<SearchType>({ mode: 'current' })

  const [categories, setCategories] = useState<string[]>([])
  const [items, setItems] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const _items = await getList(search)
      setItems(_items)
      console.log('items', _items)
      setLoading(false)
    })()
  }, [search])

  useEffect(() => {
    setSearch((search) => ({ ...search, category: categories }))
  }, [categories]) // 카테고리가 변경될때마다 조회 내용 즉시 반영

  useEffect(() => {
    const { mode, limit, lat, lon } = search

    // 위치 기반 모드 -> 사용자의 위도, 경도 좌표를 최초 1회만 조회
    if (mode === 'current' && !lat && !lon) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setSearch((search) => ({
          ...search,
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          limit: limit < 1 ? 50 : limit,
        }))
      })
    }
  }, [search])

  const onChange = useCallback((e) => {
    _setSearch((search) => ({ ...search, [e.target.name]: e.target.value }))
  }, [])

  const onClick = useCallback((field, value) => {
    _setSearch((search) => ({ ...search, [field]: value }))
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

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()

      // Tab 클릭시 바로 반영
      // 근처에서 찾는거에서 카테고리 추가하면 좋겠음

      setSearch(_search)
    },
    [_search],
  )

  const onMoveToLocation = useCallback((lat, lon) => {}, [])

  return (
    <>
      <CategoryTabs categories={categories} onClick={onTabClick} />
      <SearchForm
        form={_search}
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
      />
      <KakaoMap />
      {loading ? (
        <Loading />
      ) : (
        <RestaurantItems items={items} onClick={onMoveToLocation} />
      )}
    </>
  )
}

export default React.memo(RestaurantContainer)
