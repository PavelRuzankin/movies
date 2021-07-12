import React from "react"
import CSSModules from "react-css-modules"

import { useData } from "../../context"

import MovieCard from "./MovieCard"

import styles from "./movies.module.scss"

const MoviesList: React.FC = (props) => {

  const { movies, removeFavorite, addFavorite, isFavorite } = useData()

  const changeFavorite = (id: number) => {
    isFavorite(id) ? removeFavorite(id) : addFavorite(id)
  }

  return (
    <div className={styles.movies}>
      <div className={styles.container}>
        {
          movies.map((movie, index) => (
            <MovieCard 
              key={`${movie.id}:${index}`}
              isFavorite={isFavorite(movie.id)}
              title={movie.title}
              image={movie.image}
              id={movie.id}
              average={movie.average}
              changeFavorite={changeFavorite}
            />
          ))
        }
      </div>
    </div>
  )
}

export default CSSModules(MoviesList, styles)