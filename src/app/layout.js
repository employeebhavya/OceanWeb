import Menu from "../components/Menu";
import "./globals.css";

export const metadata = {
  title: "Ocean",
  description: "Ocean Turning Dreams into Reality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
