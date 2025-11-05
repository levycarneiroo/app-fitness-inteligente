"use client";

import { useState } from 'react';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { User, Target, Activity, TrendingUp } from 'lucide-react';

interface UserProfileFormProps {
  onProfileComplete: (profile: UserProfile) => void;
}

export function UserProfileForm({ onProfileComplete }: UserProfileFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    bodyFat: '',
    experience: '',
    goal: '',
    sport: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: UserProfile = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseFloat(formData.weight),
      bodyFat: formData.bodyFat ? parseFloat(formData.bodyFat) : undefined,
      experience: formData.experience as any,
      goal: formData.goal as any,
      sport: formData.sport || undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    onProfileComplete(profile);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-500 dark:from-purple-600 dark:to-pink-500 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Flex
            </h1>
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Seu personal trainer inteligente está pronto para criar um plano personalizado
          </p>
        </div>

        {/* Formulário */}
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl dark:text-white">
              <User className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
              Vamos conhecer você
            </CardTitle>
            <CardDescription className="text-base dark:text-gray-300">
              Essas informações nos ajudam a criar o plano perfeito para seus objetivos
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-gray-200">Nome completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Seu nome"
                    required
                    className="h-12 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-gray-200">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="h-12 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Dados Físicos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="dark:text-gray-200">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateField('age', e.target.value)}
                    placeholder="25"
                    required
                    className="h-12 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="dark:text-gray-200">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => updateField('height', e.target.value)}
                    placeholder="175"
                    required
                    className="h-12 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="dark:text-gray-200">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => updateField('weight', e.target.value)}
                    placeholder="70.5"
                    required
                    className="h-12 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyFat" className="dark:text-gray-200">Percentual de gordura (%) - Opcional</Label>
                <Input
                  id="bodyFat"
                  type="number"
                  step="0.1"
                  value={formData.bodyFat}
                  onChange={(e) => updateField('bodyFat', e.target.value)}
                  placeholder="15.0"
                  className="h-12 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>

              {/* Experiência e Objetivo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="dark:text-gray-200">Nível de experiência</Label>
                  <Select value={formData.experience} onValueChange={(value) => updateField('experience', value)}>
                    <SelectTrigger className="h-12 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Selecione seu nível" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      <SelectItem value="iniciante" className="dark:text-gray-200 dark:focus:bg-gray-700">🟢 Iniciante</SelectItem>
                      <SelectItem value="intermediario" className="dark:text-gray-200 dark:focus:bg-gray-700">🟡 Intermediário</SelectItem>
                      <SelectItem value="avancado" className="dark:text-gray-200 dark:focus:bg-gray-700">🔴 Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="dark:text-gray-200">Objetivo principal</Label>
                  <Select value={formData.goal} onValueChange={(value) => updateField('goal', value)}>
                    <SelectTrigger className="h-12 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Qual seu objetivo?" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      <SelectItem value="hipertrofia" className="dark:text-gray-200 dark:focus:bg-gray-700">💪 Hipertrofia</SelectItem>
                      <SelectItem value="emagrecimento" className="dark:text-gray-200 dark:focus:bg-gray-700">🔥 Emagrecimento</SelectItem>
                      <SelectItem value="forca" className="dark:text-gray-200 dark:focus:bg-gray-700">⚡ Força</SelectItem>
                      <SelectItem value="resistencia" className="dark:text-gray-200 dark:focus:bg-gray-700">🏃 Resistência</SelectItem>
                      <SelectItem value="agilidade" className="dark:text-gray-200 dark:focus:bg-gray-700">⚡ Agilidade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sport" className="dark:text-gray-200">Esporte que pratica (opcional)</Label>
                <Input
                  id="sport"
                  value={formData.sport}
                  onChange={(e) => updateField('sport', e.target.value)}
                  placeholder="Ex: Futebol, Corrida, Natação..."
                  className="h-12 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>

              {/* Botão de Submit */}
              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                disabled={!formData.name || !formData.email || !formData.age || !formData.height || !formData.weight || !formData.experience || !formData.goal}
              >
                <Target className="w-5 h-5 mr-2" />
                Criar Meu Plano Personalizado
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
          <p className="flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Powered by Inteligência Artificial
          </p>
        </div>
      </div>
    </div>
  );
}