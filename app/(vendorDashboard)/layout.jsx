import Header from "@/components/vendor/Header";

export default function Layout({ children }) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
