import React from "react"
import CSSModules from "react-css-modules"
import AutoLoader from "../components/AutoLoader"

import ConfigView from "../components/ConfigView"
import MoviesList from "../components/MoviesList"

import styles from "./pages.module.scss"
const Main: React.FC = (): React.ReactElement => {
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <AutoLoader>
          <ConfigView/>
          <MoviesList/>
        </AutoLoader>
      </div>
    </div>
  )
}

export default CSSModules(Main, styles)