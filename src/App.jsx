import { useEffect, useState } from 'react'

// The API base URL. VITE_ vars are inlined at build time, so commit this to a
// .env.production — it's baked into the bundle when the Dockerfile builds.
const API = import.meta.env.VITE_API_URL

export default function App() {
  const [messages, setMessages] = useState([])
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await fetch(`${API}/api/messages`)
      if (!res.ok) throw new Error(`API returned ${res.status}`)
      setMessages(await res.json())
      setError(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!API) {
      setError('VITE_API_URL is not set')
      setLoading(false)
      return
    }
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    const text = body.trim()
    if (!text) return
    try {
      const res = await fetch(`${API}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: text }),
      })
      if (!res.ok) throw new Error(`API returned ${res.status}`)
      setBody('')
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <main>
      <h1>Guestbook</h1>
      <p className="muted">React frontend &rarr; API &rarr; Postgres, each its own Dockhold app.</p>

      {!API && (
        <p className="error">
          Set <code>VITE_API_URL</code> to your deployed API URL in a committed
          <code>.env.production</code>, then rebuild.
        </p>
      )}
      {error && API && <p className="error">Couldn't reach the API: {error}</p>}

      <form onSubmit={submit}>
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Leave a message…"
          maxLength={280}
        />
        <button type="submit">Post</button>
      </form>

      {loading ? (
        <p className="muted">Loading…</p>
      ) : (
        <ul>
          {messages.map((m) => (
            <li key={m.id}>
              <span>{m.body}</span>
              <time>{new Date(m.created_at).toLocaleString()}</time>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
