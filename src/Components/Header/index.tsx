/* eslint-disable @next/next/no-img-element */

import SignInButton from '../SignInButton';

import { ActiveLink } from '../ActiveLink';

import styles from './styles.module.scss';

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
          
        <img src="/images/logo.svg" alt="Logo ig.news"/>

        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>

          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        
        <SignInButton />
      </div>
    </header>
  );
}