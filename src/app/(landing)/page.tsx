'use client'

import CreateAccount from '@/src/components/CreateAccount'
import Login from '@/src/components/Login'
import { ToggleTheme } from '@/src/components/ToggleTheme'
import { Button } from '@/src/components/ui/button'
import { useState } from 'react'

export default function Home() {
  const [login, setLogin] = useState<boolean>(true)
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex">
        <h1>teste</h1>
      </div>
      <div className="flex flex-col h-screen">
        <div className="flex items-end justify-end p-8 gap-4">
          {login ? (
            <Button variant="ghost" onClick={() => setLogin(false)}>
              Create account
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setLogin(true)}>
              Login
            </Button>
          )}
          <ToggleTheme />
        </div>
        {!login ? <CreateAccount /> : <Login />}
      </div>
    </div>
  )
}
