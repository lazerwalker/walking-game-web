import { ActionCreatorsMapObject, createActionPayload } from "./actionTypeHelpers";
import { CatalogItem, Player } from "./types";

export enum ActionType {
  UpdatePlayer = "updatePlayer",
  UpdateCatalog = "updateCatalog"
}

export type Action = 
| { type: ActionType.UpdatePlayer, value: Partial<Player>}
| { type: ActionType.UpdateCatalog, value: CatalogItem[]}

export const NewAction: ActionCreatorsMapObject = {
  UpdatePlayer: createActionPayload<ActionType.UpdatePlayer, Player>(ActionType.UpdatePlayer),
  UpdateCatalog: createActionPayload<ActionType.UpdateCatalog, CatalogItem[]>(ActionType.UpdateCatalog)
}