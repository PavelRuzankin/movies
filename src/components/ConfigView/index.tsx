import React from "react"
import CSSModules from "react-css-modules"

import { useData } from "../../context" 

import TagList from "../UI/TagList"

import styles from "./config.module.scss"

const ConfigView: React.FC = (props): React.ReactElement => {

  const { config, setGenres, setSorting } = useData()

  const genres = config.genres
  const sorting = config.sorting

  const deleteGenre = (id: string) => {
    const newGenres = [...genres].filter(genre => genre.id !== id)
    setGenres(newGenres)
  }

  const deleteSorting = (id: string) => {
    const newSorting = [...sorting].filter(sortType => sortType.id !== id)
    setSorting(newSorting)
  }

  return (
    <div className={styles.config}>
      {
        !!genres.length && (
          <TagList
            title={"Жанры"}
            tags={genres}
            editable={true}
            onDelete={deleteGenre}
          />
        )
      }
      {
        !!sorting.length && (
          <TagList
            title={"Сортировка"}
            tags={sorting}
            editable={true}
            onDelete={deleteSorting}
          />
        )
      }
    </div>
  )
}

export default CSSModules(ConfigView, styles)