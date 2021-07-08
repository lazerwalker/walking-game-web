import React, { createContext, useEffect, useReducer } from 'react'
import { Action, NewAction } from '../actions'
import { getCatalogItems, logInWithPlayfab } from '../playFab'
import reducer, { initialState, State } from '../reducer'
import DailyQuestStoreList from './DailyQuestStoreList'
import PlayerHeaderView from './PlayerHeaderView'

export const DispatchContext = createContext(null)

const App = () => {
    const [state, dispatch] = useReducer<(s: State, a: Action) => State>(
    reducer,
    initialState
  );
  useEffect(() => {
    (async () => {
      const player = await logInWithPlayfab()
      dispatch(NewAction.UpdatePlayer(player))

      const catalog = await getCatalogItems()
      dispatch(NewAction.UpdateCatalog(catalog))
    })()
  }, [])
  return (
      <DispatchContext.Provider value={dispatch}>
        <div>
          <h1>Walking Game</h1>
          {state.player ? (
            <div>
              <PlayerHeaderView player={state.player} />
              <DailyQuestStoreList items={state.catalog} playerItemIds={state.player.inventory} />
            </div>
          ) : 
          <div>Loading...</div> 
        }
        </div>
    </DispatchContext.Provider>
  )
}

export default App