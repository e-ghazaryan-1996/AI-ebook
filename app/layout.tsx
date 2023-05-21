import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export const metadata = {
  title: "Promtopia",
  description: "DIscover and Share AI propmts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
