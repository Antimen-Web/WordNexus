import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo1.png"
          alt="WordNexus Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">WordNexus</p>
      </Link>

      <div className="flex desk">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/study"
              className="btn green hover:bg-white hover:text-black"
            >
              Learn words
            </Link>

            <Link href="/create-card" className="btn black">
              Create card
            </Link>

            <Link href="/dictionary" className="btn blue">
              Dictionary
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sing Out
            </button>

            <Link href={"/profile/" + session?.user.id}>
              <Image
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="btn black"
                >
                  Sing In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="relative mob">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/pages/[id].jsx"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/study"
                  className="btn w-full green hover:bg-white hover:text-black"
                  onClick={() => setToggleDropdown(false)}
                >
                  Learn words
                </Link>

                <Link
                  href="/create-card"
                  className="btn black w-full"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create card
                </Link>

                <Link
                  href="/dictionary"
                  className="btn blue w-full"
                  onClick={() => setToggleDropdown(false)}
                >
                  Dictionary
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full btn black"
                >
                  Sing Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="btn black"
                >
                  Sing In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
