import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function NavBar() {
  const { userId } = auth();

  return (
    <>
      <header>
        <nav className="py-2">
          <div className="container mx-auto flex justify-between items-center px-4">
            <Link href="/">
              <Image
                className="rounded-lg"
                src="/VulseLogo.png"
                height={150}
                width={150}
                alt="Vulse Logo"
              />
            </Link>
            <div className="px-4 py-2">
              {userId ? <UserButton /> : <SignInButton />}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
