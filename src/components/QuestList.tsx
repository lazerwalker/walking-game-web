import React from 'react'
import { CatalogItem, QuestInstance } from '../types'
import QuestItemView from './QuestItemView'

interface Props {
  quests: QuestInstance[]
}

export default (props: Props) => {
  const {quests} = props

    return (
    <div>
      {quests.map(q => <QuestItemView quest={q} key={q.id}/>)}
    </div>
  )
}