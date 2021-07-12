import React from "react"
import CSSModules from "react-css-modules"

import styles from "./button.module.scss"

interface ButtonProps {
  children: React.ReactElement | string | number
  onClick: (event: React.MouseEvent) => void
}

const Button: React.FC<ButtonProps> = (props): React.ReactElement => {
  return (
    <button 
      onClick={props.onClick}
      onMouseDown={event => event.preventDefault()} 
      className={styles.button}
    >
      {props.children}
    </button>
  )
}

export default CSSModules(Button, styles)