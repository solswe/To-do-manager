import Todo from '../components/Todos';
import 'bulma/css/bulma.min.css';
import { useAuth, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from "next/router";

export default function TodoHome() {
  return(
    <>
      <SignedOut>
        <RedirectToSignIn></RedirectToSignIn>
      </SignedOut>
      <div>
          <Todo></Todo>
      </div>
    </>
  )
}