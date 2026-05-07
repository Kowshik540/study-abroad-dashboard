'use client'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import Link from 'next/link'

const cards = [
  {
    title: 'Users',
    desc: 'Manage all users',
    link: '/dashboard/users',
    color: '#6366f1',
  },
  {
    title: 'Products',
    desc: 'View products catalog',
    link: '/dashboard/products',
    color: '#ec4899',
  },
]

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {cards.map((c) => (
          <Grid item xs={12} md={6} key={c.title}>
            <Link href={c.link} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${c.color}22, white)`,
                  transition: '0.3s',
                  borderLeft: `6px solid ${c.color}`,
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 10,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5">{c.title}</Typography>
                  <Typography color="text.secondary">
                    {c.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}