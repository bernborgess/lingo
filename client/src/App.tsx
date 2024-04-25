import LingoRoutes from './routes/LingoRoutes.tsx'
// import { CookiesProvider, useCookies } from 'react-cookie'


function App() {
  // const [cookies, setCookie] = useCookies(['user'])

  // function handleLogin(user) {
  //   setCookie('user', user, { path: '/' })
  // }

  return (
    // <CookiesProvider>

    <LingoRoutes/>
    // <div>{cookies.user ? <PrivateRoutes/> : <PublicRoutes/>}</div>
    /* </CookiesProvider> */
  )
}

export default App
