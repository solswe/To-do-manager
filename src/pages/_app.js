// import '@/styles/globals.css';
import 'bulma/css/bulma.min.css';
// import '@fontawesome/fontawesome-free/css/all.min.css'
import Layout from '../components/Layout';
import { ClerkProvider, RedirectToSignIn, SignIn, SignedIn, SignedOut, UserButton, UserProfile } from '@clerk/nextjs';


export default function App({ Component, pageProps }) {

  return (
    <ClerkProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}
