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
  const login = useAuthStore((state) => state.login)

  const [username, setUsername] = useState('emilys')
  const [password, setPassword] = useState('emilyspass')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)

      const res = await axios.post(
        'https://dummyjson.com/auth/login',
        {
          username,
          password,
        }
      )

      login(res.data)
      router.push('/dashboard')
    } catch (err) {
      alert('Login failed. Check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at top, #6366f1, #ec4899)',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={12}
          sx={{
            p: 5,
            width: '100%',
            borderRadius: 4,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            mb={1}
          >
            Admin Login
          </Typography>

          <Typography
            textAlign="center"
            color="text.secondary"
            mb={4}
          >
            Study Abroad Dashboard Access
          </Typography>

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleLogin}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 'bold',
              background:
                'linear-gradient(90deg, #6366f1, #ec4899)',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}