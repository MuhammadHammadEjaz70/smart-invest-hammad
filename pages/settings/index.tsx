import Setting from '@/components/Setting/Setting'
import AuthGuard from '@/utils/authGuard'
import React from 'react'

function index() {
  return (
    <div>
      <AuthGuard type='private'>
        <Setting />
      </AuthGuard>
    </div>
  )
}

export default index