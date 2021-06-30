import React, { useEffect } from 'react'
import { logInWithPlayfab } from './playFab'


const App = () => {
  useEffect(() => {
    (async () => {
      console.log("In useEffect")
      const id = await logInWithPlayfab()
      console.log("Logged in with PlayFab!", id)
    })()
  }, [])
  return (<h1>Walking Game</h1>)
}

export default App