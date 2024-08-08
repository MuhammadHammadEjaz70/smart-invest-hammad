import Notification from '@/components/Notification/Notification'
import AuthGuard from '@/utils/authGuard'
import React from 'react'

function index() {
  return (
    <div>
      <AuthGuard type={'private'}>
        <Notification />
      </AuthGuard>
    </div>
  )
}

export default index