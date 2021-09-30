import React from 'react'
import { RouteComponentProps } from 'react-router'

const FourOhFour = ({history}: RouteComponentProps) => {
  return (
    <div className="ErrorPage">
      <h1>Going somewhere?</h1>
      <button onClick={() => history.push('/')}>Go back to work!</button>
    </div>
  )
}

export default FourOhFour