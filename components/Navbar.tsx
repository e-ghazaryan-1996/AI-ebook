"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] =
    useState<Awaited<ReturnType<typeof getProviders>>>();
    const [toggleDropdown,setToggleDropdown] = useState(false)

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvider();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
        <div className="sm:flex hidden">
          {isUserLoggedIn ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="create-prompt">Create Post</Link>
              <button
                onClick={() => signOut()}
                type="button"
                className="outline_btn"
              >
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  width={37}
                  height={37}
                  alt="profile"
                  className="rounded-full"
                  src="/assets/images/logo.svg"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers
                ? Object.values(providers).map((provider) => {
                    return (
                      <button
                        key={provider.id}
                        type="button"
                        onClick={() => signIn(provider.id)}
                        className="black_btn"
                      >
                        Sign-in
                      </button>
                    );
                  })
                : null}
            </>
          )}
        </div>
        {/* Mobile Nav */}
        <div className="sm:hidden flex relative">
          {isUserLoggedIn ? (
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            
            />
          ) : <>
          {
            providers
            ? Object.values(providers).map((provider) => {
                return (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign-in
                  </button>
                );
              })
            : null
          }
          </>}
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
