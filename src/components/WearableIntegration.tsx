"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Watch, 
  Heart, 
  Activity, 
  Zap, 
  TrendingUp,
  Bluetooth,
  Battery,
  Wifi,
  Clock,
  Target,
  Flame
} from 'lucide-react';

interface WearableData {
  heartRate: number;
  steps: number;
  calories: number;
  activeMinutes: number;
  sleepHours: number;
  batteryLevel: number;
  connected: boolean;
  lastSync: string;
}

interface HealthMetrics {
  restingHeartRate: number;
  maxHeartRate: number;
  vo2Max: number;
  recoveryScore: number;
  stressLevel: 'baixo' | 'medio' | 'alto';
  hydrationLevel: number;
}

export function WearableIntegration() {
  const [wearableData, setWearableData] = useState<WearableData>({
    heartRate: 72,
    steps: 8420,
    calories: 1850,
    activeMinutes: 45,
    sleepHours: 7.5,
    batteryLevel: 78,
    connected: true,
    lastSync: '2 min atrás'
  });

  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    restingHeartRate: 65,
    maxHeartRate: 185,
    vo2Max: 42,
    recoveryScore: 85,
    stressLevel: 'baixo',
    hydrationLevel: 65
  });

  const [isConnecting, setIsConnecting] = useState(false);

  // Simulação de dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      if (wearableData.connected) {
        setWearableData(prev => ({
          ...prev,
          heartRate: 68 + Math.floor(Math.random() * 20),
          steps: prev.steps + Math.floor(Math.random() * 50),
          calories: prev.calories + Math.floor(Math.random() * 10),
          activeMinutes: prev.activeMinutes + (Math.random() > 0.7 ? 1 : 0)
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [wearableData.connected]);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulação de conexão
    setTimeout(() => {
      setWearableData(prev => ({ ...prev, connected: true, lastSync: 'agora' }));
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setWearableData(prev => ({ ...prev, connected: false }));
  };

  const getHeartRateZone = (hr: number) => {
    const maxHR = healthMetrics.maxHeartRate;
    const percentage = (hr / maxHR) * 100;
    
    if (percentage < 60) return { zone: 'Repouso', color: 'blue' };
    if (percentage < 70) return { zone: 'Queima de Gordura', color: 'green' };
    if (percentage < 80) return { zone: 'Aeróbico', color: 'yellow' };
    if (percentage < 90) return { zone: 'Anaeróbico', color: 'orange' };
    return { zone: 'Máximo', color: 'red' };
  };

  const getStressColor = (level: string) => {
    switch (level) {
      case 'baixo': return 'text-green-600 dark:text-green-400';
      case 'medio': return 'text-yellow-600 dark:text-yellow-400';
      case 'alto': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const dailyGoals = {
    steps: 10000,
    calories: 2200,
    activeMinutes: 60,
    water: 2000 // ml
  };

  return (
    <div className="space-y-6">
      {/* Status da Conexão */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
            <Watch className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Dispositivos Conectados
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                wearableData.connected ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <div>
                <div className="font-semibold dark:text-white">Apple Watch Series 9</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <Battery className="w-4 h-4" />
                  {wearableData.batteryLevel}%
                  <span className="mx-2">•</span>
                  Última sincronização: {wearableData.lastSync}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              {wearableData.connected ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDisconnect}
                  className="dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600"
                >
                  <Bluetooth className="w-4 h-4 mr-1" />
                  Desconectar
                </Button>
              ) : (
                <Button 
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  <Bluetooth className="w-4 h-4 mr-1" />
                  {isConnecting ? 'Conectando...' : 'Conectar'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {wearableData.connected && (
        <>
          {/* Métricas em Tempo Real */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
                <Activity className="w-6 h-6 text-red-500" />
                Métricas em Tempo Real
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {wearableData.heartRate}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">BPM</div>
                  <Badge className={`mt-1 bg-${getHeartRateZone(wearableData.heartRate).color}-100 text-${getHeartRateZone(wearableData.heartRate).color}-800 dark:bg-${getHeartRateZone(wearableData.heartRate).color}-900/30 dark:text-${getHeartRateZone(wearableData.heartRate).color}-300`}>
                    {getHeartRateZone(wearableData.heartRate).zone}
                  </Badge>
                </div>
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Activity className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {wearableData.steps.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Passos</div>
                  <Progress 
                    value={(wearableData.steps / dailyGoals.steps) * 100} 
                    className="h-2 mt-2" 
                  />
                </div>
                
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {wearableData.calories}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Calorias</div>
                  <Progress 
                    value={(wearableData.calories / dailyGoals.calories) * 100} 
                    className="h-2 mt-2" 
                  />
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {wearableData.activeMinutes}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Min Ativo</div>
                  <Progress 
                    value={(wearableData.activeMinutes / dailyGoals.activeMinutes) * 100} 
                    className="h-2 mt-2" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Análise de Saúde */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                Análise de Saúde
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold dark:text-white">FC Repouso</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {healthMetrics.restingHeartRate} BPM
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Excelente para sua idade
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold dark:text-white">VO2 Max</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      {healthMetrics.vo2Max} ml/kg/min
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Condicionamento acima da média
                  </div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold dark:text-white">Recuperação</span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">
                      {healthMetrics.recoveryScore}%
                    </span>
                  </div>
                  <Progress value={healthMetrics.recoveryScore} className="h-2" />
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold dark:text-white">Nível de Stress</span>
                    <span className={`font-bold capitalize ${getStressColor(healthMetrics.stressLevel)}`}>
                      {healthMetrics.stressLevel}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Baseado na variabilidade da FC
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-800 dark:text-cyan-300 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Recomendações Inteligentes
                </h4>
                <ul className="space-y-1 text-sm text-cyan-700 dark:text-cyan-200">
                  <li>• Sua recuperação está ótima - pode intensificar o treino hoje</li>
                  <li>• FC de repouso baixa indica excelente condicionamento cardiovascular</li>
                  <li>• Mantenha a hidratação - você está 35% abaixo da meta diária</li>
                  <li>• Qualidade do sono excelente (7.5h) - continue assim!</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Metas Diárias */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                Metas Diárias
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium dark:text-white">Passos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={(wearableData.steps / dailyGoals.steps) * 100} 
                      className="w-32 h-2" 
                    />
                    <span className="text-sm font-semibold dark:text-gray-200">
                      {wearableData.steps.toLocaleString()}/{dailyGoals.steps.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <span className="font-medium dark:text-white">Calorias</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={(wearableData.calories / dailyGoals.calories) * 100} 
                      className="w-32 h-2" 
                    />
                    <span className="text-sm font-semibold dark:text-gray-200">
                      {wearableData.calories}/{dailyGoals.calories}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-medium dark:text-white">Minutos Ativos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={(wearableData.activeMinutes / dailyGoals.activeMinutes) * 100} 
                      className="w-32 h-2" 
                    />
                    <span className="text-sm font-semibold dark:text-gray-200">
                      {wearableData.activeMinutes}/{dailyGoals.activeMinutes}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <span className="font-medium dark:text-white">Hidratação</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={healthMetrics.hydrationLevel} 
                      className="w-32 h-2" 
                    />
                    <span className="text-sm font-semibold dark:text-gray-200">
                      {Math.round(dailyGoals.water * healthMetrics.hydrationLevel / 100)}ml/{dailyGoals.water}ml
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}