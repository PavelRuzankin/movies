import Reaact from "react"
import cn from "classnames"

import styles from "./average.module.scss"


interface AverageProps {
  count: number
  full?: boolean
}

export const Average: React.FC<AverageProps> = (props): React.ReactElement => {
  return (
    <div
      title={"Оценка"}
      className={cn(styles.average, {
        [styles.full]: props.full
      })}
    >
      <span>{ props.count }</span>
      <i className="fas fa-star"></i>
    </div>
  ) 
}

export default Average