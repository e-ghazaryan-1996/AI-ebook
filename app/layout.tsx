import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
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
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
