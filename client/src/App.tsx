import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button as MovingButton } from "@/components/ui/moving-border"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FloatingDockDemo from "@/components/floating-dock-demo"
import StatsGrid from "@/components/stats-grid"

import { GridBackground } from "@/components/ui/grid-background"

function App() {
  const [username, setUsername] = useState("")
  const [mode, setMode] = useState("profile")
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setError("")
    setData(null)
    if (!username.trim()) {
      setError("Please enter a username")
      return
    }

    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const endpoint = mode === "stats"
        ? `${apiUrl}/player/${username.trim()}/stats`
        : `${apiUrl}/player/${username.trim()}`

      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const result = await response.json()
      setData(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchData()
    }
  }

  return (
    <GridBackground>
      <div className="min-h-screen flex flex-col items-center pt-12 md:pt-32 p-4 space-y-6 md:space-y-8 text-foreground relative">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Chess Stats Viewer</h1>

        <div className="flex flex-col md:flex-row w-full max-w-3xl items-center gap-3 md:gap-4">
          <Input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12 md:h-16 text-base md:text-xl px-4 md:px-6 w-full"
          />

          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger className="h-12 md:h-16 w-full md:w-[200px] text-base md:text-xl px-4 md:px-6">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profile" className="text-base md:text-xl py-2 md:py-3">Profile</SelectItem>
              <SelectItem value="stats" className="text-base md:text-xl py-2 md:py-3">Stats</SelectItem>
            </SelectContent>
          </Select>

          <MovingButton
            borderRadius="0.5rem"
            onClick={fetchData}
            disabled={loading}
            className="bg-black text-white border-slate-800 text-base md:text-xl font-semibold disabled:opacity-50"
            containerClassName="h-12 md:h-16 w-full md:w-40"
          >
            {loading ? "Loading..." : "Search"}
          </MovingButton>
        </div>

        {error && <div className="text-red-500 text-sm md:text-base text-center">{error}</div>}

        {data && (
          <div className="w-full max-w-4xl bg-card text-card-foreground rounded-lg border shadow-sm p-4 md:p-6 space-y-4">
            {mode === 'profile' ? (
              <div className="flex flex-col items-center space-y-4">
                <img
                  src={data.avatar || `https://ui-avatars.com/api/?name=${data.username}`}
                  alt={data.username}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary"
                />
                <h2 className="text-xl md:text-2xl font-bold text-center">{data.name || data.username}</h2>
                <div className="grid grid-cols-2 gap-3 md:gap-4 w-full text-center">
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <p className="text-xs md:text-sm text-muted-foreground">Followers</p>
                    <p className="text-lg md:text-xl font-bold">{data.followers}</p>
                  </div>
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <p className="text-xs md:text-sm text-muted-foreground">Country</p>
                    <p className="text-lg md:text-xl font-bold">{data.country?.split('/').pop() || 'Unknown'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-center">Statistics</h2>
                <StatsGrid data={data} />

                <div className="mt-6 md:mt-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Full Response</h3>
                  <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-auto max-h-96 text-xs md:text-sm border border-border">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {mode === 'profile' && (
              <pre className="bg-muted p-3 md:p-4 rounded-lg overflow-auto max-h-96 text-xs md:text-sm mt-4">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
        )}

        <div className="mt-auto w-full">
          <FloatingDockDemo />
        </div>
      </div>
    </GridBackground>
  )
}

export default App
