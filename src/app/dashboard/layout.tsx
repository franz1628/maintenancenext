import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div>
        <header>
            <nav className="bg-gray-800 text-white p-4">
                <ul className="flex space-x-4">
                    {/* Updated navigation links */}
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                    <Link href="/dashboard/brand" className="hover:underline">Brand</Link>
                    <Link href="/dashboard/model" className="hover:underline">Model</Link>
                    <Link href="/dashboard/document-type" className="hover:underline">Document Type</Link>
                    <Link href="/dashboard/user" className="hover:underline">User</Link>
                </ul>
            </nav>
           
        </header>
        <main className="p-4">
            {children}
        </main>
        <footer>
            <p className="text-center">© 2025 Franz</p>
        </footer>
    </div>

  );
}