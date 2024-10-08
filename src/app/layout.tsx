import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Todo App",
  description: "An example of Supabase, Auth and NextJS server actions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <main className="flex flex-col">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
