import { Header } from "./components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col">
            {children}
        </div>
        
      </main>
    </>
  );
}
