import React from 'react'
import Menu from './Menu'

const Header: React.FC = () => {
  return (
    <header>
        <Menu location={process.env.NEXT_PUBLIC_WP_MENU_PRIMARY || ''} />
    </header>
  )
}

export default Header