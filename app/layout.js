import './styles/globals.css'

export const metadata = {
  title: 'GitHub PR Bot Dashboard',
  description: 'Status dashboard for GitHub PR Bot',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}