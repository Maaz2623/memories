import { Modals } from "@/components/modals";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function YearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Modals />
      <Navbar />
      <div className="flex">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex fixed left-0"
        >
          <ResizablePanel
            maxSize={20}
            defaultSize={15}
            minSize={10}
            className="flex-1"
          >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle className="h-screen sticky top-0" />
          <ResizablePanel defaultSize={80}>
            <ScrollArea className="px-8 w-full bg-gradient-radial h-screen from-green-700 via-green-500 to-green-200">
              {children}
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
