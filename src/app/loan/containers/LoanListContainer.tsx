'use client'

import React from 'react'
import LoanForm from '../components/LoanForm'
// import { useSearchParams } from 'next/navigation'

const LoanListContainer = () => {
  // const searchParams = useSearchParams()

  return <LoanForm />
}

export default React.memo(LoanListContainer)
