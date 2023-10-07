import React from 'react'

export default function Item({elem}) {
  return (
    <div className={['item', elem ? 'item-filled': 'item-empty'].join(' ')}>
        {elem}
    </div>
  )
}
