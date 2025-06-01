import BottomNav from './BottomNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 p-4 pb-24 max-w-xl mx-auto w-full">{children}</main>
      <BottomNav />
    </div>
  );
}
