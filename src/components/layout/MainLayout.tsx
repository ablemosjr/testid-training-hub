import { Sidebar } from "./Sidebar";
import { DataTestPanel } from "./DataTestPanel";

interface DataTestItem {
  name: string;
  description: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  dataTestItems: DataTestItem[];
}

export function MainLayout({ children, pageTitle, dataTestItems }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <DataTestPanel title={pageTitle} items={dataTestItems} />
      <main className="ml-64 mr-80 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
