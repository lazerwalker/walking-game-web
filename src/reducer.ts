import { Action, ActionType } from "./actions";
import { Screens } from "./screens";
import { CatalogItem, Player } from "./types"

// TODO: This has fields that may be uninitialized before the app is 
// done loading, but conceptually should always exist after.
// Is there a better pattern for that?
export type State = {
  player?: Player
  catalog?: CatalogItem[]
  currentScreen?: Screens
}

export const initialState: State = {}

export default (oldState: State, action: Action): State => {
  const state: State = JSON.parse(JSON.stringify(oldState));

  switch(action.type) {
    case ActionType.UpdatePlayer: {
      state.player = {...state.player || {}, ...action.value as Player}
      break
    }
    case ActionType.UpdateCatalog: {
      state.catalog = action.value
      
      // I really don't like this!
      state.player.inventory = (state.player.inventory || []).map((c) => {
        const catalogItem = state.catalog.find(d => d.id === c.id)
        if (!catalogItem) return

        return {
          id: c.id,
          expiration: c.expiration,
          description: catalogItem.description,
          displayName: catalogItem.displayName,
          price: catalogItem.price
        }
      })
      break
    }
    case ActionType.ShowScreen: {
      state.currentScreen = action.value
      break
    }
  }

  return state
}