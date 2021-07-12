import React, { useEffect, useLayoutEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { useData } from "../../context"

import Button from "../UI/Button"
import List from "../UI/List"

import styles from "./favorites.module.scss"

const Favorites = () => {

  const {favorites, removeFavorite} = useData()
  const [ open, setOpen ] = useState(false)
  const history = useHistory()


  const onSelectMovie = (id: number) => {
    setOpen(false)
    history.push(`/movie/${id}`)
  }

  const toggleHandler = () => {
      setOpen(!open)
  }

  const onRemove = (id: number) => removeFavorite(id)

  useLayoutEffect(() => {
    if(!favorites.length && open){
      setOpen(false)
    }
  }, [favorites])
  
  return (
    <div className={styles.favorites}>
      <Button onClick={toggleHandler}>
        <i className="fas fa-heart"></i>
      </Button>

      {
        open && !!favorites.length && (
          <div className={styles.listContainer}>
            <List 
              items={favorites}
              onClick={onSelectMovie}
              onRemove={onRemove} 
            />
          </div>
        )
      }

    </div>
  )
}

export default Favorites