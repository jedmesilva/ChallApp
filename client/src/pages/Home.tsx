import React, { useState, useEffect } from 'react';
import { MapPin, Clock, DollarSign, User, Heart, X, Star, Camera, Music, Code, Wrench, Book, Coffee, ChevronLeft, Share2, Bookmark, Navigation, MessageCircle, CheckCircle2, Filter, Search, Bell, TrendingUp, Zap, Award, Users, Eye, ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import ChallengeDetailsScreen from '@/components/ChallengeDetails';

const MissionsApp = () => {
  const [currentMission, setCurrentMission] = useState(0);
  const [acceptedMissions, setAcceptedMissions] = useState<any[]>([]);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showMissionDetails, setShowMissionDetails] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    distance: 'all',
    price: 'all'
  });
  const [, setLocation] = useLocation();

  const missions = [
    {
      id: 1,
      category: 'Fotografia',
      categoryColor: 'bg-orange-500',
      title: 'Fotógrafo de Evento',
      description: 'Grave um vídeo de 2 minutos do show que está acontecendo na Praça da Liberdade agora',
      location: 'Praça da Liberdade',
      distance: '1.2 km',
      time: 'Próximas 2 horas',
      price: 'R$ 40,00',
      urgency: 'Urgente',
      difficulty: 'Fácil',
      matchScore: 95,
      viewCount: 127,
      client: {
        name: 'Carlos Santos',
        rating: 4.9,
        reviews: 127,
        avatar: '👨‍💼',
        verified: true,
        responseTime: '< 1h'
      },
      icon: Camera,
      tags: ['Evento', 'Vídeo', 'Ao vivo'],
      benefits: ['Pagamento rápido', 'Cliente frequente', 'Avaliação garantida']
    },
    {
      id: 2,
      category: 'Música',
      categoryColor: 'bg-orange-400',
      title: 'Aula de Violão',
      description: 'Preciso de aulas particulares de violão para iniciante, 1 hora por semana',
      location: 'Savassi',
      distance: '3.5 km',
      time: 'Flexível',
      price: 'R$ 60,00',
      urgency: 'Normal',
      difficulty: 'Médio',
      matchScore: 87,
      viewCount: 89,
      client: {
        name: 'Maria Silva',
        rating: 4.7,
        reviews: 89,
        avatar: '👩‍🎓',
        verified: true,
        responseTime: '< 2h'
      },
      icon: Music,
      tags: ['Aulas', 'Música', 'Iniciante'],
      benefits: ['Longo prazo', 'Flexibilidade de horário']
    },
    {
      id: 3,
      category: 'Tecnologia',
      categoryColor: 'bg-orange-600',
      title: 'Desenvolvimento Web',
      description: 'Criar landing page responsiva para pequena empresa local',
      location: 'Remoto',
      distance: 'Online',
      time: '1 semana',
      price: 'R$ 350,00',
      urgency: 'Normal',
      difficulty: 'Avançado',
      matchScore: 92,
      viewCount: 203,
      client: {
        name: 'João Ferreira',
        rating: 4.8,
        reviews: 203,
        avatar: '👨‍💻',
        verified: true,
        responseTime: '< 30min'
      },
      icon: Code,
      tags: ['Web', 'Landing Page', 'Responsivo'],
      benefits: ['Alto valor', 'Portfolio', 'Trabalho remoto']
    },
    {
      id: 4,
      category: 'Serviços',
      categoryColor: 'bg-orange-500',
      title: 'Montagem de Móveis',
      description: 'Montar guarda-roupa e cômoda que chegaram hoje da loja',
      location: 'Bairro Funcionários',
      distance: '2.1 km',
      time: 'Hoje',
      price: 'R$ 80,00',
      urgency: 'Urgente',
      difficulty: 'Médio',
      matchScore: 78,
      viewCount: 156,
      client: {
        name: 'Ana Costa',
        rating: 4.6,
        reviews: 156,
        avatar: '👩‍🔧',
        verified: false,
        responseTime: '< 3h'
      },
      icon: Wrench,
      tags: ['Montagem', 'Móveis', 'Urgente'],
      benefits: ['Pagamento na hora', 'Trabalho rápido']
    },
    {
      id: 5,
      category: 'Educação',
      categoryColor: 'bg-orange-400',
      title: 'Aula de Matemática',
      description: 'Reforço escolar em matemática para ensino médio, 2x por semana',
      location: 'Centro',
      distance: '4.2 km',
      time: 'Tardes livres',
      price: 'R$ 45,00/aula',
      urgency: 'Normal',
      difficulty: 'Médio',
      matchScore: 85,
      viewCount: 78,
      client: {
        name: 'Pedro Oliveira',
        rating: 4.9,
        reviews: 78,
        avatar: '👨‍🏫',
        verified: true,
        responseTime: '< 1h'
      },
      icon: Book,
      tags: ['Educação', 'Matemática', 'Reforço'],
      benefits: ['Recorrente', 'Impacto social', 'Horário flexível']
    }
  ];

  const showToastMessage = (message: string, type = 'success') => {
    setToastMessage({ text: message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAccept = async (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setIsLoading(true);
    const mission = missions[currentMission];

    // Animação de aceite
    setSwipeDirection('right');

    await new Promise(resolve => setTimeout(resolve, 300));

    setAcceptedMissions([...acceptedMissions, mission]);
    showToastMessage('Missão aceita! Redirecionando para execução...', 'success');

    // Navegar para página de execução da missão
    setTimeout(() => {
      setLocation(`/mission/${mission.id}/execute`);
    }, 1000);

    setIsLoading(false);
    setSwipeDirection(null);
  };

  const handleSkip = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setSwipeDirection('left');
    showToastMessage('Missão pulada', 'info');
    setTimeout(() => {
      setSwipeDirection(null);
      nextMission();
    }, 300);
  };

  const handleShowDetails = () => {
    setShowMissionDetails(true);
  };

  const handleAcceptFromDetails = () => {
    setShowMissionDetails(false);
    handleAccept();
  };

  const nextMission = () => {
    setCurrentMission((prev) => (prev + 1) % missions.length);
    setCardPosition({ x: 0, y: 0, rotation: 0 });
  };

  const mission = missions[currentMission];
  const IconComponent = mission.icon;

  // Improved Toast Component
  const Toast = ({ message, show }: { message: any; show: boolean }) => (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95'
    }`}>
      <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border glass-card ${
        message.type === 'success' ? 'bg-orange-50/80 border-orange-200/50 text-orange-800' :
        message.type === 'info' ? 'bg-blue-50/80 border-blue-200/50 text-blue-800' :
        'glass-card text-primary'
      }`}>
        {message.type === 'success' && <CheckCircle2 className="w-5 h-5 text-orange-500" />}
        {message.type === 'info' && <Eye className="w-5 h-5 text-blue-500" />}
        <span className="font-medium">{message.text}</span>
      </div>
    </div>
  );

  // Quick Stats Component
  const QuickStats = () => (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Match</span>
        </div>
        <p className="text-2xl font-bold text-white">{mission.matchScore}%</p>
      </div>
      <div className="flex-1 bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Interessados</span>
        </div>
        <p className="text-2xl font-bold text-white">{mission.viewCount}</p>
      </div>
    </div>
  );

  // Filters Modal
  const FiltersModal = () => (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
      <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 transition-transform duration-300 ${showFilters ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
        <h3 className="text-xl font-bold text-gray-800 mb-6">Filtros</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Categoria</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'Fotografia', 'Música', 'Tecnologia', 'Serviços', 'Educação'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilters({...filters, category: cat})}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.category === cat 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'Todas' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setShowFilters(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={() => setShowFilters(false)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (showAccepted) {
    return (
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        {/* Enhanced Accepted Missions Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 pt-12 text-white">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => setShowAccepted(false)}
              className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Minhas Missões</h1>
              <p className="text-orange-100 text-sm">{acceptedMissions.length} missões aceitas</p>
            </div>
          </div>
        </div>

        {/* Enhanced Accepted Missions List */}
        <div className="p-4 space-y-4 -mt-4">
          {acceptedMissions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhuma missão ainda</h3>
              <p className="text-gray-500 text-sm">Aceite missões para começar a trabalhar</p>
            </div>
          ) : (
            acceptedMissions.map((acceptedMission, index) => (
              <div key={acceptedMission.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${acceptedMission.categoryColor} rounded-2xl shadow-lg`}>
                    <acceptedMission.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">{acceptedMission.title}</h3>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                        Aceita
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">{acceptedMission.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-bold text-xl">{acceptedMission.price}</span>
                      <button className="text-orange-600 font-medium text-sm flex items-center gap-1 hover:text-orange-700">
                        Ver detalhes <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-bg)' }}>
      <Toast message={toastMessage} show={showToast} />
      <FiltersModal />

      {/* Enhanced Header */}
      <div className="gradient-header p-6 pt-12 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full translate-y-16 -translate-x-16"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white bg-opacity-50 rounded-full"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Bom dia! 🌅</h1>
              <p className="text-orange-100">Suas melhores oportunidades te esperam</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(true)}
                className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200 hover:scale-105"
              >
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200 hover:scale-105 relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full"></div>
              </button>
              <button 
                onClick={() => setShowAccepted(true)}
                className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200 hover:scale-105 relative"
              >
                <Heart className="w-5 h-5" />
                {acceptedMissions.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {acceptedMissions.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          <QuickStats />

          {/* Enhanced Progress */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${((currentMission + 1) / missions.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-orange-100 text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {currentMission + 1}/{missions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Mission Card */}
      <div className="px-6 -mt-8 relative z-10">
        {(() => {
          const mission = missions[currentMission];
          const IconComponent = mission?.icon || Camera;

          return (
            <div 
              onClick={handleShowDetails}
              className={`glass-card rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl ${
                swipeDirection === 'right' ? 'transform translate-x-full rotate-12 opacity-0' :
                swipeDirection === 'left' ? 'transform -translate-x-full -rotate-12 opacity-0' :
                'transform translate-x-0 rotate-0 opacity-100'
              }`}>

          {/* Card Header with Match Score */}
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <div className="gradient-primary text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                <Zap className="w-4 h-4" />
                {mission.matchScore}% match
              </div>
            </div>

            <div className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-4 gradient-primary rounded-2xl shadow-lg">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <span className="px-3 py-1 gradient-card-secondary text-gray-800 dark:text-white rounded-full text-sm font-semibold border border-white/20 dark:border-white/10">
                    {mission.category}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                      <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{mission.viewCount} interessados</span>
                    </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 leading-tight">{mission.title}</h2>

              {/* Enhanced Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mission.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-200 rounded-xl text-sm font-medium border border-orange-200 dark:border-orange-500/40">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-base font-medium">
                {mission.description}
              </p>

              {/* Enhanced Info Grid */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-xl">
                    <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-800 dark:text-white font-semibold">{mission.location}</span>
                    <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">{mission.distance} de distância</div>
                  </div>
                  <Navigation className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <div className="text-gray-800 dark:text-white font-semibold text-sm">{mission.time}</div>
                      <span className={`text-xs font-medium ${
                        mission.urgency === 'Urgente' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {mission.urgency}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <DollarSign className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">R$ {mission.price.replace('R$ ', '')}</div>
                      <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{mission.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              {mission.benefits && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-1">
                    <Award className="w-4 h-4 text-orange-500" />
                    Vantagens desta missão
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mission.benefits.map((benefit, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-500/30 dark:text-orange-200 rounded-lg text-xs font-medium border border-orange-200 dark:border-orange-500/40">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Client Info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center text-2xl text-white">
                      {mission.client.avatar}
                    </div>
                    {mission.client.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-800 dark:text-white">{mission.client.name}</p>
                      {mission.client.verified && (
                        <span className="text-orange-600 dark:text-orange-400 text-xs font-medium">Verificado</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-800 dark:text-white">{mission.client.rating}</span>
                        <span className="text-gray-600 dark:text-gray-300">({mission.client.reviews})</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">•</span>
                      <span className="text-orange-600 dark:text-orange-400 font-medium">Responde {mission.client.responseTime}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="p-6 pt-0">
              <div className="flex gap-4">
                <button 
                  onClick={(e) => handleSkip(e)}
                  className="flex-1 btn-header text-white rounded-2xl py-4 flex items-center justify-center gap-2 text-lg font-semibold"
                >
                  <X className="w-6 h-6" />
                  Pular
                </button>

                <button 
                  onClick={(e) => handleAccept(e)}
                  disabled={isLoading}
                  className="flex-1 btn-header text-white rounded-2xl py-4 flex items-center justify-center gap-2 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Heart className="w-6 h-6" />
                  )}
                  {isLoading ? 'Conectando...' : 'Aceitar Missão'}
                </button>
              </div>

              {/* Quick action hint */}
              <div className="text-center mt-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                  Deslize → para aceitar ou ← para pular
                </p>
              </div>
            </div>
          </div>
            </div>
          );
        })()}
      </div>

      {/* Modal de Detalhes da Missão */}
      {showMissionDetails && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[90vh] overflow-hidden">
            <ChallengeDetailsScreen 
              mission={missions[currentMission]}
              onClose={() => setShowMissionDetails(false)}
              onAccept={handleAcceptFromDetails}
            />
          </div>
        </div>
      )}

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};

export default MissionsApp;