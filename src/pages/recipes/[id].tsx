import { GetStaticPaths, GetStaticProps } from 'next';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useState } from 'react';
import { usePlan } from '../../context/PlanContext';

type Meal = 'kahvaltı' | 'öğle' | 'akşam' | 'tatlı';
type Day =
  | 'Pazartesi'
  | 'Salı'
  | 'Çarşamba'
  | 'Perşembe'
  | 'Cuma'
  | 'Cumartesi'
  | 'Pazar';

type Recipe = {
  id: string;
  name: string;
  cuisine?: string;
  category?: string;
  ingredients?: string[];
  instructions?: string;
};

type Props = {
  recipe: Recipe;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'recipes'));
  const paths = snapshot.docs.map((doc) => ({
    params: { id: doc.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string;
  const docRef = doc(db, 'recipes', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return { notFound: true };
  }

  const data = docSnap.data() as Omit<Recipe, 'id'>;

  return {
    props: {
      recipe: {
        id,
        ...data,
      },
    },
    revalidate: 60,
  };
};

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

export default function RecipeDetailPage({ recipe }: Props) {
  const [selectedDay, setSelectedDay] = useState<Day>('Pazartesi');
  const [selectedMeal, setSelectedMeal] = useState<Meal>('akşam');
  const [isAdded, setIsAdded] = useState(false); // ✅ yeni eklendi
  const { addToPlan } = usePlan();

  const handleAdd = () => {
    addToPlan(selectedDay, selectedMeal, recipe);
    setIsAdded(true);

    setTimeout(() => setIsAdded(false), 1500); // 1.5 sn sonra sıfırla
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
      <p className="text-gray-600 mb-4">
        {recipe.cuisine} | {recipe.category}
      </p>

      <h2 className="text-xl font-semibold mt-6">Malzemeler:</h2>
      <ul className="list-disc list-inside">
        {recipe.ingredients?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Yapılışı:</h2>
      <p className="mt-2 whitespace-pre-line">{recipe.instructions}</p>

      <div className="mt-8 border-t pt-4">
        <h3 className="font-semibold mb-2">Gün ve Öğün Seç:</h3>

        <label className="block mb-1">Gün:</label>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value as Day)}
          className="border p-2 mb-4 w-full max-w-xs"
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <label className="block mb-1">Öğün:</label>
        <select
          value={selectedMeal}
          onChange={(e) => setSelectedMeal(e.target.value as Meal)}
          className="border p-2 mb-4 w-full max-w-xs"
        >
          {meals.map((meal) => (
            <option key={meal} value={meal}>
              {meal}
            </option>
          ))}
        </select>
<button
  onClick={handleAdd}
  className={`mt-2 w-full max-w-xs px-4 py-2 rounded text-white font-medium transition ${
    isAdded ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
  }`}
>
  {isAdded ? 'Eklendi ✓' : 'Plana Ekle'}
</button>
      </div>
    </div>
  );
}
