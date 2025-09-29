'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isloggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).access_token : null;
    if (!token) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      {
        isloggedIn &&
        <div>
          <header>
            <nav className="bg-gray-800 text-white p-4">
              <div className="relative inline-block text-left group">
                <button className="inline-flex w-full justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
                  Menu
                  <svg
                    className="ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="absolute text-gray-900 z-10 w-56 origin-top-right group-hover:block hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <ul className="py-1">
                    <li><Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-100">Home</Link></li>
                    <li><Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Dashboard</Link></li>
                    <li><Link href="/dashboard/brand" className="block px-4 py-2 text-sm hover:bg-gray-100">Brand</Link></li>
                    <li><Link href="/dashboard/model" className="block px-4 py-2 text-sm hover:bg-gray-100">Model</Link></li>
                    <li><Link href="/dashboard/document-type" className="block px-4 py-2 text-sm hover:bg-gray-100">Document Type</Link></li>
                    <li><Link href="/dashboard/user" className="block px-4 py-2 text-sm hover:bg-gray-100">User</Link></li>
                    <li><Link href="/dashboard/vehicle" className="block px-4 py-2 text-sm hover:bg-gray-100">Vehicle</Link></li>
                    <li><Link href="/dashboard/tool-catalog" className="block px-4 py-2 text-sm hover:bg-gray-100">Tool Catalog</Link></li>
                    <li><Link href="/dashboard/piece-catalog" className="block px-4 py-2 text-sm hover:bg-gray-100">Piece Catalog</Link></li>
                    <li><Link href="/dashboard/seller" className="block px-4 py-2 text-sm hover:bg-gray-100">Seller</Link></li>
                    <li><Link href="/dashboard/mecanic" className="block px-4 py-2 text-sm hover:bg-gray-100">Mecanic</Link></li>
                    <li><Link href="/dashboard/service-catalog" className="block px-4 py-2 text-sm hover:bg-gray-100">Service Catalog</Link></li>
                    <li><Link href="/dashboard/service-detail-catalog" className="block px-4 py-2 text-sm hover:bg-gray-100">Service Detail Catalog</Link></li>
                    <li><Link href="/dashboard/service" className="block px-4 py-2 text-sm hover:bg-gray-100">Service</Link></li>
                    <li><Link href="/dashboard/service-detail" className="block px-4 py-2 text-sm hover:bg-gray-100">Service Detail</Link></li>
                  </ul>
                </div>
              </div>

              <div className="inline-block ml-4 cursor-pointer hover:underline" onClick={handleLogout}>
                Logout
              </div>
            </nav>

          </header>
          <main className="p-4">
            {children}
          </main>
          <footer>
            <p className="text-center">© 2025 Franz</p>
          </footer>
        </div>
      }
    </>
  );
}