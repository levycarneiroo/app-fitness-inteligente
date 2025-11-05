"use client";

import { useState } from 'react';
import { UserProfile } from '@/lib/types';
import { UserProfileForm } from '@/components/UserProfileForm';
import { FitnessDashboard } from '@/components/FitnessDashboard';

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileForm, setShowProfileForm] = useState(false);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowProfileForm(false);
  };

  const handleEditProfile = () => {
    setShowProfileForm(true);
  };

  // Se não tem perfil ou está editando, mostra o formulário
  if (!userProfile || showProfileForm) {
    return <UserProfileForm onProfileComplete={handleProfileComplete} />;
  }

  // Se tem perfil, mostra o dashboard
  return <FitnessDashboard profile={userProfile} onEditProfile={handleEditProfile} />;
}