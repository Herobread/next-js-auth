import { AuthContextProvider } from '../context/AuthContext'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { withRouter } from 'next/router'

function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default App
