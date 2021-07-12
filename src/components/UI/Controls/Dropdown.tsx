import React, { useCallback, useEffect, useRef, useState } from "react"
import CSSModules from "react-css-modules"
import cn from "classnames"

import Text from "./Text"
import Button from "../Button"

import styles from "./controls.module.scss"
import _ from "lodash"

type DropdownItem = {
  id: string
  text: string
}

type value = string[]

interface DropdownProps {
  items: DropdownItem[]
  value: value,
  multiselect?: boolean
  placeholder?: string
  onChange?: (id: value) => void
  onVisibleChange?: (visible: boolean) => void 
} 

const Dropdown: React.FC<DropdownProps> = (props): React.ReactElement => {

  const [ open, setOpen ] = useState(false)
  const [ value, setValue] = useState('')
  const [ items, setItems ] = useState(props.items)
  const textRef = useRef<HTMLInputElement>(null)

  useEffect(() => setItems(props.items), [props.items])

  const hasValue = () => !!props.value.length

  const isSelected = (id: string) => props.value.includes(id)

  const filterItems = useCallback(_.debounce((text: string) => {
    
    const filteredItems = props.items.filter(item => {
      return item.text.toLowerCase().includes(text.toLowerCase())
    })
    
    setItems(filteredItems)
  }, 400), [props.items])

  const prepareNewValue = (id: string): value => {

    if(props.multiselect){
      const value = [...props.value]
      const itemIndex = value.findIndex(valueId => valueId === id)
      itemIndex > -1 ? value.splice(itemIndex, 1) : value.push(id)
      
      return value

    } else {
      return [ id ]
    }
  }

  const showValue = (): string | undefined => {

    const selectedItemsText: string[] = [] 
    
    props.value.forEach(valueId => {
      const item = props.items.find(item => item.id === valueId)
      if(item){
        selectedItemsText.push(item.text)
      }
    })

    return selectedItemsText.join(", ")
  }

  const onSelect = (event: React.MouseEvent, id: string) => {

    event.preventDefault()
    event.stopPropagation()

    const value = prepareNewValue(id)
    
    props.onChange && props.onChange(value)
    !props.multiselect && textRef.current?.blur()
  }

  const onClear = () => props.onChange && props.onChange([])

  const onVisibleChange = (visible: boolean) => {
    props.onVisibleChange && props.onVisibleChange(visible)
    setOpen(visible)
    if(!visible){
      setValue("")
      setItems(props.items)
    }
  }

  const onChangeInputValue = (value: string) => {
    setValue(value)
    filterItems(value)
  }


  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownWrapper}>
        <Text
          onChange={onChangeInputValue}
          value={value}
          placeholder={showValue() || props.placeholder}
          onFocusChange={onVisibleChange}
          ref={textRef}
          button={
            open && hasValue() ? (
              <Button onClick={onClear}>
                <i className="fas fa-times"></i>
              </Button>
            ) : null
          }
        />
        {
          open && items.length ? (
            <ul className={styles.dropdownList} >
              {
                items.map(item => {

                  const selected = isSelected(item.id)

                  return (
                    <li 
                      onClick={event => onSelect(event, item.id)}
                      onMouseDown={event => event.preventDefault()}
                      title={item.text}
                      className={cn(styles.dropdownItem, {
                        [styles.dropdownItemChecked]: selected
                      })}
                      key={item.id}
                    >
                      <span> {item.text} </span> 
                      {selected && <i className="fas fa-check"></i>}
                    </li>
                  )
                })
              }
            </ul>
          ) : null
        }
      </div>
    </div>
    
  )
}

export default CSSModules(Dropdown, styles)