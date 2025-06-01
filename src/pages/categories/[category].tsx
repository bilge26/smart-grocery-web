import { GetStaticPaths, GetStaticProps } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

type Recipe = {
  id: string;
  name: string;
  cuisine: string;
  category: string;
  tags?: string[];
};

type Props = {
  recipes: Recipe[];
};

const filters = ['vegan', 'sağlıklı', 'diyet'];

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'recipes'));
  const categories = new Set<string>();
  snapshot.docs.forEach((doc) => {
    const data = doc.data() as Recipe;
    categories.add(data.category);
  });

  const paths = Array.from(categories).map((cat) => ({
    params: { category: cat },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const category = params?.category;

  const snapshot = await getDocs(collection(db, 'recipes'));
  const allRecipes = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Recipe, 'id'>),
  }));

  const filteredRecipes = allRecipes.filter((r) => r.category === category);

  return {
    props: {
      recipes: filteredRecipes,
    },
    revalidate: 60,
  };
};

export default function CategoryPage({ recipes }: Props) {
  const router = useRouter();
  const category = router.query.category as string;
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = recipes.filter(
    (r) => (selectedTag ? r.tags?.includes(selectedTag) : true)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold uppercase mb-4">{category}</h1>

<div className="flex flex-wrap gap-3 mb-6">
  {filters.map((tag) => (
    <button
      key={tag}
      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
      className={`px-4 py-1 rounded-full text-sm border ${
        selectedTag === tag
          ? 'bg-green-600 text-white'
          : 'bg-gray-200 text-gray-700'
      }`}
    >
      {tag}
    </button>
  ))}
</div>


      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-gray-500 italic">Uygun tarif bulunamadı.</p>
        )}
        {filtered.map((r) => (
          <Link key={r.id} href={`/recipes/${r.id}`}>
            <div className="bg-white p-4 rounded-xl shadow hover:bg-gray-50 cursor-pointer">
              <p className="text-lg font-semibold">{r.name}</p>
              <p className="text-sm text-gray-500">{r.cuisine}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
