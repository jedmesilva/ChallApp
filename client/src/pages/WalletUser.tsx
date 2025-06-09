import React, { useState } from 'react';
import { 
  ChevronLeft, Wallet, CreditCard, TrendingUp, TrendingDown, 
  Plus, Minus, ArrowUpRight, ArrowDownLeft, Eye, EyeOff,
  Calendar, Filter, Search, Download, MoreVertical,
  Banknote, Smartphone, Building, Gift, Coffee, Car,
  ShoppingBag, Home, Zap, Wifi, Phone, Send, Receipt,
  DollarSign, PiggyBank, Target, Award, Bell, Settings, Clock
} from 'lucide-react';

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [showBalance, setShowBalance] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const walletData = {
    balance: 2847.50,
    income: 1250.00,
    expenses: 680.30,
    savings: 567.20,
    pendingEarnings: 320.00,
    cards: [
      {
        id: 1,
        name: 'Cartão Principal',
        type: 'Débito',
        number: '**** 1234',
        balance: 2847.50,
        color: 'from-emerald-500 to-teal-600',
        isMain: true
      },
      {
        id: 2,
        name: 'Poupança',
        type: 'Conta',
        number: '**** 5678',
        balance: 1250.00,
        color: 'from-blue-500 to-indigo-600',
        isMain: false
      }
    ]
  };

  const transactions = [
    {
      id: 1,
      type: 'income',
      title: 'Missão: Fotografia de Evento',
      description: 'Maria Santos',
      amount: 250.00,
      date: '2024-06-07',
      time: '14:30',
      category: 'photography',
      icon: Receipt,
      status: 'completed'
    },
    {
      id: 2,
      type: 'expense',
      title: 'Almoço',
      description: 'Restaurante do João',
      amount: 45.90,
      date: '2024-06-07',
      time: '12:15',
      category: 'food',
      icon: Coffee,
      status: 'completed'
    },
    {
      id: 3,
      type: 'income',
      title: 'Desenvolvimento Web',
      description: 'João Tech',
      amount: 450.00,
      date: '2024-06-06',
      time: '16:45',
      category: 'technology',
      icon: Receipt,
      status: 'completed'
    },
    {
      id: 4,
      type: 'expense',
      title: 'Uber',
      description: 'Corrida para o centro',
      amount: 18.50,
      date: '2024-06-06',
      time: '09:30',
      category: 'transport',
      icon: Car,
      status: 'completed'
    },
    {
      id: 5,
      type: 'expense',
      title: 'Supermercado',
      description: 'Compras da semana',
      amount: 127.80,
      date: '2024-06-05',
      time: '19:20',
      category: 'shopping',
      icon: ShoppingBag,
      status: 'completed'
    },
    {
      id: 6,
      type: 'income',
      title: 'Aula de Música',
      description: 'Ana Clara',
      amount: 80.00,
      date: '2024-06-05',
      time: '15:00',
      category: 'music',
      icon: Receipt,
      status: 'pending'
    }
  ];

  const quickActions = [
    { id: 1, title: 'Enviar', icon: Send, color: 'from-blue-500 to-blue-600' },
    { id: 2, title: 'Receber', icon: ArrowDownLeft, color: 'from-emerald-500 to-emerald-600' },
    { id: 3, title: 'Pagar', icon: CreditCard, color: 'from-purple-500 to-purple-600' },
    { id: 4, title: 'Recarregar', icon: Plus, color: 'from-orange-500 to-orange-600' }
  ];

  const categories = [
    { name: 'Alimentação', icon: Coffee, amount: 180.50, color: 'bg-orange-500', percentage: 26 },
    { name: 'Transporte', icon: Car, amount: 95.30, color: 'bg-blue-500', percentage: 14 },
    { name: 'Compras', icon: ShoppingBag, amount: 250.80, color: 'bg-purple-500', percentage: 37 },
    { name: 'Casa', icon: Home, amount: 120.00, color: 'bg-green-500', percentage: 18 },
    { name: 'Outros', icon: MoreVertical, amount: 33.70, color: 'bg-gray-500', percentage: 5 }
  ];

  const StatCard = ({ icon: Icon, label, value, subtitle, trend, color = 'text-emerald-600' }) => (
    <div className="bg-card dark:bg-card rounded-2xl p-4 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-secondary rounded-xl`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <span className="text-muted-foreground text-sm font-medium">{label}</span>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
            trend > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
          }`}>
            {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="text-xs font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-card-foreground mb-1">
        R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </div>
      {subtitle && (
        <div className="text-muted-foreground text-sm">{subtitle}</div>
      )}
    </div>
  );

  const TransactionItem = ({ transaction }) => {
    const getCategoryIcon = (category) => {
      const iconMap = {
        photography: Receipt,
        food: Coffee,
        technology: Receipt,
        transport: Car,
        shopping: ShoppingBag,
        music: Receipt
      };
      return iconMap[category] || Receipt;
    };

    const CategoryIcon = getCategoryIcon(transaction.category);

    return (
      <div className="flex items-center gap-4 p-4 bg-card dark:bg-card rounded-2xl shadow-sm border border-border">
        <div className={`p-3 rounded-2xl ${
          transaction.type === 'income' 
            ? 'bg-emerald-100 text-emerald-600' 
            : 'bg-red-100 text-red-600'
        }`}>
          <CategoryIcon className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-card-foreground">{transaction.title}</h4>
            <div className={`font-bold ${
              transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toFixed(2)}
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-1">{transaction.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">
              {new Date(transaction.date).toLocaleDateString('pt-BR')} às {transaction.time}
            </span>
            {transaction.status === 'pending' && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full font-medium">
                Pendente
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CardComponent = ({ card }) => (
    <div className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 text-white relative overflow-hidden shadow-lg`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg">{card.name}</h3>
            <p className="text-white text-opacity-80 text-sm">{card.type}</p>
          </div>
          {card.isMain && (
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <span className="text-white text-xs font-medium">Principal</span>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <div className="text-white text-opacity-80 text-sm mb-1">Saldo disponível</div>
          <div className="text-2xl font-bold">
            R$ {card.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-opacity-80 text-lg font-mono">{card.number}</span>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-white bg-opacity-30 rounded-lg"></div>
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full translate-y-16 -translate-x-16"></div>
        
        <div className="relative z-10 p-6 pt-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button className="p-2 glass-card dark:glass-card-dark rounded-full hover:bg-white/30 dark:hover:bg-black/30 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold">Minha Carteira</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 glass-card dark:glass-card-dark rounded-full hover:bg-white/30 dark:hover:bg-black/30 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 glass-card dark:glass-card-dark rounded-full hover:bg-white/30 dark:hover:bg-black/30 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Balance Overview */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-emerald-100 text-sm">Saldo Total</span>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 glass-card dark:glass-card-dark rounded-full hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
              >
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-4xl font-bold mb-1">
              {showBalance 
                ? `R$ ${walletData.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                : 'R$ ••••••'
              }
            </div>
            <div className="flex items-center justify-center gap-1 text-emerald-100">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+12.5% este mês</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map(action => (
              <button
                key={action.id}
                className="glass-card dark:glass-card-dark rounded-2xl p-4 hover:bg-white/30 dark:hover:bg-black/30 transition-all"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-2 mx-auto shadow-lg`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-xs font-medium">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 -mt-4 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard 
            icon={TrendingUp} 
            label="Receitas" 
            value={walletData.income} 
            subtitle="Este mês"
            trend={8.2}
            color="text-emerald-600"
          />
          <StatCard 
            icon={TrendingDown} 
            label="Gastos" 
            value={walletData.expenses} 
            subtitle="Este mês"
            trend={-3.1}
            color="text-red-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard 
            icon={PiggyBank} 
            label="Poupança" 
            value={walletData.savings} 
            subtitle="Guardado"
            color="text-blue-600"
          />
          <StatCard 
            icon={Clock} 
            label="Pendente" 
            value={walletData.pendingEarnings} 
            subtitle="A receber"
            color="text-orange-600"
          />
        </div>

        {/* Cards Carousel */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Meus Cartões</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {walletData.cards.map(card => (
              <div key={card.id} className="flex-shrink-0 w-80">
                <CardComponent card={card} />
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-card dark:bg-card rounded-2xl p-2 shadow-sm border border-border mb-6">
          {[
            { id: 'transactions', label: 'Transações', icon: Receipt },
            { id: 'analytics', label: 'Análise', icon: TrendingUp },
            { id: 'cards', label: 'Cartões', icon: CreditCard }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                  : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Transações Recentes</h3>
              <button className="p-2 bg-card dark:bg-card rounded-xl shadow-sm border border-border">
                <Filter className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-3">
              {transactions.map(transaction => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Gastos por Categoria</h3>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 bg-card dark:bg-card rounded-xl border border-border text-sm text-foreground"
              >
                <option value="week">Esta semana</option>
                <option value="month">Este mês</option>
                <option value="year">Este ano</option>
              </select>
            </div>
            
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div key={index} className="bg-card dark:bg-card rounded-2xl p-4 shadow-sm border border-border">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`p-3 ${category.color} rounded-2xl shadow-lg`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-800">{category.name}</h4>
                        <span className="text-gray-800 font-bold">
                          R$ {category.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-gray-600 text-sm mb-2">{category.percentage}% do total</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${category.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Meus Cartões</h3>
              <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium shadow-lg">
                Adicionar Cartão
              </button>
            </div>
            
            <div className="space-y-4">
              {walletData.cards.map(card => (
                <CardComponent key={card.id} card={card} />
              ))}
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Adicionar Novo Cartão</h4>
              <p className="text-gray-600 text-sm mb-4">Conecte sua conta bancária ou cartão de crédito</p>
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium shadow-lg">
                Conectar Cartão
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;