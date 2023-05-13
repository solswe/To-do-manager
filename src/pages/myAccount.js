import 'bulma/css/bulma.min.css';
import { SignedOut, UserProfile, RedirectToSignIn } from '@clerk/nextjs';


export default function MyAccount() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn></RedirectToSignIn>
      </SignedOut>
      <div>
        <UserProfile />
    </div>
    </>
  )
}