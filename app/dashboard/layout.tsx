import AuthGuard from '@/components/AuthGuard'
import { Box } from '@mui/material'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
      </Box>
    </AuthGuard>
  )
}