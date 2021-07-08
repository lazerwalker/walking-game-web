import React, { useContext } from 'react'
import { NewAction } from '../actions';
import { buyDailyQuest } from '../playFab';
import { CatalogItem } from '../types';
import { DispatchContext } from './App';

interface Props {
  item: CatalogItem
  playerAlreadyHas: boolean
}

export default function(props: Props) {
  const dispatch = useContext(DispatchContext);
  const {item, playerAlreadyHas} = props

  async function buy() {
    if (playerAlreadyHas) return
    console.log("Buying!")
    const player = await buyDailyQuest(item)
    dispatch(NewAction.UpdatePlayer(player))
  }

  return <div className={playerAlreadyHas ? "already-owned" : ""}>
    <h3>{item.displayName}</h3>
    {item.description}
    <button onClick={buy}>${item.price}</button>
  </div>
}