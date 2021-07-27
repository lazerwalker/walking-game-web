import React from 'react'
import { Player } from '../types'

export default function(props: {player: Player}) {
  const {player} = props
  return <div>
    <div>${player.currency}</div>
    <div>{JSON.stringify(player.steps)} steps</div> 
    </div>
}