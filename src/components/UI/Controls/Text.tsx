import React from "react"
import CSSModules from "react-css-modules"

import styles from "./controls.module.scss"

interface TextProps {
  value?: string
  placeholder?: string
  button?: React.ReactElement | null
  onChange?: (value: string) => void,
  onFocusChange?: (focus: boolean) => void
}

const Text: React.ForwardRefRenderFunction<HTMLInputElement, TextProps> = (props, ref): React.ReactElement => {
  
  const onBlur = () => props.onFocusChange && props.onFocusChange(false)
  const onFocus = () => props.onFocusChange && props.onFocusChange(true)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => (
    props.onChange && props.onChange(event.target.value)
  )

  return (
    <div className={styles.text}>
        <input
          value={props.value} 
          type="text" 
          placeholder={props.placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
        {props.button}
    </div>
  )
}

export default React.forwardRef(CSSModules(Text, styles))