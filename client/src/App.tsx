import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import FloatingDockDemo from "@/components/floating-dock-demo"

import { GridBackground } from "@/components/ui/grid-background"

function App() {
  const [username, setUsername] = useState("")
  const [mode, setMode] = useState("profile")
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState("")

  const fetchData = async () => {
    setError("")
    setData(null)
    if (!username) return

    try {
      const endpoint = mode === "stats"
        ? `http://localhost:3000/player/${username}/stats`
        : `http://localhost:3000/player/${username}`

      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const result = await response.json()
      setData(result)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <GridBackground>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8 text-foreground">
        <h1 className="text-4xl font-bold">Chess Stats Viewer</h1>

        <div className="flex w-full max-w-md items-center space-x-2">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profile">Profile</SelectItem>
              <SelectItem value="stats">Stats</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={fetchData}>Search</Button>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        {data && (
          <div className="w-full max-w-2xl bg-card p-6 rounded-lg shadow border flex flex-col gap-6">
            {data.avatar && (
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-32 h-32 border-4 border-primary/10">
                  <AvatarImage src={data.avatar} alt={username} />
                  <AvatarFallback className="text-4xl">{username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {data.name && <h2 className="text-2xl font-semibold">{data.name}</h2>}
              </div>
            )}

            <div className="overflow-auto max-h-[400px] bg-muted/50 p-4 rounded-md">
              <pre className="text-sm text-card-foreground font-mono">{JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>
        )}

        <div className="fixed bottom-4">
          <FloatingDockDemo />
        </div>
      </div>
    </GridBackground>
  )
}

export default App
