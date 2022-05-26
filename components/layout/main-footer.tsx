import Link from 'next/link'
import React from 'react'
import classes from "./main-footer.module.scss"

const MainFooter = () => {
  return (
    <div className={classes.container}>
      <nav>
        <Link href="#"><a>Terms of service</a></Link>
        <Link href="#"><a>Privacy</a></Link>
        <Link href="/admin"><a>Admin</a></Link>
      </nav>
    </div>
  )
}

export default MainFooter