import React, { useContext } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

import { QuestInstance } from '../types';
import { DispatchContext } from './App';
interface Props {
  quest: QuestInstance
}

export default function(props: Props) {
  const dispatch = useContext(DispatchContext);
  const {quest} = props
  console.log(quest.expiration)

  return (
    <div>
      <h3>{quest.displayName}</h3>
      {quest.description}<br/>
      expires {dayjs(quest.expiration).fromNow()}
    </div>
  )
}