import React, { useState } from 'react';
import { 
  Menu, X, User, Settings, Heart, MapPin, Star, Award, 
  HelpCircle, Bell, Wallet, TrendingUp, Calendar, 
  Camera, Music, Code, Wrench, Book, LogOut, ChevronRight, 
  CheckCircle2, Crown, Target
} from 'lucide-react';

const SidebarMenu = ({ isOpen, setIsOpen }) => {
  const [activeSection, setActiveSection] = useState('missions');

  const userStats = {
    name: 'João Silva',
    avatar: '👨‍💻',
    rating: 4.8,
    reviews: 127,
    level: 'Expert',
    missionsCompleted: 89,
    earnings: 'R$ 2.450',
    verified: true
  };

  const menuSections = [
    {
      id: 'missions',
      title: 'Missões',
      items: [
        { icon: Heart, label: 'Minhas Missões', count: 5, color: 'text-emerald-600' },
        { icon: Target, label: 'Descobrir', color: 'text-purple-600' },
        { icon: MapPin, label: 'Próximas a Mim', color: 'text-blue-600' },
        { icon: Calendar, label: 'Agendadas', count: 2, color: 'text-orange-600' }
      ]
    },
    {
      id: 'categories',
      title: 'Categorias',
      items: [
        { icon: Camera, label: 'Fotografia', color: 'text-emerald-600' },
        { icon: Music, label: 'Música', color: 'text-purple-600' },
        { icon: Code, label: 'Tecnologia', color: 'text-blue-600' },
        { icon: Wrench, label: 'Serviços', color: 'text-orange-600' },
        { icon: Book, label: 'Educação', color: 'text-indigo-600' }
      ]
    },
    {
      id: 'profile',
      title: 'Perfil',
      items: [
        { icon: User, label: 'Meu Perfil', color: 'text-gray-600' },
        { icon: Star, label: 'Avaliações', color: 'text-yellow-600' },
        { icon: Award, label: 'Conquistas', color: 'text-emerald-600', special: true },
        { icon: TrendingUp, label: 'Estatísticas', color: 'text-blue-600' }
      ]
    },
    {
      id: 'account',
      title: 'Conta',
      items: [
        { icon: Wallet, label: 'Carteira', color: 'text-green-600' },
        { icon: Bell, label: 'Notificações', color: 'text-gray-600' },
        { icon: Settings, label: 'Configurações', color: 'text-gray-600' },
        { icon: HelpCircle, label: 'Ajuda', color: 'text-gray-600' }
      ]
    }
  ];

  const MenuItem = ({ item, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group relative ${
        isActive 
          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200' 
          : 'hover:bg-gray-50 hover:scale-105 transform'
      }`}
    >
      <div className={`p-2 rounded-xl transition-all duration-200 ${
        isActive 
          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg' 
          : 'bg-gray-100 group-hover:bg-gray-200'
      }`}>
        <item.icon className={`w-5 h-5 ${
          isActive ? 'text-white' : item.color
        }`} />
      </div>
      
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${
            isActive ? 'text-emerald-700' : 'text-gray-800'
          }`}>
            {item.label}
          </span>
          {item.special && (
            <Crown className="w-4 h-4 text-yellow-500" />
          )}
        </div>
        {item.count && (
          <span className="text-xs text-gray-500">
            {item.count} ativas
          </span>
        )}
      </div>

      {item.count && (
        <div className={`px-2 py-1 rounded-full text-xs font-bold ${
          isActive 
            ? 'bg-emerald-600 text-white' 
            : 'bg-gray-200 text-gray-600'
        }`}>
          {item.count}
        </div>
      )}

      <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
        isActive ? 'text-emerald-600 rotate-90' : 'text-gray-400 group-hover:translate-x-1'
      }`} />
    </button>
  );

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Header with User Info */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 pt-12 text-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile Card */}
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-xl">
                    {userStats.avatar}
                  </div>
                  {userStats.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{userStats.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-100 text-sm">{userStats.level}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-emerald-100 text-sm">{userStats.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white bg-opacity-20 rounded-xl p-2">
                  <div className="text-white text-lg font-bold">{userStats.missionsCompleted}</div>
                  <div className="text-emerald-100 text-xs">Missões</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-2">
                  <div className="text-white text-lg font-bold">{userStats.earnings}</div>
                  <div className="text-emerald-100 text-xs">Ganhos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto p-6 -mt-4 relative z-10">
          <div className="space-y-6">
            {menuSections.map((section) => (
              <div key={section.id}>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, index) => (
                    <MenuItem
                      key={index}
                      item={item}
                      isActive={activeSection === section.id && index === 0}
                      onClick={() => setActiveSection(section.id)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Premium Banner */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-4 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-20 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-yellow-300" />
                  <span className="font-bold">Premium</span>
                </div>
                <p className="text-purple-100 text-sm mb-3">
                  Desbloqueie missões exclusivas e ganhe mais!
                </p>
                <button className="bg-white text-purple-600 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-purple-50 transition-colors">
                  Assinar Agora
                </button>
              </div>
            </div>

            {/* Logout */}
            <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-600 hover:bg-red-50 transition-all duration-200 group">
              <div className="p-2 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-semibold">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;