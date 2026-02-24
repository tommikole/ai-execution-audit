export const metadata = {
  title: 'AI Execution Audit™',
  description: 'Mittaa organisaatiosi kykyä muuttaa AI-ambitio mitattaviksi liiketuloksiksi.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fi">
      <body style={{ margin: 0, padding: 0, background: '#080f24' }}>{children}</body>
    </html>
  )
}
