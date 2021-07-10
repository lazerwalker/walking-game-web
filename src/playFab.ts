import { PlayFab, PlayFabClient } from "playfab-sdk"
import { getUuid, setUserId } from "./cache";
import playFabPromisify from "./playFabPromisify";
import { CatalogItem, Player } from "./types";

const titleId = PlayFab.settings.titleId = "381AF";
let playFabUserId: string | undefined 
let isLoggedIn = false

export async function logInWithPlayfab(): Promise<Player> {
    // TODO
    // if (iOS) { return logInWithGameCenter() }
    // if (android) { return logInWithGooglePlayGames() }
    return logInWithCustomId()
}

async function logInWithCustomId() {
    const request = { ...loginRequest(), CustomId: getUuid() }
    const response = await playFabPromisify(PlayFabClient.LoginWithCustomID)(request)
    return handlePlayerInfoResponse(response)
}

function loginRequest(): PlayFabClientModels.LoginWithCustomIDRequest {
    return {
        TitleId: titleId,
        CreateAccount: true,
        InfoRequestParameters: infoRequestParameters()
    }
}

function infoRequestParameters(): PlayFabClientModels.GetPlayerCombinedInfoRequestParams {
    return {
        GetUserData: true,
        GetPlayerProfile: true,
        GetPlayerStatistics: true,
        GetUserInventory: true,
        GetUserVirtualCurrency: true,

        // TODO: We will likely need these, but I need to PR in some fixes to the TS types to make this not painful
        // ProfileConstraints: {
        //     ShowAvatarUrl: true,
        //     ShowDisplayName: true
        // },

        // These are all marked as "required" but also "false by default". The typings say we need them /shrug
        GetCharacterInventories: false,
        GetCharacterList: false,
        GetTitleData: false,
        GetUserAccountInfo: false,
        GetUserReadOnlyData: false,
    }
}

const handlePlayerInfoResponse = async (result: PlayFabModule.IPlayFabSuccessContainer<PlayFabClientModels.LoginResult>|PlayFabModule.IPlayFabSuccessContainer<PlayFabClientModels.GetPlayerCombinedInfoResult> ): Promise<Player> => {
    console.log(result)
    let player: Partial<Player> = {}

    const payload = result.data.InfoResultPayload
    if (payload) {
        player.currency = payload.UserVirtualCurrency.CC
        player.inventory = payload.UserInventory.map(i => {
            return {
                id: i.ItemId,
                expiration: new Date(i.Expiration)
            }
        })
    }

    playFabUserId = result.data.PlayFabId
    if (playFabUserId) {
        setUserId(playFabUserId)
        player.id = playFabUserId
    }

    if (payload.PlayerProfile && payload.PlayerProfile.DisplayName) {
        player.displayName = payload.PlayerProfile.DisplayName
    }

    isLoggedIn = true

    // registerForPushNotifications()

    // TODO: Is there a reasonable way to check if all properties exist and if not fail?
    return player as Player
}

export async function getCatalogItems(): Promise<CatalogItem[]> {
    const result = await playFabPromisify(PlayFabClient.GetCatalogItems)(null)
    return (result.data.Catalog || []).map(item => {
        return {
            id: item.ItemId,
            displayName: item.DisplayName,
            description: item.Description,
            price: item.VirtualCurrencyPrices["CC"]
        }
    })
}

export async function buyDailyQuest(item: CatalogItem) {
    // TODO: I don't think PlayFab lets you say "the user can have at most 1 of this item"
    // We'll eventually want to move buying logic to a cloud function to enforce this
    
    const request: PlayFabClientModels.PurchaseItemRequest = {
        ItemId: item.id,
        Price: item.price,
        VirtualCurrency: "CC"
    }
    const result = await playFabPromisify(PlayFabClient.PurchaseItem)(request)

    // TODO: We could theoretically optimize away 1 API call by 
    // manually calculating price and inventory.
    // This is cleaner (if maybe slower) as long as it works
    const playerRequest = {
        InfoRequestParameters: infoRequestParameters()
    }
    const playerResponse = await playFabPromisify(PlayFabClient.GetPlayerCombinedInfo)(playerRequest)
    console.log(playerResponse)
    const player = await handlePlayerInfoResponse(playerResponse) 
    console.log(player)
    return player
}