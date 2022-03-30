import { AuthContextProvider } from '../context/AuthContext'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { withRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default withRouter(MyApp)
