'use client'

import React, { useState, useLayoutEffect } from 'react'
import { getCategories } from '../services/actions'
import styled from 'styled-components'
import type { CommonType } from '@/app/global/types/styledType'
import classNames from 'classnames'
import colors from '@/app/global/styles/colors'
import sizes from '@/app/global/styles/sizes'

const { primary, info, white, light } = colors

const { medium } = sizes

const StyledNav = styled.nav<CommonType>`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;

  .tab {
    border: 1px solid ${light};
    background: ${info};
    color: ${white};
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: ${medium};
    margin-bottom: 5px;

    &.on {
      background: ${primary};
      color: ${white};
    }
  }
  .tab + .tab {
    margin-left: 5px;
  }
`

const CategoryTabs = ({ categories, onClick }) => {
  const [items, setItems] = useState<string[]>([])

  useLayoutEffect(() => {
    // 최초 로딩시 데이터 호출

    ;(async () => {
      const data = await getCategories()
      setItems(data)
    })()
  }, [])

  return (
    items &&
    items.length > 0 && (
      <StyledNav>
        {items.map((item) => (
          <div
            key={'category_' + item}
            onClick={() => onClick(item)}
            className={classNames('tab', { on: categories.includes(item) })}
          >
            {item}
          </div>
        ))}
      </StyledNav>
    )
  )
}

export default React.memo(CategoryTabs)
