import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import CSSModules from "react-css-modules"
import cn from "classnames"

import { useData } from "../context"

import MovieImage from "../components/MovieImage"
import Loading from "../components/UI/Loading"
import Information from "../components/Information"

import styles from "./pages.module.scss"

const Movie: React.FC = (): React.ReactElement => {

  const params = useParams<{id: string}>()
  const { 
    loading, 
    loadMovie,
    movie, 
    removeMovie, 
    isFavorite, 
    addFavorite, 
    removeFavorite 
  } = useData()


  const onChageFavorite = () => {
    if(movie){
      isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie.id)
    }
  }

  useEffect(() => {

    if(params.id){
      loadMovie(+params.id)
    }

    return () => {
      removeMovie()
    } 

  }, [ params ])
  
  return !loading && movie ? (
    <div className={styles.wrapper}>
      <div className={cn(styles.container, styles.movieWrapper)}>
        <div className={styles.imageWrapper}>
          <MovieImage image={movie.image} type={"big"} />
        </div>

        <Information 
          title={movie.title}
          average={movie.average}
          release={movie.release}
          description={movie.description} 
          genres={movie.genres}
          onChageFavorite={onChageFavorite}
          isFavorite={isFavorite(movie.id)}
        />
      </div>
    </div>
  ) : (
    <div className={styles.loadingWrapper}>
      <Loading/>
    </div>
  )
}

export default CSSModules(Movie, styles)