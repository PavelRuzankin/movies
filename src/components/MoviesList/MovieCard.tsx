import React from "react"
import CSSModules from "react-css-modules"
import { Link } from "react-router-dom"

import MovieImage from "../MovieImage"
import Average from "../UI/Average"
import CheckBox from "../UI/ChaeckBox"

import styles from "./movies.module.scss"

interface MovieCardProps {
  id: number
  image: string
  title: string
  average: number
  isFavorite: boolean
  changeFavorite?: (id: number) => void
}

const MovieCard: React.FC<MovieCardProps> = (props): React.ReactElement => {

  const onCheck = (id: number, checked: boolean) => {
    props.changeFavorite && props.changeFavorite(id)
  }

  return (
    <div className={styles.movieCardWrapper}>
      <Link 
        onClick={event=> event.stopPropagation()} 
        className={styles.movieCard} 
        to={`/movie/${props.id}`}
      >
        <MovieImage image={props.image} />
        <div className={styles.info}>
          <h1 title={props.title}> {props.title} </h1>
          <Average count={props.average}/>
          <div
            onClick={event => event.stopPropagation()} 
            className={styles.favoriteWrapper}
          >
            <CheckBox 
              checked={props.isFavorite}
              id={props.id}
              text={"Добывить в избранное"}
              onChange={onCheck}
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CSSModules(MovieCard, styles)