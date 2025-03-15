"use client";

import { type Session } from "@auth/core/types";
import { signIn, signOut } from "next-auth/react";

function UserAuthentication({ session }: { session: Session | null }) {
  return session ? (
    <button
      onClick={async () => {
        await signOut({});
      }}
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() =>
        signIn(undefined, {
          callbackUrl: "/dashboard",
        })
      }
    >
      Login
    </button>
  );
}

export default UserAuthentication;
