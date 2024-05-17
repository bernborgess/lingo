import LingoRoutes from './routes/LingoRoutes.tsx'
import { AuthProvider } from './utils/context/AuthContext.tsx'

function App() {
  return (
    <AuthProvider>
      <LingoRoutes/>
    </AuthProvider>
  )
}

export default App
