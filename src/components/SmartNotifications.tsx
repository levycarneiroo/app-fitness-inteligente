"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Clock, 
  Dumbbell, 
  Apple, 
  Trophy, 
  Flame,
  Target,
  Heart,
  Zap,
  X,
  Check
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'workout' | 'nutrition' | 'achievement' | 'motivation' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationSettings {
  workoutReminders: boolean;
  nutritionAlerts: boolean;
  achievementNotifications: boolean;
  motivationalMessages: boolean;
  communityUpdates: boolean;
}

export function SmartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'workout',
      title: 'Hora do Treino!',
      message: 'Seu treino de peito e tríceps está agendado para agora. Vamos nessa! 💪',
      time: '2 min',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Nova Conquista!',
      message: 'Parabéns! Você desbloqueou a conquista "Sequência de Fogo" - 7 dias seguidos!',
      time: '1h',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'nutrition',
      title: 'Lembrete Nutricional',
      message: 'Não esqueça do seu shake pós-treino! Rico em proteínas para recuperação.',
      time: '3h',
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'motivation',
      title: 'Motivação Diária',
      message: 'Você já completou 75% da sua meta semanal! Continue assim, campeão! 🏆',
      time: '5h',
      read: true,
      priority: 'low'
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    workoutReminders: true,
    nutritionAlerts: true,
    achievementNotifications: true,
    motivationalMessages: true,
    communityUpdates: false
  });

  const [showSettings, setShowSettings] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'workout': return <Dumbbell className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'nutrition': return <Apple className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'motivation': return <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      case 'reminder': return <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default: return <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulação de notificações inteligentes baseadas no tempo
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      
      // Notificação de treino matinal (7-9h)
      if (hour >= 7 && hour <= 9 && settings.workoutReminders) {
        // Lógica para adicionar notificação de treino matinal
      }
      
      // Notificação de hidratação (a cada 2h)
      if (hour % 2 === 0 && settings.nutritionAlerts) {
        // Lógica para lembrete de hidratação
      }
    }, 60000); // Verifica a cada minuto

    return () => clearInterval(interval);
  }, [settings]);

  if (showSettings) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Configurações de Notificação
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowSettings(false)}
              className="dark:text-gray-400 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Dumbbell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-semibold dark:text-white">Lembretes de Treino</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Notificações sobre horários de treino
                  </div>
                </div>
              </div>
              <Switch 
                checked={settings.workoutReminders}
                onCheckedChange={(checked) => 
                  setSettings({...settings, workoutReminders: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Apple className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <div className="font-semibold dark:text-white">Alertas Nutricionais</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Lembretes sobre refeições e hidratação
                  </div>
                </div>
              </div>
              <Switch 
                checked={settings.nutritionAlerts}
                onCheckedChange={(checked) => 
                  setSettings({...settings, nutritionAlerts: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <div className="font-semibold dark:text-white">Conquistas</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Notificações sobre novas conquistas
                  </div>
                </div>
              </div>
              <Switch 
                checked={settings.achievementNotifications}
                onCheckedChange={(checked) => 
                  setSettings({...settings, achievementNotifications: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <div>
                  <div className="font-semibold dark:text-white">Mensagens Motivacionais</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Dicas e motivação personalizada
                  </div>
                </div>
              </div>
              <Switch 
                checked={settings.motivationalMessages}
                onCheckedChange={(checked) => 
                  setSettings({...settings, motivationalMessages: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <div className="font-semibold dark:text-white">Atualizações da Comunidade</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Novos posts e interações
                  </div>
                </div>
              </div>
              <Switch 
                checked={settings.communityUpdates}
                onCheckedChange={(checked) => 
                  setSettings({...settings, communityUpdates: checked})
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
            <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Notificações Inteligentes
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSettings(true)}
            className="dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600"
          >
            Configurar
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma notificação no momento</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold ${
                        !notification.read 
                          ? 'text-gray-900 dark:text-white' 
                          : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className={`text-sm ${
                      !notification.read 
                        ? 'text-gray-700 dark:text-gray-200' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-3">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1 h-auto"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Marcar como lida
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissNotification(notification.id)}
                        className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1 h-auto"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Dispensar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
              className="dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600"
            >
              Marcar todas como lidas
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}