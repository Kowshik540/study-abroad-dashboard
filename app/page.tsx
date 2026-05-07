'use client'

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((s) => s.login)

  const [username, setUsername] = useState('emilys')
  const [password, setPassword] = useState('emilyspass')

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'https://dummyjson.com/auth/login',
        { username, password }
      )

      login(res.data)
      router.push('/dashboard')
    } catch {
      alert('Invalid login')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6366f1, #ec4899)',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h4" textAlign="center" mb={1}>
            Study Abroad Admin
          </Typography>

          <Typography textAlign="center" mb={3} color="text.secondary">
            Login to access dashboard
          </Typography>

          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              borderRadius: 2,
              background:
                'linear-gradient(90deg, #6366f1, #ec4899)',
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}