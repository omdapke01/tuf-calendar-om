import "./globals.css";

export const metadata = {
  title: "Luma Calendar",
  description: "A polished interactive calendar with range notes."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
