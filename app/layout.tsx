import './globals.css'
import { Inter, Cormorant_Garamond, Amiri } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })
const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cormorant'
})
const amiri = Amiri({ 
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri'
})

export const metadata = {
  title: 'Masjid Al-Ikhlas - Rawabadak Utara, Koja',
  description: 'Masjid Al-Ikhlas adalah pusat ibadah dan komunitas Muslim di Rawabadak Utara, Koja, Jakarta Utara. Menyediakan program ibadah, kajian, dan kegiatan sosial untuk ummat.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${inter.className} ${cormorantGaramond.variable} ${amiri.variable}`}>
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}