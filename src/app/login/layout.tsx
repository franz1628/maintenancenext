'use client';
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).access_token : null;
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {
        !isloggedIn &&
          <div>
              <header>
                  <h1 className="text-2xl font-bold text-center my-4">Login</h1>
                  <hr />
              </header>
              {children}
              <footer>
                  <p className="text-center">© 2025 Franz</p>
              </footer>
          </div>
      }
    </>

  );
}