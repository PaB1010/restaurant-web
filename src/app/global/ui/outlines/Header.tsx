'use client'

import React from 'react'
import Link from 'next/link'
import { styled } from 'styled-components'
import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri'
import { MdContactPage } from 'react-icons/md'
import { FaUserPlus, FaHome } from 'react-icons/fa'
import colors from '../../styles/colors'
import sizes from '../../styles/sizes'
import useUser from '../../hooks/useUser'
import type { CommonType } from '../../types/StyledType'

const { light, dark } = colors
const { big } = sizes

// scss 문법
const StyledHeader = styled.header<CommonType>`
  .site-top {
    background: ${light};
    height: 45px;

    .layout-width {
      display: flex;
      justify-content: space-between;

      & > div {
        display: flex;
        align-items: center;
        height: 45px;

        .icon-cls {
          color: ${dark};
        }

        a + a {
          margin-left: 10px;
        }
      }

      svg {
        font-size: ${big};
      }
    }
  }
`

const Header = () => {
  const { userInfo, isLogin } = useUser()

  const email = userInfo?.email
  const name = userInfo?.name

  return (
    <StyledHeader>
      <div className="site-top">
        <div className="layout-width">
          {/* 컨텐츠 영역 */}
          <div className="left">
            <Link href="/">
              <FaHome className="icon-cls" />
            </Link>
          </div>
          <div className="right">
            {isLogin ? (
              <>
                {name}({email})님 /
                <a href="/mypage">
                  <MdContactPage className="icon-cls" />
                  마이페이지
                </a>
                <a href="/member/api/logout">
                  <RiLogoutBoxLine className="icon-cls" />
                  로그아웃
                </a>
              </>
            ) : (
              <>
                <a href="/member/join">
                  <FaUserPlus className="icon-cls" /> 회원가입
                </a>
                <a href="/member/login">
                  <RiLoginBoxLine className="icon-cls" /> 로그인
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      {/* site-top */}
    </StyledHeader>
  )
}

export default React.memo(Header)
