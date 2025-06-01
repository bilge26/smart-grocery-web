import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/recipes', label: 'Recipes', icon: '📖' },
  { href: '/plan', label: 'Plan', icon: '🗓️' },
  { href: '/shopping-list', label: 'List', icon: '🛒' },
];

export default function BottomNav() {
  const { pathname } = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md flex justify-around py-2">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <div
            className={`flex flex-col items-center text-xs cursor-pointer ${
              pathname === item.href ? 'text-blue-600 font-semibold' : 'text-gray-600'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </div>
        </Link>
      ))}
    </nav>
  );
}
