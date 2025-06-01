import { usePlan } from '../context/PlanContext';
import { useState } from 'react';

export default function ShoppingListPage() {
  const { plan } = usePlan();
  const [checked, setChecked] = useState<string[]>([]);

  // 1. Tüm tariflerdeki malzemeleri topla
  const allIngredients: string[] = [];

  Object.values(plan).forEach((day) => {
    Object.values(day || {}).forEach((recipe) => {
      recipe?.ingredients?.forEach((item) => {
        allIngredients.push(item.trim().toLowerCase());
      });
    });
  });

  // 2. Miktarları birleştir
  const merged: Record<string, number> = {};

  allIngredients.forEach((item) => {
    const match = item.match(/^(\d+)\s+(.*)$/); // "2 yumurta"
    if (match) {
      const [, qtyStr, name] = match;
      const qty = parseInt(qtyStr);
      merged[name] = (merged[name] || 0) + qty;
    } else {
      // Eğer sayı yoksa olduğu gibi al
      merged[item] = (merged[item] || 0) + 1;
    }
  });

  const mergedList = Object.entries(merged);

  const toggleCheck = (item: string) => {
    setChecked((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🛒 Alışveriş Listesi</h1>
      <ul className="space-y-2">
        {mergedList.map(([name, qty]) => {
          const label = `${qty > 1 ? qty + ' ' : ''}${name}`;
          const isChecked = checked.includes(name);

          return (
            <li
              key={name}
              onClick={() => toggleCheck(name)}
              className={`cursor-pointer p-3 rounded-lg border ${
                isChecked
                  ? 'line-through text-gray-400 bg-gray-100'
                  : 'text-gray-800 bg-white'
              }`}
            >
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
