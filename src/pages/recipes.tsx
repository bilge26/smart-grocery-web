import Link from 'next/link';

const categories = [
  { label: 'Kahvaltı', value: 'kahvaltı', icon: '🔍' },
  { label: 'Öğle Yemeği', value: 'öğle yemeği', icon: '🥗' },
  { label: 'Akşam Yemeği', value: 'akşam yemeği', icon: '🍽️' },
  { label: 'Tatlı', value: 'tatlı', icon: '🍰' },
];

export default function RecipesPage() {
  return (
    <div>
      <h1 className="flex flex-wrap gap-3 mb-6">📝 Kategoriler</h1>
      <div className="space-y-4">
        {categories.map((cat) => (
          <Link key={cat.value} href={`/categories/${cat.value}`}>
            <div className="bg-white shadow rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50">
              <span className="text-xl mr-4">{cat.icon}</span>
              <span className="text-lg font-medium">{cat.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
