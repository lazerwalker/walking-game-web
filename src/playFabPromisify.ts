// Wraps a PlayFab function in a promise!

export default function<T extends PlayFabModule.IPlayFabResultCommon>(
    fn: (request: PlayFabModule.IPlayFabRequestCommon, cb: PlayFabModule.ApiCallback<T>) => void
): (request: PlayFabModule.IPlayFabRequestCommon) => Promise<PlayFabModule.IPlayFabSuccessContainer<T>> {
    return (request: PlayFabModule.IPlayFabRequestCommon) => {
        return new Promise((resolve, reject) => {
            fn(request, (error: PlayFabModule.IPlayFabError, result: PlayFabModule.IPlayFabSuccessContainer<T>) => {
                if (error) {
                    console.error(error)
                    console.error(request)
                    reject(error)
                }
                resolve(result)
            })
        })
    }
}