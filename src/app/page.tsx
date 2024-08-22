export default async function Index() {
  return (
    <section className="container flex min-h-[calc(100vh-57px)] max-w-4xl flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-balance font-sans text-3xl font-black sm:text-5xl md:text-6xl lg:text-7xl">
        Next.js 14 Server Actions and Supabase / Auth.
      </h1>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        A demo todo app that utilises Supabase for databse and auth, combined
        with NextJS 14 Server Actions.
      </p>
      <div className="space-x-4">
        <a
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href="/auth/login">
          Get Started
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-md border border-input px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href="https://github.com/shadcn/taxonomy">
          GitHub
        </a>
      </div>
    </section>
  );
}
