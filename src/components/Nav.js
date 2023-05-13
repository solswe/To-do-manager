import Link from 'next/link';
import 'bulma/css/bulma.min.css';
import { useClerk } from "@clerk/clerk-react";
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton, UserProfile } from '@clerk/nextjs';

const Nav = () => {
    const SignOutButton = () => {
        const { signOut } = useClerk();
        return (
          <button className="button is-danger is-small" onClick={() => signOut()} >
            Sign out
          </button>
        );
      };

    return (
        <>
        <aside className="menu">
            <ul className="menu-list">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/myAccount">My Account</Link>
                </li>
                <li>
                    <Link href="/todos">To-do</Link>
                </li>
                <li>
                    <Link href="/done">Done</Link>
                </li>
            </ul>
            <p className="menu-label">Categories</p>
            <ul className="menu-list">
                <li>
                    <Link href="/done">Done</Link>
                </li>
            </ul>
        </aside>
        
        <br></br>
        {/* <UserButton></UserButton> */}
        <SignOutButton></SignOutButton>
        </>
        
    )
}

export default Nav