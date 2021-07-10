import React, { useContext } from 'react'
import { NewAction } from '../actions';
import { Screens } from '../screens';
import { DispatchContext } from './App';

interface Props {
  currentScreen: Screens
}

export default function (props: Props) {
  const dispatch = useContext(DispatchContext);
  
  const showStore = () => {
    dispatch(NewAction.ShowScreen(Screens.Store))
  }

  const showInventory = () => {
    dispatch(NewAction.ShowScreen(Screens.Inventory))
  }

  return (
    <div>
      <button 
        onClick={showStore} 
        disabled={props.currentScreen === Screens.Store}>
        Store
      </button>  
      <button 
        onClick={showInventory}  
        disabled={props.currentScreen === Screens.Inventory}>
          Quests
      </button>
    </div>
  )
}