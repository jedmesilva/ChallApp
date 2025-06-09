import React, { useState } from 'react';
import { 
  ChevronLeft, Star, Award, TrendingUp, Calendar, MapPin, 
  CheckCircle2, Crown, Zap, Target, Heart, Camera, Music, 
  Code, Wrench, Book, Users, Eye, DollarSign, Clock, 
  Share2, Edit, Settings, Trophy, Medal, Flame, 
  ThumbsUp, MessageCircle, Gift, BadgeCheck
} from 'lucide-react';

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showShareModal, setShowShareModal] = useState(false);

  const userProfile = {
    name: 'João Silva',
    username: '@joaodev',
    avatar: '👨‍💻',
    bio: 'Desenvolvedor Full Stack apaixonado por tecnologia e fotografia. Sempre em busca de novos desafios!',
    location: 'Rio de Janeiro, RJ',
    joinDate: 'Membro desde Março 2023',
    verified: true,
    level: 'Expert',
    currentXP: 8750,
    nextLevelXP: 10000,
    stats: {
      missionsCompleted: 127,
      rating: 4.9,
      reviews: 89,
      earnings: 'R$ 8.450',
      responseTime: '< 1h',
      clientSatisfaction: 98,
      streak: 15
    }
  };

  const achievements = [
    {
      id: 1,
      title: 'Primeiro Milhão',
      description: 'Ganhou mais de R$ 1.000',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      rarity: 'comum',
      progress: 100,
      unlockedAt: '15 de Maio, 2024'
    },
    {
      id: 2,
      title: 'Fotógrafo Expert',
      description: '50 missões de fotografia concluídas',
      icon: Camera,
      color: 'from-purple-500 to-pink-600',
      rarity: 'raro',
      progress: 100,
      unlockedAt: '3 de Junho, 2024'
    },
    {
      id: 3,
      title: 'Velocidade da Luz',
      description: 'Respondeu em menos de 5 minutos',
      icon: Zap,
      color: 'from-yellow-500 to-orange-600',
      rarity: 'épico',
      progress: 100,
      unlockedAt: '20 de Maio, 2024'
    },
    {
      id: 4,
      title: 'Cliente Favorito',
      description: '100% de satisfação em 20 missões',
      icon: Heart,
      color: 'from-red-500 to-pink-600',
      rarity: 'lendário',
      progress: 100,
      unlockedAt: '1 de Junho, 2024'
    },
    {
      id: 5,
      title: 'Maratonista',
      description: 'Complete 10 missões em sequência',
      icon: Target,
      color: 'from-blue-500 to-indigo-600',
      rarity: 'raro',
      progress: 80,
      unlockedAt: null
    },
    {
      id: 6,
      title: 'Mestre das Artes',
      description: 'Complete missões em 5 categorias diferentes',
      icon: Crown,
      color: 'from-yellow-500 to-yellow-600',
      rarity: 'épico',
      progress: 60,
      unlockedAt: null
    }
  ];

  const categories = [
    { name: 'Fotografia', icon: Camera, missions: 45, color: 'bg-emerald-500', earnings: 'R$ 2.100' },
    { name: 'Tecnologia', icon: Code, missions: 32, color: 'bg-blue-500', earnings: 'R$ 3.200' },
    { name: 'Música', icon: Music, missions: 28, color: 'bg-purple-500', earnings: 'R$ 1.800' },
    { name: 'Serviços', icon: Wrench, missions: 15, color: 'bg-orange-500', earnings: 'R$ 900' },
    { name: 'Educação', icon: Book, missions: 7, color: 'bg-indigo-500', earnings: 'R$ 450' }
  ];

  const recentActivity = [
    {
      type: 'mission_completed',
      title: 'Fotografia de Evento',
      client: 'Maria Santos',
      rating: 5,
      earning: 'R$ 80',
      date: '2 dias atrás',
      icon: Camera
    },
    {
      type: 'achievement',
      title: 'Nova conquista desbloqueada',
      description: 'Fotógrafo Expert',
      date: '3 dias atrás',
      icon: Award
    },
    {
      type: 'mission_completed',
      title: 'Desenvolvimento Web',
      client: 'João Tech',
      rating: 5,
      earning: 'R$ 350',
      date: '5 dias atrás',
      icon: Code
    }
  ];

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'comum': return 'text-gray-600 bg-gray-100';
      case 'raro': return 'text-blue-600 bg-blue-100';
      case 'épico': return 'text-purple-600 bg-purple-100';
      case 'lendário': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const StatCard = ({ icon: Icon, label, value, subtitle, color = 'text-emerald-600' }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 bg-gray-100 rounded-xl`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <span className="text-gray-600 text-sm font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      {subtitle && (
        <div className="text-gray-500 text-sm">{subtitle}</div>
      )}
    </div>
  );

  const AchievementCard = ({ achievement }) => (
    <div className={`relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden ${
      !achievement.unlockedAt ? 'opacity-60' : ''
    }`}>
      {/* Background gradient for unlocked achievements */}
      {achievement.unlockedAt && (
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${achievement.color} opacity-10 rounded-full -translate-y-10 translate-x-10`} />
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-3 bg-gradient-to-br ${achievement.color} rounded-2xl shadow-lg`}>
            <achievement.icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
              {achievement.rarity}
            </span>
            {achievement.unlockedAt && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-1">{achievement.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Progresso</span>
            <span className="font-medium text-gray-700">{achievement.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${achievement.color} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
        </div>

        {achievement.unlockedAt ? (
          <div className="text-emerald-600 text-sm font-medium">
            Desbloqueado em {achievement.unlockedAt}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            Em progresso...
          </div>
        )}
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-2 bg-gray-100 rounded-xl">
        <activity.icon className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 mb-1">{activity.title}</h4>
        {activity.client && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-600 text-sm">Cliente: {activity.client}</span>
            {activity.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{activity.rating}</span>
              </div>
            )}
          </div>
        )}
        {activity.description && (
          <p className="text-gray-600 text-sm mb-1">{activity.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">{activity.date}</span>
          {activity.earning && (
            <span className="text-emerald-600 font-bold">{activity.earning}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full translate-y-16 -translate-x-16"></div>
        
        <div className="relative z-10 p-6 pt-12">
          <div className="flex items-center gap-4 mb-6">
            <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold flex-1">Meu Perfil</h1>
            <button 
              onClick={() => setShowShareModal(true)}
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm border-4 border-white border-opacity-30">
                {userProfile.avatar}
              </div>
              {userProfile.verified && (
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-3 border-white">
                  <BadgeCheck className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="absolute -top-2 -right-2">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-2 shadow-lg">
                  <Crown className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-1">{userProfile.name}</h2>
            <p className="text-emerald-100 mb-1">{userProfile.username}</p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-emerald-200" />
              <span className="text-emerald-100 text-sm">{userProfile.location}</span>
            </div>
            
            {/* Level Progress */}
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-100 font-medium">Nível {userProfile.level}</span>
                <span className="text-emerald-100 text-sm">
                  {userProfile.currentXP}/{userProfile.nextLevelXP} XP
                </span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
                <div 
                  className="bg-white rounded-full h-3 transition-all duration-500"
                  style={{ width: `${(userProfile.currentXP / userProfile.nextLevelXP) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="p-6 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <p className="text-gray-700 leading-relaxed mb-3">{userProfile.bio}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{userProfile.joinDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{userProfile.stats.streak} dias seguidos</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard 
            icon={Star} 
            label="Avaliação" 
            value={userProfile.stats.rating} 
            subtitle={`${userProfile.stats.reviews} avaliações`}
            color="text-yellow-600"
          />
          <StatCard 
            icon={Trophy} 
            label="Missões" 
            value={userProfile.stats.missionsCompleted} 
            subtitle="Concluídas"
            color="text-emerald-600"
          />
          <StatCard 
            icon={Clock} 
            label="Resposta" 
            value={userProfile.stats.responseTime} 
            subtitle="Tempo médio"
            color="text-blue-600"
          />
          <StatCard 
            icon={ThumbsUp} 
            label="Satisfação" 
            value={`${userProfile.stats.clientSatisfaction}%`} 
            subtitle="Dos clientes"
            color="text-purple-600"
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-6">
          {[
            { id: 'achievements', label: 'Conquistas', icon: Award },
            { id: 'categories', label: 'Categorias', icon: Target },
            { id: 'activity', label: 'Atividade', icon: Clock }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Conquistas</h3>
              <span className="text-gray-500 text-sm">
                {achievements.filter(a => a.unlockedAt).length}/{achievements.length} desbloqueadas
              </span>
            </div>
            <div className="grid gap-4">
              {achievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Por Categoria</h3>
              <span className="text-emerald-600 font-bold">{userProfile.stats.earnings}</span>
            </div>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${category.color} rounded-2xl shadow-lg`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{category.name}</h4>
                      <p className="text-gray-600 text-sm">{category.missions} missões concluídas</p>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-600 font-bold">{category.earnings}</div>
                      <div className="text-gray-500 text-sm">Total ganho</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Atividade Recente</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;