import Navbar from "@/components/navbar";
import "./globals.css";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel maxSize={20} defaultSize={15} minSize={10}>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <div className="min-h-screen px-8 w-full bg-gradient-radial from-green-700 via-green-500 to-green-200">
              {children}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </body>
    </html>
  );
}
