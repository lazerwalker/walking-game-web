import { ActionCreatorsMapObject, createActionPayload } from "./actionTypeHelpers";
import { Screens } from "./screens";
import { CatalogItem, Player } from "./types";

export enum ActionType {
  UpdatePlayer = "updatePlayer",
  UpdateCatalog = "updateCatalog",
  ShowScreen = "showScreen"
}

export type Action = 
| { type: ActionType.UpdatePlayer, value: Partial<Player>}
| { type: ActionType.UpdateCatalog, value: CatalogItem[]}
| { type: ActionType.ShowScreen, value: Screens }

export const NewAction: ActionCreatorsMapObject = {
  UpdatePlayer: createActionPayload<ActionType.UpdatePlayer, Player>(ActionType.UpdatePlayer),
  UpdateCatalog: createActionPayload<ActionType.UpdateCatalog, CatalogItem[]>(ActionType.UpdateCatalog),
  ShowScreen: createActionPayload<ActionType.ShowScreen, Screen>(ActionType.ShowScreen),
}