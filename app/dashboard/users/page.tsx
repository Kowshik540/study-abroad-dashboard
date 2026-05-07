'use client'

import {
  Box,
  Card,
  CardContent,
  Grid,
  Pagination,
  TextField,
  Typography
} from '@mui/material'

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fetchUsers = async () => {
    const skip = (page - 1) * 10

    const url = search
      ? `https://dummyjson.com/users/search?q=${search}`
      : `https://dummyjson.com/users?limit=10&skip=${skip}`

    const res = await axios.get(url)

    setUsers(res.data.users)
  }

  useEffect(() => {
    fetchUsers()
  }, [search, page])

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Users
      </Typography>

      <TextField
        fullWidth
        label="Search Users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} md={6} lg={4} key={user.id}>
            <Link href={`/dashboard/users/${user.id}`}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>

                  <Typography>{user.email}</Typography>
                  <Typography>{user.phone}</Typography>
                  <Typography>{user.gender}</Typography>
                  <Typography>{user.company?.name}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={10}
        page={page}
        onChange={(_, val) => setPage(val)}
        sx={{ mt: 3 }}
      />
    </Box>
  )
}