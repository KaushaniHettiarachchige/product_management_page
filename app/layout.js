import "./globals.css";
import ThemeProvider from "../Components/theme-provider";

export const metadata = {
  title: "Product Management App",
  description: "Full Stack Intern Assessment - Product Management Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}