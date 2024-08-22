import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";

export default async function Header() {
  const supabse = createClient();

  const {
    data: { user },
  } = await supabse.auth.getUser();

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">SupaTodo</span>
          </a>
          {<Link href="/todos">Todos</Link>}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user ? (
            <>
              <p>{user.email}</p>
              <form>
                <Button formAction={logout}>Sign Out</Button>
              </form>
            </>
          ) : (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
