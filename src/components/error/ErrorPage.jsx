import { Typography } from '@mui/material'

function ErrorMessage({ error }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography>{error}</Typography>
    </div>
  )
}

export default ErrorMessage
