import _ from "lodash"
import React, { useCallback, useEffect } from "react"
import { useData } from "../../context"
import Loading from "../UI/Loading"

import styles from "./autoLoader.module.scss"

interface AutoLoaderProps {
  children: React.ReactNode
}

const AutoLoader: React.FC<AutoLoaderProps> = (props): React.ReactElement => {
  
  const { loading, page, totalPages, setPage } = useData()
  
  const setFollowingPage = useCallback(_.debounce(() => {
    
    if(!loading && page < totalPages){
      setPage()
    }
  }, 100), [totalPages, page, loading ]) 

  const scrollHandler = (event: any) => {
    if(event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100){
      setFollowingPage()
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return () => document.removeEventListener("scroll", scrollHandler)
  }, [scrollHandler])

  return (
    <>
      { props.children }
      <div className={styles.loadZone}>
        {
          loading && (
            <Loading/>
          )
        }
      </div>
    </>
  )
}

export default AutoLoader