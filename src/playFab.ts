import { PlayFabClient } from "playfab-sdk"
import { getUuid, setUserId } from "./cache";
import playFabPromisify from "./playFabPromisify";

const titleId = "78FDA";
let playFabEntityKey: PlayFabClientModels.EntityKey | undefined
let playFabUserId: string | undefined 
let isLoggedIn = false

export async function logInWithPlayfab() {
    // TODO
    // if (iOS) { return logInWithGameCenter() }
    // if (android) { return logInWithGooglePlayGames() }
    return logInWithCustomId()
}

function logInWithCustomId() {
        const request = { ...loginRequest(), CustomId: getUuid() }
        return playFabPromisify(PlayFabClient.LoginWithCustomID)(request).then(handleLoginResponse)
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
        GetUserVirtualCurrency: false
    }
}
}

const handleLoginResponse = async (result: PlayFabModule.IPlayFabSuccessContainer<PlayFabClientModels.LoginResult>) => {
    console.log(result)

    // const payload = result.data.InfoResultPayload
    // if (payload) {
    //     await handleCombinedPayload(payload)
    // }

    playFabUserId = result.data.PlayFabId
    if (playFabUserId) {
        setUserId(playFabUserId)
    }

    console.log("Setting user id", playFabUserId)

    if (result.data.EntityToken) {
        playFabEntityKey = result.data.EntityToken.Entity
    }

    isLoggedIn = true

    // registerForPushNotifications()

    return playFabUserId
}