import React from "react"
import CSSModules from "react-css-modules"

import styles from "./tags.module.scss"

interface TagListProps {
  tags: { id: string, text: string }[]
  title?: string
  editable?: boolean
  onDelete?: (id: string) => void
}

const TagList: React.FC<TagListProps> = (props): React.ReactElement => {

  const onDelete = (id: string) => {
    props.onDelete && props.onDelete(id)
  }

  return (
    <div className={styles.tags}>
      { props.title && <h1>{ props.title }</h1> }
      {
        !!props.tags.length && (
          <ul className={styles.list}>
            {
              props.tags.map(tag => {

                return (
                  <li key={tag.id}>
                    <span>{ tag.text }</span>
                    {
                      props.editable && (
                        <span className={styles.close} onClick={() => onDelete(tag.id)}>
                          <i className="fas fa-times" ></i>
                        </span>
                      )
                    }
                  </li>
                )
                
              })
            }
          </ul>
        )
      }
    </div>
  )
}

export default CSSModules(TagList, styles)