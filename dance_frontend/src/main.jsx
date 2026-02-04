import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'flowbite-react'
import { router } from './routes/AppRouter.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { customFlowbiteTheme } from './themes/flowbiteTheme.js'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={customFlowbiteTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
