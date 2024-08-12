import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="border-b border-[#E0E0E0] p-6">
          <h1 className="text-lg font-medium">Product Roadmap</h1>
        </div>
        {children}
      </body>
    </html>
  );
}
