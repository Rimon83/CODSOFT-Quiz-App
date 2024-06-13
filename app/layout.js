import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import GlobalState from './context/state'
import { AuthContextProvider } from "./_utils/auth-context";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Quiz App",
  description:
    "User select the type of questions and answer the question with specific time based on number of questions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <GlobalState>
            <Navbar />
            <main className="h-full-screen">{children}</main>
            <Footer />
          </GlobalState>
        </AuthContextProvider>
      </body>
    </html>
  );
}
