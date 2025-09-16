export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

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

  );
}