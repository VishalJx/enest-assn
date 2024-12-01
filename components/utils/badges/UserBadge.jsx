import React from 'react'

const UserBadge = () => {
  return (
    <div className='rounded-full'>
        <Image
            src="/user.png"
            alt="user"
            width={40}
            height={40}
        />
    </div>
  )
}

export default UserBadge