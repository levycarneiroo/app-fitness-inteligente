// FitAI Pro - Utilitários e IA Simulada
import { UserProfile, Workout, Exercise, NutritionPlan } from './types';

// Simulação de IA para análise de perfil
export function analyzeUserProfile(profile: UserProfile): {
  recommendation: string;
  workoutFrequency: number;
  intensityLevel: string;
  focusAreas: string[];
} {
  const { age, experience, goal, weight, height } = profile;
  const bmi = weight / ((height / 100) ** 2);
  
  let recommendation = '';
  let workoutFrequency = 3;
  let intensityLevel = 'moderada';
  let focusAreas: string[] = [];

  // Análise baseada no objetivo
  switch (goal) {
    case 'hipertrofia':
      recommendation = 'Foco em treinos de força com cargas progressivas e descanso adequado.';
      workoutFrequency = 4;
      intensityLevel = 'alta';
      focusAreas = ['Força', 'Volume', 'Recuperação'];
      break;
    case 'emagrecimento':
      recommendation = 'Combinação de treinos cardiovasculares e musculação para maximizar queima calórica.';
      workoutFrequency = 5;
      intensityLevel = 'moderada-alta';
      focusAreas = ['Cardio', 'Circuito', 'Déficit Calórico'];
      break;
    case 'forca':
      recommendation = 'Treinos focados em movimentos compostos com cargas altas e baixas repetições.';
      workoutFrequency = 3;
      intensityLevel = 'muito alta';
      focusAreas = ['Força Máxima', 'Técnica', 'Potência'];
      break;
    case 'resistencia':
      recommendation = 'Treinos de longa duração com intensidade moderada para melhorar capacidade cardiovascular.';
      workoutFrequency = 4;
      intensityLevel = 'moderada';
      focusAreas = ['Cardio', 'Resistência Muscular', 'VO2 Max'];
      break;
    case 'agilidade':
      recommendation = 'Treinos funcionais com movimentos explosivos e mudanças de direção.';
      workoutFrequency = 4;
      intensityLevel = 'alta';
      focusAreas = ['Agilidade', 'Coordenação', 'Velocidade'];
      break;
  }

  // Ajustes baseados na experiência
  if (experience === 'iniciante') {
    workoutFrequency = Math.max(2, workoutFrequency - 1);
    intensityLevel = intensityLevel === 'muito alta' ? 'alta' : 'moderada';
  } else if (experience === 'avancado') {
    workoutFrequency = Math.min(6, workoutFrequency + 1);
  }

  return {
    recommendation,
    workoutFrequency,
    intensityLevel,
    focusAreas
  };
}

// Cálculo de necessidades calóricas
export function calculateCalorieNeeds(profile: UserProfile): {
  bmr: number;
  tdee: number;
  goalCalories: number;
  macros: { protein: number; carbs: number; fat: number };
} {
  const { age, weight, height, goal } = profile;
  
  // Fórmula de Mifflin-St Jeor (assumindo masculino para simplificação)
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  
  // TDEE com fator de atividade moderada
  const tdee = bmr * 1.55;
  
  let goalCalories = tdee;
  
  // Ajuste baseado no objetivo
  switch (goal) {
    case 'emagrecimento':
      goalCalories = tdee * 0.8; // Déficit de 20%
      break;
    case 'hipertrofia':
      goalCalories = tdee * 1.1; // Superávit de 10%
      break;
    case 'forca':
      goalCalories = tdee * 1.05; // Superávit leve
      break;
  }

  // Distribuição de macronutrientes
  const protein = weight * 2.2; // 2.2g por kg
  const fat = goalCalories * 0.25 / 9; // 25% das calorias
  const carbs = (goalCalories - (protein * 4) - (fat * 9)) / 4;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    goalCalories: Math.round(goalCalories),
    macros: {
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat)
    }
  };
}

// Gerador de treinos personalizados
export function generateWorkout(profile: UserProfile): Workout {
  const analysis = analyzeUserProfile(profile);
  const workoutTemplates = getWorkoutTemplates(profile.goal, profile.experience);
  
  return workoutTemplates[0]; // Simplificado para o MVP
}

// Templates de treino baseados em objetivo e experiência
function getWorkoutTemplates(goal: string, experience: string): Workout[] {
  // Dados simulados - em produção viria de um banco de dados
  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Agachamento',
      category: 'Pernas',
      muscleGroups: ['Quadríceps', 'Glúteos'],
      equipment: 'Barra',
      difficulty: 'intermediario',
      instructions: [
        'Posicione a barra nas costas',
        'Desça mantendo o peito ereto',
        'Suba explosivamente'
      ],
      tips: ['Mantenha os joelhos alinhados', 'Não curve as costas']
    },
    {
      id: '2',
      name: 'Supino Reto',
      category: 'Peito',
      muscleGroups: ['Peitoral', 'Tríceps', 'Deltoides'],
      equipment: 'Barra',
      difficulty: 'intermediario',
      instructions: [
        'Deite no banco com os pés no chão',
        'Desça a barra até o peito',
        'Empurre para cima controladamente'
      ],
      tips: ['Mantenha os ombros estáveis', 'Controle a descida']
    }
  ];

  return [
    {
      id: '1',
      name: `Treino ${goal.charAt(0).toUpperCase() + goal.slice(1)} - ${experience}`,
      description: `Treino personalizado focado em ${goal}`,
      exercises: exercises.map(ex => ({
        exercise: ex,
        sets: [
          { reps: 12, weight: 40, rest: 60 },
          { reps: 10, weight: 45, rest: 60 },
          { reps: 8, weight: 50, rest: 90 }
        ]
      })),
      estimatedDuration: 45,
      difficulty: experience as any,
      focus: [goal],
      createdAt: new Date()
    }
  ];
}

// Utilitários de formatação
export function formatWeight(weight: number): string {
  return `${weight}kg`;
}

export function formatHeight(height: number): string {
  return `${height}cm`;
}

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
}

export function getExperienceLabel(experience: string): string {
  const labels = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado'
  };
  return labels[experience as keyof typeof labels] || experience;
}

export function getGoalLabel(goal: string): string {
  const labels = {
    hipertrofia: 'Hipertrofia',
    emagrecimento: 'Emagrecimento',
    forca: 'Força',
    resistencia: 'Resistência',
    agilidade: 'Agilidade'
  };
  return labels[goal as keyof typeof labels] || goal;
}