/* eslint-disable @next/next/no-img-element */
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/client";

import styles from "./styles.module.scss";

export default function SignInButton() {
  const [session] = useSession();

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      {/* <FaGithub color="#04d361" /> */}
      <img
        src={String(session.user?.image)}
        alt={String(session.user?.name)}
        width="24px"
        style={{ objectFit: "cover", borderRadius: "80px", marginRight: 10 }}
      />

      {session.user?.name}

      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <>
      <button
        type="button"
        className={styles.signInButton}
        onClick={() => signIn("github")}
      >
        <FaGithub color="#eba417" />
        Sign in
      </button>
    </>
  );
}
