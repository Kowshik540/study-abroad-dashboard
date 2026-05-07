import './globals.css'
import MuiProvider from '@/components/MuiProvider'

export const metadata = {
  title: 'Study Abroad Dashboard',
  description: 'Frontend Assessment'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MuiProvider>{children}</MuiProvider>
      </body>
    </html>
  )
}