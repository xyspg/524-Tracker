import { Header } from "./components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-full">
      <Header />
      <div className="h-[calc(100vh-80px)]">
        {children}
        </div>
    </main>
  );
}
