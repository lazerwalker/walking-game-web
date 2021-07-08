import { Action, ActionType } from "./actions";
import { CatalogItem, Player } from "./types"

// TODO: This has fields that may be uninitialized before the app is 
// done loading, but conceptually should always exist after.
// Is there a better pattern for that?
export type State = {
  player?: Player
  catalog?: CatalogItem[]
}

export const initialState: State = {}

export default (oldState: State, action: Action): State => {
  const state: State = JSON.parse(JSON.stringify(oldState));

  switch(action.type) {
    case ActionType.UpdatePlayer: {
      state.player = {...state.player || {}, ...action.value as Player}
      break;
    }
    case ActionType.UpdateCatalog: {
      state.catalog = action.value
      break;
    }
  }

  return state
}