'use client'

import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import type { CommonType } from '../types/styledType'

const StyledMap = styled.div<CommonType>`
  height: 350px;
  margin-bottom: 50px;
`

type Props = {
  center: any
  locations: any[]
  pan?: any
}

const KakaoMap = ({ center, locations, pan }: Props) => {
  const mapRef = useRef<any>(undefined)

  const mContainer = useRef<any>(undefined)

  useEffect(() => {
    if (pan && pan.lat && pan.lon && mContainer && mContainer.current) {
      const moveLatLng = new window.kakao.maps.LatLng(pan.lat, pan.lon)
      mContainer.current.panTo(moveLatLng)
    }
  }, [pan, mContainer])

  useEffect(() => {
    if (mapRef) {
      const mapContainer = mapRef.current

      const mapOption = {
        center: new window.kakao.maps.LatLng(center.lat, center.lon), // 지도의 중심좌표
        level: 1, // 지도의 확대 레벨
      }

      const map = new window.kakao.maps.Map(mapContainer, mapOption)
      mContainer.current = map

      const closeInfoWindow = []

      for (const loc of locations) {
        const position = new window.kakao.maps.LatLng(loc.lat, loc.lon)
        const marker = new window.kakao.maps.Marker({
          position,
        })

        marker.setMap(map)

        const windowHTML = `<div class='info-window'>
          <div class='row'>카테고리: ${loc.category}</div>
          <div class='row'>식당명 : ${loc.name}</div>
          <div class='row'>주소: ${loc.address}</div>
          <span>[X]</span>
        </div>`

        const infoWindow = new window.kakao.maps.InfoWindow({
          position,
          content: windowHTML,
        })

        window.kakao.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker)
        })
      }
    }
  }, [mapRef, locations, center])

  return <StyledMap ref={mapRef}></StyledMap>
}

export default React.memo(KakaoMap)
