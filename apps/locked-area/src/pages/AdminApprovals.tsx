import { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'

const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_URL
const HYGRAPH_TOKEN = import.meta.env.VITE_HYGRAPH_TOKEN_LOCKED

interface PendingUser {
  id: string
  name: string
  email: string
  isApproved: boolean
}

const hygraphFetch = async (query: string, variables?: Record<string, unknown>) => {
  const res = await fetch(HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  })
  return res.json()
}

export default function AdminApprovals() {
  const { isAdmin } = useAuth()
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPending = async () => {
    setLoading(true)
    const { data, errors } = await hygraphFetch(
      `query GetPendingUsers {
        members(where: { isApproved: false }) {
          id
          name
          email
          isApproved
        }
      }`
    )
    setLoading(false)
    if (errors) {
      setError('Kunde inte hämta användare.')
      console.error(errors)
    } else {
      setPendingUsers(data?.members || [])
    }
  }

 const approveUser = async (id: string) => {
  try {
    const response = await hygraphFetch(
      `mutation ApproveUser($id: ID!) {
        updateMember(where: { id: $id }, data: { isApproved: true }) {
          id
          isApproved
        }
      }`,
      { id }
    )
    console.log('Full response:', response)
    if (response.errors) {
      alert('Error: ' + JSON.stringify(response.errors, null, 2))
      return
    }
    if (response.data?.updateMember) {
      // Refresh the list AFTER successful update
      await fetchPending()
    }
  } catch (error) {
    console.error('Approve error:', error)
    alert('Something went wrong')
  }
}

  const denyUser = async (id: string) => {
    const { errors } = await hygraphFetch(
      `mutation DeleteUser($id: ID!) {
        deleteMember(where: { id: $id }) {
          id
        }
      }`,
      { id }
    )
    if (errors) {
      alert('Kunde inte neka användaren.')
      console.error(errors)
    } else {
      fetchPending()
    }
  }

  useEffect(() => {
    fetchPending()
  }, [])

  // ✅ Check admin status AFTER all hooks
  if (!isAdmin) {
    return <div className="p-4">Du har inte behörighet att se denna sida.</div>
  }

  if (loading) return <div className="p-4">Laddar...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Godkänn nya användare</h1>
      {pendingUsers.length === 0 ? (
        <p>Inga användare väntar på godkännande.</p>
      ) : (
        <ul className="space-y-4">
          {pendingUsers.map((user) => (
            <li key={user.id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => approveUser(user.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Godkänn
                </button>
                <button
                  onClick={() => denyUser(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Neka
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}