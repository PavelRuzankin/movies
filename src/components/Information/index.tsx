import React from "react"

import TagList from "../UI/TagList"
import CheckBox from "../UI/ChaeckBox"

import { Genre } from "../../context/types"

import styles from "./info.module.scss"
import Average from "../UI/Average"

interface InformationProps {
  title: string
  average: number
  release: string
  genres: Genre[]
  description: string
  isFavorite: boolean
  onChageFavorite: () => void
} 

const Information: React.FC<InformationProps> = (props): React.ReactElement => {
  const checkboxText = props.isFavorite ? "В избранном" : "Добавить в избранное"
  return (
    <div className={styles.information}>
      <h1 className={styles.title}> {props.title} </h1>
      <h2 className={styles.date}>Дата выпуска: {props.release}</h2>
      <Average count={props.average} full={true} />
      <TagList tags={props.genres} />
      <p className={styles.description}>
        {props.description}
      </p>
      <CheckBox 
        text={checkboxText} 
        id={Math.random()} 
        onChange={props.onChageFavorite} 
        checked={props.isFavorite}
      />
    </div>
  )
}

export default Information