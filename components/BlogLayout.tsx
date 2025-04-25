import AlertBanner from 'components/AlertBanner'

export default function BlogLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
        <main>{children}</main>
        <footer className="py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 - {new Date().getFullYear()},{" "} 
            <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.pivotr.in"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Pivotr Technologies Pvt Ltd.{" "}
          </a>All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
