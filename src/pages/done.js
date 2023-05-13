import Done from '../components/Done';
import 'bulma/css/bulma.min.css';
import { SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from "next/router";

export default function DoneHome() {
  return(
    <>
      <SignedOut>
        <RedirectToSignIn></RedirectToSignIn>
      </SignedOut>
      <div>
        <Done></Done>
      </div>
    </>
  )
}