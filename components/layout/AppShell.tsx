import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { Search } from "@/components/ui/Search";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="border-b border-gray-100 px-4 py-4">
            <Search />
          </div>
          <Sidebar />
        </div>
      </aside>

      {/* Mobile TopNav */}
      <TopNav />

      {/* Main content */}
      <main className="flex-1 lg:pl-60">
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
