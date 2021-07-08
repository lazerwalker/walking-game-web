import React, { useEffect } from 'react'
import { getCatalogItems, logInWithPlayfab } from './playFab'


const App = () => {
  useEffect(() => {
    (async () => {
      console.log("In useEffect")
      const user = await logInWithPlayfab()
      console.log("Logged in with PlayFab!", user)
      const catalog = await getCatalogItems()
      console.log("Catalog", catalog)
    })()
  }, [])
  return (<h1>Walking Game</h1>)
}

export default App