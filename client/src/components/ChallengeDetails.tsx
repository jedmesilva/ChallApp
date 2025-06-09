import React, { useState } from 'react';
import { 
  ChevronLeft, Camera, MapPin, Clock, DollarSign, User, CheckCircle2, 
  Circle, Star, MessageCircle, Phone, AlertTriangle, Award, Timer, 
  Navigation, Share2, Flag, Eye, FileText, Image, Video, Mic, 
  ChevronRight, Zap, Target, Users, TrendingUp, Heart, X, Bookmark,
  Shield, Briefcase, Calendar, Route, Upload, Info, PlayCircle,
  CheckSquare, ArrowRight, Lightbulb, Package, Medal
} from 'lucide-react';

interface ChallengeDetailsProps {
  mission?: any;
  onClose?: () => void;
  onAccept?: () => void;
}

const ChallengeDetailsScreen = ({ mission, onClose, onAccept }: ChallengeDetailsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Usar dados da missão passada como prop ou valores padrão
  const challenge = mission ? {
    ...mission,
    fullDescription: mission.description + '. Este é um desafio especial que permite desenvolver suas habilidades enquanto ganha dinheiro.',
    estimatedDuration: '30-45 min',
    interestedCount: mission.viewCount || 8,
    categoryColor: mission.categoryColor || 'bg-emerald-500',
    tags: mission.tags || ['Desafio', 'Oportunidade'],
    requirements: mission.requirements || ['Disponibilidade', 'Comprometimento'],
    client: mission.client || {
      name: 'Cliente',
      rating: 4.5,
      reviews: 50,
      avatar: '👤',
      verified: true,
      responseTime: '< 1h',
      completedMissions: 20,
      memberSince: '2023',
      bio: 'Cliente verificado na plataforma.'
    },
    rewards: {
      money: mission.price || 'R$ 40,00',
      points: 65,
      badge: 'Conquistador',
      experience: '+120 XP',
      rating: 'Até +0.1 na avaliação'
    },
    riskFactors: [
      'Mantenha seus pertences seguros',
      'Seja pontual com os prazos',
      'Comunique-se com o cliente'
    ],
    checkpoints: [
      {
        id: 1,
        title: 'Iniciar Missão',
        description: 'Confirme o início da missão',
        type: 'location',
        icon: Navigation,
        required: true,
        estimatedTime: '5 min',
        difficulty: 'Fácil',
        points: 10,
        instructions: [
          'Confirme sua disponibilidade',
          'Leia todas as instruções',
          'Prepare os materiais necessários'
        ],
        tips: ['Organize-se antes de começar'],
        verification: 'Confirmação manual'
      }
    ]
  } : {
    id: 1,
    category: 'Fotografia',
    categoryColor: 'bg-emerald-500',
    title: 'Fotógrafo de Evento',
    description: 'Grave um vídeo de 2 minutos do show que está acontecendo na Praça da Liberdade agora. Este é um evento cultural importante da cidade e precisa ser documentado com qualidade profissional.',
    fullDescription: 'Este é um evento cultural especial que acontece na Praça da Liberdade. Você será responsável por capturar a essência do evento através de um vídeo de 2 minutos e fotos complementares. O evento conta com apresentações musicais, dança e performances artísticas. É uma oportunidade única de documentar a cultura local e contribuir para a preservação da memória cultural da cidade.',
    location: 'Praça da Liberdade',
    distance: '1.2 km',
    time: 'Próximas 2 horas',
    price: 'R$ 40,00',
    urgency: 'Urgente',
    difficulty: 'Fácil',
    estimatedDuration: '30-45 min',
    matchScore: 95,
    viewCount: 127,
    interestedCount: 8,
    icon: Camera,
    tags: ['Evento', 'Vídeo', 'Ao vivo', 'Cultural'],
    benefits: ['Pagamento rápido', 'Cliente frequente', 'Avaliação garantida', 'Experiência cultural'],
    client: {
      name: 'Carlos Santos',
      rating: 4.9,
      reviews: 127,
      avatar: '👨‍💼',
      verified: true,
      responseTime: '< 1h',
      completedMissions: 45,
      memberSince: 'Janeiro 2023',
      bio: 'Organizador de eventos culturais em BH. Trabalho com documentação de eventos há mais de 5 anos.'
    },
    requirements: [
      'Smartphone com câmera HD',
      'Bateria com pelo menos 50%',
      'Espaço livre para gravação',
      'Disponibilidade imediata'
    ],
    checkpoints: [
      {
        id: 1,
        title: 'Chegar ao Local',
        description: 'Vá até a Praça da Liberdade e localize o evento',
        type: 'location',
        icon: Navigation,
        required: true,
        estimatedTime: '15 min',
        difficulty: 'Fácil',
        points: 5,
        instructions: [
          'Use o GPS integrado no app para navegação',
          'Procure por aglomeração de pessoas e música',
          'Identifique o palco ou área principal do evento',
          'Confirme sua chegada através do GPS automático'
        ],
        tips: [
          'Chegue com 10 minutos de antecedência',
          'Leve fones de ouvido caso precise ouvir instruções'
        ],
        verification: 'GPS automático + confirmação manual'
      },
      {
        id: 2,
        title: 'Confirmação Visual',
        description: 'Tire uma foto do evento para confirmar sua presença',
        type: 'photo',
        icon: Camera,
        required: true,
        estimatedTime: '3 min',
        difficulty: 'Fácil',
        points: 10,
        instructions: [
          'Tire uma foto que mostre o evento acontecendo',
          'Inclua pessoas, palco ou atividade principal',
          'Certifique-se de que a foto esteja bem iluminada',
          'A foto deve ser em modo retrato ou paisagem'
        ],
        tips: [
          'Evite contraluz para melhor qualidade',
          'Mantenha o celular estável'
        ],
        verification: 'Upload obrigatório de 1 foto'
      },
      {
        id: 3,
        title: 'Gravação Principal',
        description: 'Grave um vĂ­deo de exatamente 2 minutos do show',
        type: 'video',
        icon: Video,
        required: true,
        estimatedTime: '5 min',
        difficulty: 'Médio',
        points: 25,
        instructions: [
          'Posicione-se em local com boa visibilidade',
          'Grave OBRIGATORIAMENTE em modo paisagem (horizontal)',
          'Mantenha o celular estável durante toda a gravação',
          'Capture o áudio ambiente - não use música própria',
          'O vídeo deve ter EXATAMENTE 2 minutos (120 segundos)',
          'Evite movimentos bruscos da câmera'
        ],
        tips: [
          'Use as duas mãos para maior estabilidade',
          'Teste o áudio antes de começar',
          'Procure um local elevado se possível'
        ],
        verification: 'Upload de vídeo de 2min obrigatório'
      },
      {
        id: 4,
        title: 'Documentação Extra',
        description: 'Capture 3-5 fotos adicionais do ambiente',
        type: 'photos',
        icon: Image,
        required: false,
        estimatedTime: '5 min',
        difficulty: 'Fácil',
        points: 15,
        instructions: [
          'Tire 3-5 fotos de diferentes ângulos',
          'Inclua fotos do público e da atmosfera',
          'Capture detalhes interessantes do evento',
          'Varie entre fotos gerais e close-ups'
        ],
        tips: [
          'Fotos opcionais, mas aumentam a avaliação',
          'Cliente valoriza documentação completa'
        ],
        verification: 'Upload de 3-5 fotos extras'
      },
      {
        id: 5,
        title: 'Entrega Final',
        description: 'Envie todo o material e finalize a missão',
        type: 'upload',
        icon: Upload,
        required: true,
        estimatedTime: '3 min',
        difficulty: 'Fácil',
        points: 10,
        instructions: [
          'Verifique a qualidade de todos os arquivos',
          'Confirme que o vídeo principal tem 2 minutos',
          'Adicione uma breve descrição do evento (opcional)',
          'Aguarde confirmação de upload completo'
        ],
        tips: [
          'Conexão Wi-Fi acelera o upload',
          'Aguarde 100% de conclusão antes de sair'
        ],
        verification: 'Upload completo e verificação automática'
      }
    ],
    rewards: {
      money: 'R$ 40,00',
      points: 65,
      badge: 'Documentarista Cultural',
      experience: '+120 XP',
      rating: 'Até +0.1 na avaliação'
    },
    riskFactors: [
      'Evento ao ar livre - verifique o clima',
      'Multidão - mantenha seus pertences seguros',
      'Prazo apertado - seja pontual'
    ]
  };

  const difficultyColor = {
    'Fácil': 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30',
    'Médio': 'text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/30',
    'Difícil': 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30'
  };

  const typeIcons = {
    location: Navigation,
    photo: Camera,
    video: Video,
    photos: Image,
    upload: Upload
  };

  const CheckpointCard = ({ checkpoint, index }) => {
    const IconComponent = typeIcons[checkpoint.type] || Circle;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-12 h-12 btn-header rounded-xl flex items-center justify-center shadow-lg">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
              {index + 1}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">{checkpoint.title}</h3>
              <div className="flex flex-col items-end gap-1">
                {checkpoint.required ? (
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium">
                    Obrigatório
                  </span>
                ) : (
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                    Opcional
                  </span>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColor[checkpoint.difficulty]}`}>
                  {checkpoint.difficulty}
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-3 font-medium">{checkpoint.description}</p>

            <div className="flex items-center gap-4 mb-3 text-sm">
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <Timer className="w-4 h-4" />
                <span className="font-medium">{checkpoint.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1 text-orange-primary">
                <Award className="w-4 h-4" />
                <span className="font-medium">{checkpoint.points} pontos</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-1">Instruções:</h4>
                <ul className="space-y-1">
                  {checkpoint.instructions.slice(0, 2).map((instruction, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckSquare className="w-3 h-3 text-orange-primary mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{instruction}</span>
                    </li>
                  ))}
                </ul>
                {checkpoint.instructions.length > 2 && (
                  <button className="text-orange-primary text-sm font-medium mt-1 flex items-center gap-1 hover:opacity-80">
                    Ver todas as instruções <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {checkpoint.tips && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-lg p-2">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-yellow-800 dark:text-yellow-300 text-sm">Dicas:</h5>
                      <p className="text-yellow-700 dark:text-yellow-200 text-sm font-medium">{checkpoint.tips[0]}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white-solid h-screen flex flex-col fixed inset-0 z-50">
      {/* Scrollable Content - Everything scrolls together */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div className="gradient-header p-6 pt-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={onClose}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex-1">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  {challenge.category}
                </span>
                <h1 className="text-2xl font-bold mt-1">{challenge.title}</h1>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setBookmarked(!bookmarked)}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30"
                >
                  <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
                <Zap className="w-5 h-5 mx-auto mb-1" />
                <div className="font-bold text-lg">{challenge.matchScore}%</div>
                <div className="text-xs text-white/80">Match</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
                <Users className="w-5 h-5 mx-auto mb-1" />
                <div className="font-bold text-lg">{challenge.interestedCount}</div>
                <div className="text-xs text-white/80">Interessados</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
                <Timer className="w-5 h-5 mx-auto mb-1" />
                <div className="font-bold text-lg">{challenge.estimatedDuration.split('-')[0]}</div>
                <div className="text-xs text-white/80">Minutos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 -mt-4 relative z-10 mb-6">
          <div className="bg-white rounded-2xl p-1 shadow-lg flex">
            {['overview', 'checkpoints', 'client'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                  activeTab === tab
                    ? 'btn-header text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab === 'overview' ? 'Visão Geral' : 
                 tab === 'checkpoints' ? 'Checkpoints' : 'Cliente'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Main Info Card */}
            <div className="glass-card-light rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 btn-header rounded-xl">
                    <challenge.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800 dark:text-white">{challenge.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {challenge.location} • {challenge.distance}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-primary">{challenge.price}</div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    challenge.urgency === 'Urgente' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}>
                    {challenge.urgency}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {showFullDescription ? challenge.fullDescription : challenge.description}
              </p>

              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-orange-primary dark:text-orange-primary font-medium text-sm flex items-center gap-1 hover:opacity-80"
              >
                {showFullDescription ? 'Ver menos' : 'Ver descrição completa'}
                <ChevronRight className={`w-4 h-4 transition-transform ${showFullDescription ? 'rotate-90' : ''}`} />
              </button>

              <div className="flex flex-wrap gap-2 mt-4">
                {challenge.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-100/50 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300 hover:bg-orange-200/50 dark:hover:bg-orange-500/30 border border-white/20 dark:border-white/10 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="glass-card-light rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-primary" />
                Requisitos
              </h3>
              <ul className="space-y-2">
                {challenge.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-orange-primary flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Rewards */}
            <div className="gradient-card-secondary border border-orange-primary/20 dark:border-orange-primary/30 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Medal className="w-5 h-5 text-orange-primary" />
                Recompensas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-card-light rounded-lg p-3 text-center">
                  <DollarSign className="w-5 h-5 text-orange-primary mx-auto mb-1" />
                  <div className="font-bold text-orange-primary">{challenge.rewards.money}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Pagamento</div>
                </div>
                <div className="glass-card-light rounded-lg p-3 text-center">
                  <Award className="w-5 h-5 text-orange-primary mx-auto mb-1" />
                  <div className="font-bold text-orange-primary">{challenge.rewards.points}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Pontos</div>
                </div>
              </div>
              <div className="mt-3 p-3 glass-card-light rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Bônus:</strong> {challenge.rewards.badge} • {challenge.rewards.experience}
                </p>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                Pontos de Atenção
              </h3>
              <ul className="space-y-2">
                {challenge.riskFactors.map((risk, index) => (
                  <li key={index} className="flex items-start gap-3 text-yellow-800 dark:text-yellow-200">
                    <Info className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'checkpoints' && (
          <div className="space-y-6">
            <div className="glass-card-light rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-primary" />
                  Checkpoints da Missão
                </h3>
                <span className="bg-orange-light dark:bg-orange-primary/20 text-orange-primary px-3 py-1 rounded-full text-sm font-medium">
                  {challenge.checkpoints.filter(c => c.required).length} obrigatórios
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Complete todos os checkpoints obrigatórios para finalizar a missão e receber o pagamento.
              </p>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
                <div className="text-center">
                  <div className="font-bold text-gray-800 dark:text-white">{challenge.checkpoints.length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-red-600 dark:text-red-400">{challenge.checkpoints.filter(c => c.required).length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Obrigatórios</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-orange-primary">{challenge.checkpoints.reduce((sum, c) => sum + c.points, 0)}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Pontos</div>
                </div>
              </div>
            </div>

            {challenge.checkpoints.map((checkpoint, index) => (
              <CheckpointCard key={checkpoint.id} checkpoint={checkpoint} index={index} />
            ))}
          </div>
        )}

        {activeTab === 'client' && (
          <div className="space-y-6">
            <div className="glass-card-light rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl">
                    {challenge.client.avatar}
                  </div>
                  {challenge.client.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-primary rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 dark:text-white text-lg">{challenge.client.name}</h3>
                    {challenge.client.verified && (
                      <Shield className="w-5 h-5 text-orange-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-800 dark:text-white">{challenge.client.rating}</span>
                      <span className="text-gray-600 dark:text-gray-400">({challenge.client.reviews} avaliações)</span>
                    </div>
                  </div>
                  <p className="text-orange-primary font-medium text-sm">
                    Responde {challenge.client.responseTime}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">{challenge.client.bio}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                  <Briefcase className="w-5 h-5 text-orange-primary mx-auto mb-1" />
                  <div className="font-semibold text-gray-800 dark:text-white">{challenge.client.completedMissions}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Missões publicadas</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                  <Calendar className="w-5 h-5 text-orange-primary mx-auto mb-1" />
                  <div className="font-semibold text-gray-800 dark:text-white">{challenge.client.memberSince}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Membro desde</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 btn-header text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Conversar
                </button>
                <button className="px-4 btn-header text-white rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Action Buttons - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button 
            onClick={onAccept}
            className="w-full btn-header text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Aceitar Missão
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailsScreen;