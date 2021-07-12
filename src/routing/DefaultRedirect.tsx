import React from 'react'
import { Redirect } from "react-router-dom"

const DefaultRedirect: React.FC = (): React.ReactElement => {

  const redirectPath: string = "/movies"

  return (
    <Redirect to={redirectPath}/>
  )
}

export default DefaultRedirect