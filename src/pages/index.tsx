import Link from 'next/link';
import { usePlan } from '../context/PlanContext';

const mealIcons: Record<string, string> = {
  kahvaltı: '🍳',
  öğle: '🥗',
  akşam: '🍽️',
  tatlı: '🍰',
};

function getToday(): keyof ReturnType<typeof usePlan>['plan'] {
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  return days[new Date().getDay()] as keyof ReturnType<typeof usePlan>['plan'];
}

export default function HomePage() {
  const { plan } = usePlan();
  const today = getToday();
  const todayPlan = plan[today] || {};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📅 Bugünün Planı</h1>

      <div className="bg-white shadow rounded p-4">
        {Object.entries(mealIcons).map(([meal, icon]) => {
          const r = todayPlan[meal as keyof typeof todayPlan];
          return (
            <div key={meal} className="mb-4">
              <p className="font-semibold">{icon} {meal.charAt(0).toUpperCase() + meal.slice(1)}</p>
              {r ? (
                <>
                  <Link href={`/recipes/${r.id}`}>
                    <p className="text-base text-black hover:text-gray-700 cursor-pointer">
                      {r.name}
                    </p>
                  </Link>
                  <p className="text-sm text-gray-500">Mutfak: {r.cuisine}</p>
                </>
              ) : (
                <p className="text-gray-400 italic">— Tarif yok</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
