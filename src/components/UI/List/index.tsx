import React from "react"
import MovieImage from "../../MovieImage"
import Button from "../Button"
import styles from "./list.module.scss"

interface ListItem {
  id: number
  text: string
  image: string
}

interface ListProps {
  items: ListItem[]
  onClick: (id: number) => void
  onRemove: (id: number) => void
}

const List: React.FC<ListProps> = (props) => {

  const onClick = (id: number) => {
    props.onClick && props.onClick(id)
  }

  const onRemove = (event: React.MouseEvent, id: number) => {
    event.stopPropagation()
    props.onRemove && props.onRemove(id)
  }

  return (
    <div className={styles.list}>
      {
        props.items.map(item => (
          <div
            key={item.id}
            onClick={() => onClick(item.id) } 
            className={styles.item}
          >
            <div className={styles.imageWrapper}>
              <MovieImage image={item.image} />
            </div>
            <span> { item.text } </span>
            <Button onClick={event => onRemove(event, item.id) }>
              <i className="fas fa-times"></i>
            </Button>  
          </div>
        ))
      }
    </div>
  )
}

export default List