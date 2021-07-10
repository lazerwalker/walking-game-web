import React, { useContext } from 'react'
import { NewAction } from '../actions';
import { buyDailyQuest } from '../playFab';
import { CatalogItem, QuestInstance } from '../types';
import { DispatchContext } from './App';

interface Props {
  quest: QuestInstance
}

export default function(props: Props) {
  const dispatch = useContext(DispatchContext);
  const {quest} = props

  return (
    <div>
      <h3>{quest.displayName}</h3>
      {quest.description}
      {quest.expiration}
    </div>
  )
}