import React from "react"
import CSSModules from "react-css-modules"

import Dropdown from '../UI/Controls/Dropdown'

import { useData } from "../../context"

import styles from "./header.module.scss"
import _ from "lodash"
import { Genre, SortType } from "../../context/types"

const Activities: React.FC = (): React.ReactElement => {

  const { options, config, setGenres, setSorting } = useData()
  const genres = options.genres
  const sortTypes = options.sortTypes
  
  const formatValue = (value: string[], options: Genre[] | SortType[]) => {
    const formattedValue: Genre [] | SortType [] = []

    value.forEach(value => {
      const genre = options.find(genre => genre.id === value)
      genre && formattedValue.push(genre)
    })

    return formattedValue
  }

  const scrollToTop = () => window.scrollTo(0, 0)

  const updateGenres = (genresValue: string[]) => {
    scrollToTop()
    setGenres(formatValue(genresValue, genres)) 
  }

  const updateSorting = (sortingValue: string[]) => {
    scrollToTop()
    setSorting(formatValue(sortingValue, sortTypes)) 
  }

  const genresValue = config.genres.map(({id}) => id)
  const sortingValue = config.sorting.map(({id}) => id)
  
  return (
    <div className={styles.activities}>
      <Dropdown 
        placeholder={"Выбрать жанр"}
        items={options.genres}
        value={genresValue}
        onChange={updateGenres}
        multiselect={true}
      />
      <Dropdown 
        placeholder={"Сортировать"}
        items={options.sortTypes}
        value={sortingValue}
        onChange={updateSorting}
      />
    </div>
  )
}

export default CSSModules(Activities, styles)