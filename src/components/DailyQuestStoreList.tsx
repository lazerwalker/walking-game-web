import React from 'react'
import { CatalogItem } from '../types'
import DailyQuestStoreItemView from './DailyQuestStoreItemView'

interface Props {
  items: CatalogItem[]
  playerItemIds: string[]
}

export default function(props: Props) {
  console.log(props)
  return (
  <div>
    <h2>Daily Quests</h2>
    {(props.items || []).map(i => {
      return <DailyQuestStoreItemView 
        item={i} 
        key={i.id}
        playerAlreadyHas={props.playerItemIds.includes(i.id)}
      />
    })}
  </div>
  )
}