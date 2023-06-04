"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] =
    useState<Awaited<ReturnType<typeof getProviders>>>();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const handleSignout = () => {
    setToggleDropdown(false);
    signOut();
  };

  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProvider();
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
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn" href="create-prompt">
              Create Post
            </Link>
            <button
              onClick={() => signOut()}
              type="button"
              className="outline_btn black_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
                src={session.user.image}
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
        {session?.user ? (
          <>
            <Image
              src={session.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown ? (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Porfile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={handleSignout}
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </>
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
    </nav>
  );
};

export default Navbar;
