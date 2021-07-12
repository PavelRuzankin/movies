import React, { useState } from "react"
import _ from "lodash"

import styles from './checkbox.module.scss'

interface CheckBoxProps {
  text: string
  id: number
  checked: boolean
  onChange: (id: number, checked: boolean) => void
}

const CheckBox: React.FC<CheckBoxProps> = (props): React.ReactElement => {

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(props.id, event.target.checked)
  }

  return (
    <>
      <input 
        checked={props.checked}
        onChange={onChange}
        type="checkbox" 
        className={styles.checkbox} 
        id={_.toString(props.id)} 
        name="happy" 
        value="yes"
      />
      <label
        htmlFor={_.toString(props.id)} 
      > 
        { props.text } 
      </label>
    </>
  )
}

export default CheckBox