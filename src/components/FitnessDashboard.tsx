"use client";

import { useState } from 'react';
import { UserProfile, Workout } from '@/lib/types';
import { analyzeUserProfile, calculateCalorieNeeds, generateWorkout, getExperienceLabel, getGoalLabel, formatTime } from '@/lib/fitness-ai';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Importar os novos componentes do Módulo 2
import { GamificationSystem } from '@/components/GamificationSystem';
import { CommunityFeed } from '@/components/CommunityFeed';
import { SmartNotifications } from '@/components/SmartNotifications';
import { WorkoutEvaluation } from '@/components/WorkoutEvaluation';
import { WearableIntegration } from '@/components/WearableIntegration';

import { 
  Activity, 
  Target, 
  Zap, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Flame, 
  Dumbbell,
  Apple,
  Trophy,
  Play,
  BarChart3,
  Settings,
  Users,
  Bell,
  Watch,
  MessageSquare,
  Award,
  LogIn
} from 'lucide-react';
import Link from 'next/link';

interface FitnessDashboardProps {
  profile: UserProfile;
  onEditProfile: () => void;
}

export function FitnessDashboard({ profile, onEditProfile }: FitnessDashboardProps) {
  const analysis = analyzeUserProfile(profile);
  const nutrition = calculateCalorieNeeds(profile);
  const todayWorkout = generateWorkout(profile);

  // Dados simulados de progresso e gamificação
  const weekProgress = 3; // dias treinados esta semana
  const monthlyGoal = 16; // meta mensal
  const currentStreak = 5; // sequência atual
  const userLevel = 12;
  const currentXP = 2450;
  const nextLevelXP = 3000;
  const totalWorkouts = 47;

  // Dados do usuário para comunidade
  const currentUser = {
    name: profile.name,
    avatar: profile.name.split(' ').map(n => n[0]).join('').toUpperCase(),
    level: userLevel
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 dark:from-purple-600 dark:via-pink-600 dark:to-orange-500 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 dark:bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Flex</h1>
                <p className="text-blue-100 dark:text-orange-100">Seu personal trainer inteligente</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/auth">
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 dark:bg-white/20 dark:border-white/30 dark:hover:bg-white/30"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 dark:bg-white/20 dark:border-white/30 dark:hover:bg-white/30"
                onClick={onEditProfile}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 dark:bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Objetivo</span>
              </div>
              <p className="text-lg">{getGoalLabel(profile.goal)}</p>
            </div>
            
            <div className="bg-white/10 dark:bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Nível</span>
              </div>
              <p className="text-lg">{getExperienceLabel(profile.experience)}</p>
            </div>
            
            <div className="bg-white/10 dark:bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Frequência</span>
              </div>
              <p className="text-lg">{analysis.workoutFrequency}x por semana</p>
            </div>
            
            <div className="bg-white/10 dark:bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">Sequência</span>
              </div>
              <p className="text-lg">{currentStreak} dias</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Sistema de Abas para Organizar Funcionalidades */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/30">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="gamification" className="flex items-center gap-2 data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Conquistas</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2 data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Comunidade</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-orange-100 dark:data-[state=active]:bg-orange-900/30">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="wearables" className="flex items-center gap-2 data-[state=active]:bg-cyan-100 dark:data-[state=active]:bg-cyan-900/30">
              <Watch className="w-4 h-4" />
              <span className="hidden sm:inline">Wearables</span>
            </TabsTrigger>
            <TabsTrigger value="evaluation" className="flex items-center gap-2 data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/30">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Avaliação</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Principal */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Coluna Principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Treino de Hoje */}
                <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
                          <Dumbbell className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                          Treino de Hoje
                        </CardTitle>
                        <CardDescription className="text-base mt-1 dark:text-gray-300">
                          {todayWorkout.name}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-emerald-500/20 dark:text-emerald-300">
                        {formatTime(todayWorkout.estimatedDuration)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-purple-500/10 dark:to-pink-500/10 rounded-lg p-4">
                      <p className="text-gray-700 dark:text-gray-200 mb-3">{todayWorkout.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {todayWorkout.focus.map((focus, index) => (
                          <Badge key={index} variant="outline" className="bg-white dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600">
                            {focus}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {todayWorkout.exercises.slice(0, 3).map((workoutEx, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div>
                            <h4 className="font-semibold dark:text-white">{workoutEx.exercise.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {workoutEx.sets.length} séries • {workoutEx.exercise.muscleGroups.join(', ')}
                            </p>
                          </div>
                          <Badge variant="outline" className="dark:bg-gray-600/50 dark:text-gray-200 dark:border-gray-500">
                            {workoutEx.exercise.difficulty}
                          </Badge>
                        </div>
                      ))}
                      
                      {todayWorkout.exercises.length > 3 && (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                          +{todayWorkout.exercises.length - 3} exercícios adicionais
                        </p>
                      )}
                    </div>

                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 text-lg font-semibold">
                      <Play className="w-5 h-5 mr-2" />
                      Iniciar Treino
                    </Button>
                  </CardContent>
                </Card>

                {/* Análise da IA */}
                <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
                      <TrendingUp className="w-6 h-6 text-purple-600 dark:text-pink-400" />
                      Análise Inteligente
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Recomendações personalizadas baseadas no seu perfil
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-pink-500/10 dark:to-purple-500/10 rounded-lg p-4">
                      <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                        {analysis.recommendation}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-50 dark:bg-cyan-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-cyan-400">{analysis.workoutFrequency}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Treinos/semana</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-emerald-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-emerald-400 capitalize">{analysis.intensityLevel}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Intensidade</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{analysis.focusAreas.length}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Áreas de foco</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Áreas de Foco:</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.focusAreas.map((area, index) => (
                          <Badge key={index} className="bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Progresso Semanal */}
                <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <BarChart3 className="w-5 h-5 text-green-600 dark:text-emerald-400" />
                      Progresso Semanal
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-emerald-400">{weekProgress}/7</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">dias treinados</div>
                    </div>
                    
                    <Progress value={(weekProgress / 7) * 100} className="h-3" />
                    
                    <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                      Faltam {7 - weekProgress} treinos para completar a semana
                    </div>
                  </CardContent>
                </Card>

                {/* Nutrição */}
                <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Apple className="w-5 h-5 text-red-500 dark:text-red-400" />
                      Plano Nutricional
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{nutrition.goalCalories}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">calorias/dia</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium dark:text-gray-200">Proteína</span>
                        <span className="text-sm text-blue-600 dark:text-cyan-400 font-semibold">{nutrition.macros.protein}g</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium dark:text-gray-200">Carboidratos</span>
                        <span className="text-sm text-green-600 dark:text-emerald-400 font-semibold">{nutrition.macros.carbs}g</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium dark:text-gray-200">Gorduras</span>
                        <span className="text-sm text-orange-600 dark:text-orange-400 font-semibold">{nutrition.macros.fat}g</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600/50">
                      Ver Plano Completo
                    </Button>
                  </CardContent>
                </Card>

                {/* Meta Mensal */}
                <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Flame className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                      Meta Mensal
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{Math.round((weekProgress * 4 / monthlyGoal) * 100)}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">concluído</div>
                    </div>
                    
                    <Progress value={(weekProgress * 4 / monthlyGoal) * 100} className="h-3" />
                    
                    <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                      {weekProgress * 4}/{monthlyGoal} treinos este mês
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Sistema de Gamificação */}
          <TabsContent value="gamification">
            <GamificationSystem 
              userLevel={userLevel}
              currentXP={currentXP}
              nextLevelXP={nextLevelXP}
              streak={currentStreak}
              totalWorkouts={totalWorkouts}
            />
          </TabsContent>

          {/* Comunidade */}
          <TabsContent value="community">
            <CommunityFeed currentUser={currentUser} />
          </TabsContent>

          {/* Notificações Inteligentes */}
          <TabsContent value="notifications">
            <SmartNotifications />
          </TabsContent>

          {/* Integração com Wearables */}
          <TabsContent value="wearables">
            <WearableIntegration />
          </TabsContent>

          {/* Avaliação de Treino */}
          <TabsContent value="evaluation">
            <WorkoutEvaluation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}