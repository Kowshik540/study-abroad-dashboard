'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { Box, Button, Card, Typography } from '@mui/material'

export default function UserDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/users/${id}`
        )
        setUser(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading) return <p>Loading...</p>

  if (!user) return <p>User not found</p>

  return (
    <Box sx={{ p: 4 }}>
      <Button variant="contained" onClick={() => router.back()}>
        Back
      </Button>

      <Card sx={{ mt: 3, p: 3 }}>
        <Typography variant="h4">
          {user.firstName} {user.lastName}
        </Typography>

        <Typography>Email: {user.email}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Gender: {user.gender}</Typography>

        <Typography sx={{ mt: 2 }}>
          Company: {user.company?.name}
        </Typography>
      </Card>
    </Box>
  )
}
