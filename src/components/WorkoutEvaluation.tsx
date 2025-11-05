"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  TrendingUp,
  Target,
  Zap,
  Clock,
  Award,
  Send,
  BarChart3
} from 'lucide-react';

interface WorkoutFeedback {
  workoutId: string;
  rating: number;
  difficulty: 'muito_facil' | 'facil' | 'adequado' | 'dificil' | 'muito_dificil';
  energy: 'baixa' | 'media' | 'alta';
  enjoyment: number;
  notes: string;
  completedExercises: number;
  totalExercises: number;
  duration: number; // minutos
}

interface AIFeedback {
  recommendation: string;
  adjustments: string[];
  nextWorkout: string;
  motivationalMessage: string;
  progressInsight: string;
}

export function WorkoutEvaluation() {
  const [feedback, setFeedback] = useState<WorkoutFeedback>({
    workoutId: '1',
    rating: 0,
    difficulty: 'adequado',
    energy: 'media',
    enjoyment: 0,
    notes: '',
    completedExercises: 8,
    totalExercises: 10,
    duration: 45
  });

  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const aiFeedback: AIFeedback = {
    recommendation: "Excelente treino! Você completou 80% dos exercícios com boa intensidade. Para o próximo treino, vamos aumentar ligeiramente a carga nos exercícios compostos.",
    adjustments: [
      "Aumentar 2.5kg no agachamento",
      "Adicionar uma série extra no supino",
      "Reduzir descanso entre séries em 15 segundos"
    ],
    nextWorkout: "Treino de Costas e Bíceps - Foco em volume",
    motivationalMessage: "Você está 15% mais forte que no mês passado! Continue assim e alcançará seus objetivos em breve! 💪",
    progressInsight: "Sua consistência melhorou 40% nas últimas 4 semanas. O segredo está na regularidade!"
  };

  const handleRatingClick = (rating: number) => {
    setFeedback({ ...feedback, rating });
  };

  const handleEnjoymentClick = (enjoyment: number) => {
    setFeedback({ ...feedback, enjoyment });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowAIFeedback(true);
  };

  const completionPercentage = (feedback.completedExercises / feedback.totalExercises) * 100;

  if (submitted && showAIFeedback) {
    return (
      <div className="space-y-6">
        {/* Feedback da IA */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              Análise Inteligente do Treino
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                {aiFeedback.recommendation}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Ajustes Recomendados
                </h4>
                <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-200">
                  {aiFeedback.adjustments.map((adjustment, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {adjustment}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Próximo Treino
                </h4>
                <p className="text-sm text-green-700 dark:text-green-200">
                  {aiFeedback.nextWorkout}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700/50">
              <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Insight de Progresso
              </h4>
              <p className="text-orange-700 dark:text-orange-200 mb-2">
                {aiFeedback.progressInsight}
              </p>
              <p className="text-orange-600 dark:text-orange-300 font-medium">
                {aiFeedback.motivationalMessage}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas do Treino */}
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Estatísticas do Treino
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.round(completionPercentage)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Completado
                </div>
              </div>
              
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {feedback.duration}min
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Duração
                </div>
              </div>
              
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {feedback.rating}/5
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Avaliação
                </div>
              </div>
              
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 capitalize">
                  {feedback.energy}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Energia
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            onClick={() => {
              setSubmitted(false);
              setShowAIFeedback(false);
              setFeedback({
                workoutId: '1',
                rating: 0,
                difficulty: 'adequado',
                energy: 'media',
                enjoyment: 0,
                notes: '',
                completedExercises: 8,
                totalExercises: 10,
                duration: 45
              });
            }}
            variant="outline"
            className="dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600"
          >
            Avaliar Novo Treino
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
          <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Avaliação do Treino
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progresso do Treino */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold dark:text-white">Exercícios Completados</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {feedback.completedExercises}/{feedback.totalExercises}
            </span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
        </div>

        {/* Avaliação Geral */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Como foi o treino hoje? (1-5 estrelas)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                className={`p-2 rounded-lg transition-colors ${
                  star <= feedback.rating
                    ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400 dark:hover:text-yellow-500'
                }`}
              >
                <Star className={`w-6 h-6 ${star <= feedback.rating ? 'fill-current' : ''}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Dificuldade */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Como sentiu a dificuldade?
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[
              { value: 'muito_facil', label: 'Muito Fácil', color: 'green' },
              { value: 'facil', label: 'Fácil', color: 'blue' },
              { value: 'adequado', label: 'Adequado', color: 'yellow' },
              { value: 'dificil', label: 'Difícil', color: 'orange' },
              { value: 'muito_dificil', label: 'Muito Difícil', color: 'red' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFeedback({ ...feedback, difficulty: option.value as any })}
                className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                  feedback.difficulty === option.value
                    ? `bg-${option.color}-100 text-${option.color}-800 dark:bg-${option.color}-900/30 dark:text-${option.color}-300 ring-2 ring-${option.color}-300 dark:ring-${option.color}-600`
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nível de Energia */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Seu nível de energia durante o treino:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'baixa', label: 'Baixa', icon: '😴' },
              { value: 'media', label: 'Média', icon: '😐' },
              { value: 'alta', label: 'Alta', icon: '⚡' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFeedback({ ...feedback, energy: option.value as any })}
                className={`p-3 rounded-lg text-center transition-colors ${
                  feedback.energy === option.value
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 ring-2 ring-blue-300 dark:ring-blue-600'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">{option.icon}</div>
                <div className="text-sm font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Diversão/Satisfação */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            O quanto você curtiu o treino? (1-5)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => handleEnjoymentClick(level)}
                className={`p-3 rounded-lg transition-colors ${
                  level <= feedback.enjoyment
                    ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 hover:bg-pink-50 dark:hover:bg-pink-900/20'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Observações */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Observações adicionais (opcional):
          </label>
          <Textarea
            placeholder="Como se sentiu? Algum exercício foi especialmente desafiador? Dores ou desconfortos?"
            value={feedback.notes}
            onChange={(e) => setFeedback({ ...feedback, notes: e.target.value })}
            className="min-h-[100px] dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Botão de Envio */}
        <Button 
          onClick={handleSubmit}
          disabled={feedback.rating === 0}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 text-lg font-semibold"
        >
          <Send className="w-5 h-5 mr-2" />
          Enviar Avaliação e Receber Feedback da IA
        </Button>
      </CardContent>
    </Card>
  );
}