import { PlayFab, PlayFabClient } from "playfab-sdk"
import { getUuid, setUserId } from "./cache";
import playFabPromisify from "./playFabPromisify";
import { User } from "./user";

const titleId = PlayFab.settings.titleId = "381AF";
let playFabEntityKey: PlayFabClientModels.EntityKey | undefined
let playFabUserId: string | undefined 
let isLoggedIn = false

export async function logInWithPlayfab(): Promise<User> {
    // TODO
    // if (iOS) { return logInWithGameCenter() }
    // if (android) { return logInWithGooglePlayGames() }
    return logInWithCustomId()
}

async function logInWithCustomId() {
    const request = { ...loginRequest(), CustomId: getUuid() }
    const response = await playFabPromisify(PlayFabClient.LoginWithCustomID)(request)
    return handleLoginResponse(response)
}

function loginRequest(): PlayFabClientModels.LoginWithCustomIDRequest {
return {
    TitleId: titleId,
    CreateAccount: true,
    InfoRequestParameters: {
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
}

const handleLoginResponse = async (result: PlayFabModule.IPlayFabSuccessContainer<PlayFabClientModels.LoginResult>): Promise<User> => {
    console.log(result)
    let user: Partial<User> = {}

    const payload = result.data.InfoResultPayload
    if (payload) {
        user.currency = payload.UserVirtualCurrency.CC
        user.inventory = payload.UserInventory
    }

    playFabUserId = result.data.PlayFabId
    if (playFabUserId) {
        setUserId(playFabUserId)
        user.id = playFabUserId
    }

    if (payload.PlayerProfile && payload.PlayerProfile.DisplayName) {
        user.displayName = payload.PlayerProfile.DisplayName
    }

    console.log("Setting user id", playFabUserId)

    if (result.data.EntityToken) {
        playFabEntityKey = result.data.EntityToken.Entity
    }

    isLoggedIn = true

    // registerForPushNotifications()

    // TODO: Is there a reasonable way to check if all properties exist and if not fail?
    return user as User
}

export async function getCatalogItems(): Promise<PlayFabClientModels.CatalogItem[]> {
    const result = await playFabPromisify(PlayFabClient.GetCatalogItems)(null)
    return result.data.Catalog
}