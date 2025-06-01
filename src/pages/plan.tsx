import { usePlan } from '../context/PlanContext';

type Meal = 'kahvaltı' | 'öğle' | 'akşam' | 'tatlı';
type Day =
  | 'Pazartesi'
  | 'Salı'
  | 'Çarşamba'
  | 'Perşembe'
  | 'Cuma'
  | 'Cumartesi'
  | 'Pazar';

const days: Day[] = [
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
  'Pazar',
];

const meals: Meal[] = ['kahvaltı', 'öğle', 'akşam', 'tatlı'];

const mealIcons: Record<Meal, string> = {
  kahvaltı: '🍳',
  öğle: '🥗',
  akşam: '🍽️',
  tatlı: '🍰',
};

export default function PlanPage() {
  const { plan } = usePlan();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📅 Haftalık Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {days.map((day) => (
          <div
            key={day}
            className="bg-white rounded-xl shadow p-4 w-full"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-3">{day}</h2>

            <div className="flex flex-col gap-2">
              {meals.map((meal) => (
                <div
                  key={meal}
                  className="bg-gray-100 rounded-lg px-4 py-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {mealIcons[meal]} {meal.toUpperCase()}
                    </p>
                    {plan[day]?.[meal] ? (
                      <>
                        <p className="text-sm text-gray-900">
                          {plan[day]?.[meal]?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Mutfak: {plan[day]?.[meal]?.cuisine}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-400 italic">Tarif yok</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
