import React from "react"
import CSSModules from "react-css-modules"
import { Link, useLocation } from "react-router-dom"

import Activities from "./Activities"

import styles from "./header.module.scss"

const Header: React.FC = (): React.ReactElement => {

  const {pathname} = useLocation()
  
  return (
    <header className={styles.header} >
      <div className={styles.container}>
        <Link 
          to={"/movies"} 
          className={styles.title}
        > 
          Movies Data Base 
        </Link>
        {pathname === "/movies" && <Activities/>}
      </div>
    </header>
  )
}

export default CSSModules(Header, styles)