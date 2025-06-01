import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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
  ingredients?: string[];
  instructions?: string;
};

type Plan = {
  [day in Day]?: {
    [meal in Meal]?: Recipe;
  };
};

type PlanContextType = {
  plan: Plan;
  addToPlan: (day: Day, meal: Meal, recipe: Recipe) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used inside PlanProvider');
  return context;
};

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<Plan>({});

  useEffect(() => {
    const stored = localStorage.getItem('meal-plan');
    if (stored) setPlan(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('meal-plan', JSON.stringify(plan));
  }, [plan]);

  const addToPlan = (day: Day, meal: Meal, recipe: Recipe) => {
    setPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: recipe,
      },
    }));
  };

  return (
    <PlanContext.Provider value={{ plan, addToPlan }}>
      {children}
    </PlanContext.Provider>
  );
};
