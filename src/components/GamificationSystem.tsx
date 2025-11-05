"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Star, 
  Target, 
  Flame, 
  Zap, 
  Award, 
  Crown,
  Medal,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: 'comum' | 'raro' | 'epico' | 'lendario';
  xp: number;
}

interface GamificationSystemProps {
  userLevel: number;
  currentXP: number;
  nextLevelXP: number;
  streak: number;
  totalWorkouts: number;
}

export function GamificationSystem({ 
  userLevel, 
  currentXP, 
  nextLevelXP, 
  streak, 
  totalWorkouts 
}: GamificationSystemProps) {
  
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Primeira Vitória',
      description: 'Complete seu primeiro treino',
      icon: Trophy,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      rarity: 'comum',
      xp: 50
    },
    {
      id: '2',
      title: 'Sequência de Fogo',
      description: 'Mantenha uma sequência de 7 dias',
      icon: Flame,
      progress: streak,
      maxProgress: 7,
      unlocked: streak >= 7,
      rarity: 'raro',
      xp: 200
    },
    {
      id: '3',
      title: 'Guerreiro Dedicado',
      description: 'Complete 50 treinos',
      icon: Crown,
      progress: totalWorkouts,
      maxProgress: 50,
      unlocked: totalWorkouts >= 50,
      rarity: 'epico',
      xp: 500
    },
    {
      id: '4',
      title: 'Lenda do Fitness',
      description: 'Alcance o nível 20',
      icon: Medal,
      progress: userLevel,
      maxProgress: 20,
      unlocked: userLevel >= 20,
      rarity: 'lendario',
      xp: 1000
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'comum': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'raro': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'epico': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'lendario': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const levelProgress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="space-y-6">
      {/* Status do Jogador */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
            <Crown className="w-6 h-6 text-yellow-500" />
            Status do Atleta
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                Nível {userLevel}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {currentXP} / {nextLevelXP} XP
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {streak}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                dias seguidos
              </div>
            </div>
          </div>
          
          <Progress value={levelProgress} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-lg font-bold text-blue-600 dark:text-cyan-400">
                {totalWorkouts}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Treinos Completos
              </div>
            </div>
            <div className="p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-lg font-bold text-green-600 dark:text-emerald-400">
                {achievements.filter(a => a.unlocked).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Conquistas
              </div>
            </div>
            <div className="p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {Math.floor(totalWorkouts * 45 / 60)}h
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Tempo Total
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conquistas */}
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
            <Award className="w-6 h-6 text-yellow-500" />
            Conquistas
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked 
                      ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20' 
                      : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-green-100 text-green-600 dark:bg-green-800/50 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-semibold ${
                          achievement.unlocked 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {achievement.title}
                        </h4>
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {achievement.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-3">
                          <Progress 
                            value={(achievement.progress / achievement.maxProgress) * 100} 
                            className="h-2" 
                          />
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {achievement.progress}/{achievement.maxProgress}
                          </div>
                        </div>
                        
                        <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          +{achievement.xp} XP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Desafios Diários */}
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
            <Target className="w-6 h-6 text-red-500" />
            Desafios Diários
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="font-semibold dark:text-white">Complete 1 treino</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">+100 XP</div>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              Completo
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <div>
                <div className="font-semibold dark:text-white">Bata seu recorde pessoal</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">+200 XP</div>
              </div>
            </div>
            <Badge variant="outline" className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
              Pendente
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <div className="font-semibold dark:text-white">Mantenha a sequência</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">+50 XP</div>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              Completo
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}