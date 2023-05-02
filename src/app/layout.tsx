import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const font = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "f99.blue",
  description: "f99.blue",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="bottom-right" />

        <div className="fixed bottom-0 left-0 ml-2 mb-2 text-green-400 opacity-50">
          <a
            href="https://github.com/grayliquid/f99.blue"
            rel="noreferrer"
            target="_blank"
          >
            github
          </a>
        </div>
      </body>
    </html>
  );
}
