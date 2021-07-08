import React from 'react'
import { Player } from '../types'

export default function(props: {player: Player}) {
  const {player} = props
  return <div>${player.currency}</div>
}