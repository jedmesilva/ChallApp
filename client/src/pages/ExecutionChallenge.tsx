import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Camera, MapPin, Clock, DollarSign, User, CheckCircle2, 
  Circle, Play, Pause, Square, Upload, MessageCircle, Phone, Star,
  AlertTriangle, Award, Timer, Navigation, Share2, Flag, Eye,
  FileText, Image, Video, Mic, Send, ChevronRight, Zap, Target
} from 'lucide-react';
import { useLocation, useParams } from 'wouter';

const MissionExecutionScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [missionTimer, setMissionTimer] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'client',
      message: 'Oi! Obrigado por aceitar a missão. O evento já começou na Praça da Liberdade.',
      time: '14:23',
      avatar: '👨‍💼'
    }
  ]);

  const mission = {
    id: 1,
    title: 'Fotógrafo de Evento',
    description: 'Grave um vídeo de 2 minutos do show que está acontecendo na Praça da Liberdade agora',
    location: 'Praça da Liberdade',
    price: 'R$ 40,00',
    timeLimit: '2 horas',
    client: {
      name: 'Carlos Santos',
      rating: 4.9,
      avatar: '👨‍💼',
      phone: '+55 31 99999-9999'
    },
    steps: [
      {
        id: 1,
        title: 'Chegar ao local',
        description: 'Vá até a Praça da Liberdade e localize o evento',
        type: 'location',
        required: true,
        estimatedTime: '15 min',
        instructions: [
          'Use o GPS para chegar ao local',
          'Procure por uma aglomeração de pessoas',
          'Identifique o palco ou área principal do evento'
        ],
        verification: 'GPS automático + foto do local'
      },
      {
        id: 2,
        title: 'Confirmar chegada',
        description: 'Tire uma foto do evento para confirmar sua presença',
        type: 'photo',
        required: true,
        estimatedTime: '2 min',
        instructions: [
          'Tire uma foto que mostre o evento acontecendo',
          'Certifique-se de que há pessoas e atividade visível',
          'A foto deve ser clara e bem enquadrada'
        ],
        verification: 'Upload de foto obrigatório'
      },
      {
        id: 3,
        title: 'Gravar vídeo principal',
        description: 'Grave um vídeo de 2 minutos do show em andamento',
        type: 'video',
        required: true,
        estimatedTime: '5 min',
        instructions: [
          'Posicione-se em um local com boa visibilidade',
          'Grave em modo paisagem (horizontal)',
          'Mantenha o celular estável durante a gravação',
          'Capture o áudio ambiente do evento',
          'Vídeo deve ter exatamente 2 minutos'
        ],
        verification: 'Upload de vídeo de 2 minutos'
      },
      {
        id: 4,
        title: 'Fotos adicionais',
        description: 'Tire 3-5 fotos complementares do evento',
        type: 'photos',
        required: false,
        estimatedTime: '3 min',
        instructions: [
          'Capture diferentes ângulos do evento',
          'Inclua fotos do público',
          'Mostre a atmosfera geral do local',
          'Fotos em boa qualidade e bem iluminadas'
        ],
        verification: 'Upload de 3-5 fotos extras'
      },
      {
        id: 5,
        title: 'Enviar material',
        description: 'Faça upload de todo o material capturado',
        type: 'upload',
        required: true,
        estimatedTime: '5 min',
        instructions: [
          'Verifique a qualidade de todos os arquivos',
          'Confirme que o vídeo tem 2 minutos',
          'Adicione uma breve descrição se necessário',
          'Aguarde confirmação do upload'
        ],
        verification: 'Upload completo e verificado'
      }
    ]
  };

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep > 0) {
        setMissionTimer(prev => prev + 1);
      }
      if (isRecording) {
        setRecordingTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStep, isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const completeStep = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
      if (stepId === mission.steps[currentStep].id && currentStep < mission.steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setShowUpload(true);
    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(uploadInterval);
        completeStep(mission.steps[currentStep].id);
      }
    }, 200);
  };

  const currentStepData = mission.steps[currentStep];
  const progressPercentage = (completedSteps.length / mission.steps.length) * 100;

  const StepIcon = ({ step, completed, current }) => {
    const iconClass = `w-6 h-6 ${current ? 'text-white' : completed ? 'text-emerald-600' : 'text-gray-400'}`;
    
    switch (step.type) {
      case 'location': return <Navigation className={iconClass} />;
      case 'photo': return <Camera className={iconClass} />;
      case 'video': return <Video className={iconClass} />;
      case 'photos': return <Image className={iconClass} />;
      case 'upload': return <Upload className={iconClass} />;
      default: return <Circle className={iconClass} />;
    }
  };

  // Chat Modal
  const ChatModal = () => (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${showChat ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowChat(false)} />
      <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl transition-transform duration-300 ${showChat ? 'translate-y-0' : 'translate-y-full'}`} style={{ height: '70vh' }}>
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <button onClick={() => setShowChat(false)} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
              {mission.client.avatar}
            </div>
            <div>
              <h3 className="font-semibold">{mission.client.name}</h3>
              <p className="text-sm text-green-600">Online agora</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto" style={{ height: 'calc(70vh - 140px)' }}>
          {chatMessages.map(msg => (
            <div key={msg.id} className={`flex gap-2 mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'client' && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                  {msg.avatar}
                </div>
              )}
              <div className={`max-w-xs p-3 rounded-2xl ${
                msg.sender === 'user' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Digite uma mensagem..."
              className="flex-1 p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
            />
            <button className="p-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <ChatModal />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 pt-12 text-white">
        <div className="flex items-center gap-4 mb-4">
          <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Missão em Andamento</h1>
            <p className="text-emerald-100 text-sm">{mission.title}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowChat(true)}
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 relative"
            >
              <MessageCircle className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30">
              <Phone className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress and Timer */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-emerald-100 text-sm">Progresso da missão</span>
            <span className="text-white font-semibold">{completedSteps.length}/{mission.steps.length} etapas</span>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              <span className="text-emerald-100">Tempo: {formatTime(missionTimer)}</span>
            </div>
            <span className="text-emerald-100">Limite: {mission.timeLimit}</span>
          </div>
        </div>
      </div>

      {/* Mission Info Card */}
      <div className="px-6 -mt-6 relative z-10 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                {mission.client.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{mission.client.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{mission.client.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-600">{mission.price}</div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                {mission.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Progress */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Etapas da Missão</h2>
        <div className="space-y-4">
          {mission.steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = index === currentStep;
            const isAccessible = index <= currentStep;

            return (
              <div key={step.id} className={`border-2 rounded-2xl p-4 transition-all ${
                isCurrent ? 'border-emerald-500 bg-emerald-50' :
                isCompleted ? 'border-green-500 bg-green-50' :
                isAccessible ? 'border-gray-200 bg-white' :
                'border-gray-100 bg-gray-50 opacity-60'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCurrent ? 'bg-emerald-500' :
                    isCompleted ? 'bg-green-500' :
                    'bg-gray-200'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <StepIcon step={step} completed={isCompleted} current={isCurrent} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${isCurrent ? 'text-emerald-800' : isCompleted ? 'text-green-800' : 'text-gray-800'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${isCurrent ? 'text-emerald-600' : isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                      {step.description}
                    </p>
                  </div>
                  <div className="text-right">
                    {step.required && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full mb-1 block">
                        Obrigatório
                      </span>
                    )}
                    <span className="text-xs text-gray-500">{step.estimatedTime}</span>
                  </div>
                </div>

                {isCurrent && (
                  <div className="mt-4 p-3 bg-white rounded-xl border border-emerald-200">
                    <h4 className="font-medium text-gray-800 mb-2">Instruções:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {step.instructions.map((instruction, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">
                        <strong>Verificação:</strong> {step.verification}
                      </p>
                    </div>
                  </div>
                )}

                {isCompleted && (
                  <div className="mt-3 flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Etapa concluída!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Section */}
      {currentStep < mission.steps.length && (
        <div className="px-6 pb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Ação Atual: {currentStepData.title}
            </h3>

            {currentStepData.type === 'video' && (
              <div className="space-y-4">
                {!isRecording ? (
                  <button 
                    onClick={startRecording}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Play className="w-6 h-6" />
                    Iniciar Gravação de Vídeo
                  </button>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-mono text-red-600 font-bold">
                      {formatTime(recordingTime)}
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <button 
                        className="p-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition-colors"
                      >
                        <Pause className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={stopRecording}
                        className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                      >
                        <Square className="w-6 h-6" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      Gravando... Meta: 2 minutos (120 segundos)
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStepData.type === 'photo' && (
              <button 
                onClick={() => completeStep(currentStepData.id)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Camera className="w-6 h-6" />
                Tirar Foto
              </button>
            )}

            {currentStepData.type === 'location' && (
              <button 
                onClick={() => completeStep(currentStepData.id)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-6 h-6" />
                Confirmar Chegada
              </button>
            )}

            {showUpload && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Enviando...</span>
                </div>
                <div className="bg-blue-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-blue-600 mt-1">{uploadProgress}% concluído</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mission Complete */}
      {completedSteps.length === mission.steps.length && (
        <div className="px-6 pb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Missão Concluída! 🎉</h3>
            <p className="text-green-600 mb-4">
              Parabéns! Você completou todas as etapas da missão com sucesso.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition-colors">
                Receber Pagamento ({mission.price})
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-3 rounded-2xl font-semibold transition-colors">
                Ver Próximas Missões
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionExecutionScreen;