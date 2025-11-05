"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Trophy, 
  Flame, 
  TrendingUp,
  Users,
  Plus,
  Camera,
  Send
} from 'lucide-react';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  content: string;
  image?: string;
  achievement?: {
    title: string;
    icon: string;
  };
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
}

interface CommunityFeedProps {
  currentUser: {
    name: string;
    avatar: string;
    level: number;
  };
}

export function CommunityFeed({ currentUser }: CommunityFeedProps) {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'Ana Silva',
        avatar: 'AS',
        level: 12
      },
      content: 'Acabei de completar meu primeiro mês no Flex! 💪 Já perdi 3kg e me sinto muito mais forte. Obrigada pela motivação, pessoal!',
      achievement: {
        title: 'Primeiro Mês Completo',
        icon: '🏆'
      },
      likes: 24,
      comments: 8,
      timestamp: '2h',
      liked: false
    },
    {
      id: '2',
      user: {
        name: 'Carlos Santos',
        avatar: 'CS',
        level: 18
      },
      content: 'Novo recorde pessoal no supino hoje! 80kg x 5 reps 🔥 A consistência realmente compensa. Quem mais está batendo recordes essa semana?',
      likes: 31,
      comments: 12,
      timestamp: '4h',
      liked: true
    },
    {
      id: '3',
      user: {
        name: 'Maria Oliveira',
        avatar: 'MO',
        level: 8
      },
      content: 'Dica para iniciantes: não tenham medo de começar com pesos menores. O importante é manter a forma correta! 💡',
      likes: 18,
      comments: 5,
      timestamp: '6h',
      liked: false
    }
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleNewPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        user: currentUser,
        content: newPost,
        likes: 0,
        comments: 0,
        timestamp: 'agora',
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas da Comunidade */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl dark:text-white">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Comunidade Flex
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-cyan-400">
                12.5k
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Membros Ativos
              </div>
            </div>
            <div className="p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-emerald-400">
                847
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Posts Hoje
              </div>
            </div>
            <div className="p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                2.1k
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Conquistas
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criar Novo Post */}
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {currentUser.avatar}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Compartilhe sua conquista ou dica com a comunidade..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px] resize-none dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600">
                    <Camera className="w-4 h-4 mr-1" />
                    Foto
                  </Button>
                  <Button variant="outline" size="sm" className="dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600">
                    <Trophy className="w-4 h-4 mr-1" />
                    Conquista
                  </Button>
                </div>
                
                <Button 
                  onClick={handleNewPost}
                  disabled={!newPost.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed de Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700/50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {post.user.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold dark:text-white">{post.user.name}</span>
                    <Badge variant="outline" className="text-xs dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600">
                      Nível {post.user.level}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</span>
                  </div>
                  
                  {post.achievement && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{post.achievement.icon}</span>
                        <span className="font-semibold text-yellow-800 dark:text-yellow-300">
                          Conquista desbloqueada: {post.achievement.title}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
                    {post.content}
                  </p>
                  
                  {post.image && (
                    <div className="mb-4">
                      <img 
                        src={post.image} 
                        alt="Post image" 
                        className="rounded-lg max-w-full h-auto"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-6 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 ${
                        post.liked 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-gray-600 dark:text-gray-400'
                      } hover:text-red-600 dark:hover:text-red-400`}
                    >
                      <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                    >
                      <Share2 className="w-4 h-4" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botão Carregar Mais */}
      <div className="text-center">
        <Button 
          variant="outline" 
          className="dark:bg-gray-700/50 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600/50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Carregar mais posts
        </Button>
      </div>
    </div>
  );
}