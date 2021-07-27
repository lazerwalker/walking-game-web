import React, { createContext, useEffect, useReducer } from 'react'
import { Action, NewAction } from '../actions'
import { getCatalogItems, logInWithPlayfab } from '../playFab'
import StepCounter from '../plugins/stepCounter'
import reducer, { initialState, State } from '../reducer'
import { Screens } from '../screens'
import DailyQuestStoreList from './DailyQuestStoreList'
import PlayerHeaderView from './PlayerHeaderView'
import QuestList from './QuestList'
import ScreenSwitcherTabView from './ScreenSwitcherTabView'

export const DispatchContext = createContext(null)

const App = () => {
    const [state, dispatch] = useReducer<(s: State, a: Action) => State>(
    reducer,
    initialState
  );
  useEffect(() => {
    (async () => {
      StepCounter.getStepsToday().then((steps) => {
        console.log(steps)
        dispatch(NewAction.UpdatePlayer({steps}))
      })

      const player = await logInWithPlayfab()
      dispatch(NewAction.UpdatePlayer(player))

      const catalog = await getCatalogItems()
      dispatch(NewAction.UpdateCatalog(catalog))
    })()
  }, [])
  
  let screen
  switch(state.currentScreen) {
      case Screens.Store: {
        screen = <DailyQuestStoreList items={state.catalog} playerItemIds={state.player.inventory.map(i => i.id)} />
        break
      }
      case Screens.Inventory: {
        screen = <QuestList quests={state.player.inventory} />
        break
      }
  }
  return (
      <DispatchContext.Provider value={dispatch}>
        <div>
          <h1>Walking Game</h1>
          {state.player ? (
            <div>
              <PlayerHeaderView player={state.player} />
              {screen}
              <ScreenSwitcherTabView currentScreen={state.currentScreen} />
            </div>
          ) : 
          <div>Loading...</div> 
        }
        </div>
    </DispatchContext.Provider>
  )
}

export default App