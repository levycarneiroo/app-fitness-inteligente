// FitAI Pro - Tipos e Interfaces
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  bodyFat?: number; // %
  experience: 'iniciante' | 'intermediario' | 'avancado';
  goal: 'hipertrofia' | 'emagrecimento' | 'forca' | 'resistencia' | 'agilidade';
  sport?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  instructions: string[];
  tips: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface WorkoutSet {
  reps: number;
  weight?: number;
  duration?: number; // segundos
  rest: number; // segundos
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  estimatedDuration: number; // minutos
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  focus: string[];
  createdAt: Date;
}

export interface NutritionPlan {
  id: string;
  userId: string;
  dailyCalories: number;
  macros: {
    protein: number; // gramas
    carbs: number; // gramas
    fat: number; // gramas
  };
  meals: Meal[];
  createdAt: Date;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
  calories: number;
}

export interface Food {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Progress {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  photos?: string[];
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  workoutId: string;
  date: Date;
  duration: number; // minutos
  exercises: {
    exerciseId: string;
    sets: WorkoutSet[];
    completed: boolean;
  }[];
  rating: number; // 1-5
  notes?: string;
}