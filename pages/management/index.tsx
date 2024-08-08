import Management from '@/components/Management'
import AuthGuard from '@/utils/authGuard'
import React from 'react'

function index() {    
  return (
    <div>
      <AuthGuard type={'private'}>
        <Management />
      </AuthGuard>
    </div>
  )
}

export default index