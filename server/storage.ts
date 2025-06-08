import { 
  users, 
  missions, 
  categories, 
  userInteractions,
  type User, 
  type Mission, 
  type Category, 
  type UserInteraction,
  type InsertUser, 
  type InsertMission, 
  type InsertCategory,
  type InsertUserInteraction 
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Missions
  getMissions(filters?: { category?: string; offset?: number; limit?: number }): Promise<Mission[]>;
  getMission(id: number): Promise<Mission | undefined>;
  createMission(mission: InsertMission): Promise<Mission>;
  updateMissionInterestCount(id: number, count: number): Promise<void>;

  // Categories
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;

  // User Interactions
  createUserInteraction(interaction: InsertUserInteraction): Promise<UserInteraction>;
  getUserInteractions(userId: number): Promise<UserInteraction[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private missions: Map<number, Mission>;
  private categories: Map<number, Category>;
  private userInteractions: Map<number, UserInteraction>;
  private currentUserId: number;
  private currentMissionId: number;
  private currentCategoryId: number;
  private currentInteractionId: number;

  constructor() {
    this.users = new Map();
    this.missions = new Map();
    this.categories = new Map();
    this.userInteractions = new Map();
    this.currentUserId = 1;
    this.currentMissionId = 1;
    this.currentCategoryId = 1;
    this.currentInteractionId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Create sample client
    const client: User = {
      id: this.currentUserId++,
      username: "carlos_santos",
      password: "password123",
      name: "Carlos Santos",
      email: "carlos@example.com",
      rating: "4.9",
      reviewCount: 127,
      isVerified: true,
      responseTime: "< 1h",
      profileImage: null,
    };
    this.users.set(client.id, client);

    // Create categories
    const defaultCategories: InsertCategory[] = [
      { name: "Todas", icon: "fas fa-th", color: "#FF6B35" },
      { name: "Fotografia", icon: "fas fa-camera", color: "#FF6B35" },
      { name: "Música", icon: "fas fa-music", color: "#F7931E" },
      { name: "Tecnologia", icon: "fas fa-laptop", color: "#FF8A80" },
      { name: "Serviços", icon: "fas fa-tools", color: "#FFB74D" },
      { name: "Educação", icon: "fas fa-book", color: "#81C784" },
    ];

    defaultCategories.forEach(cat => {
      const category: Category = { id: this.currentCategoryId++, ...cat };
      this.categories.set(category.id, category);
    });

    // Create sample missions
    const sampleMissions: InsertMission[] = [
      {
        title: "Fotógrafo de Evento",
        category: "Fotografia",
        shortDescription: "Grave um vídeo de 2 minutos do show que está acontecendo na Praça da Liberdade agora",
        fullDescription: "Estou organizando um evento na Praça da Liberdade e preciso de um profissional para gravar momentos importantes. O evento começou há pouco e precisamos de cobertura por aproximadamente 2 horas. Material próprio é um diferencial, mas temos equipamento disponível se necessário.",
        location: "Praça da Liberdade",
        distance: "1.2 km de distância",
        payment: "40.00",
        duration: "Próximas 2 horas",
        urgency: "Urgente",
        difficulty: "Fácil",
        tags: ["Evento", "Vídeo", "Ao vivo"],
        requirements: ["Experiência com eventos", "Disponibilidade imediata", "Portfolio de vídeos"],
        deliverables: ["Vídeo editado de 2 minutos", "Material bruto", "Entrega em 24h"],
        advantages: ["Pagamento rápido", "Cliente frequente", "Avaliação garantida"],
        clientId: client.id,
        interestedCount: 127,
        matchPercentage: 95,
        isActive: true,
      },
      {
        title: "Produção Musical",
        category: "Música",
        shortDescription: "Preciso de um produtor para finalizar uma faixa de rap. Estúdio disponível no centro da cidade.",
        fullDescription: "Tenho uma faixa de rap 90% pronta e preciso de um produtor experiente para finalizar a mixagem e masterização. O estúdio está equipado com tudo que precisa, só falta a expertise técnica.",
        location: "Centro - BH",
        distance: "2.5 km de distância",
        payment: "120.00",
        duration: "4 horas",
        urgency: "Normal",
        difficulty: "Intermediário",
        tags: ["Rap", "Mixagem", "Estúdio"],
        requirements: ["Experiência em rap/hip-hop", "Conhecimento em Pro Tools", "Portfolio comprovado"],
        deliverables: ["Faixa masterizada", "Stems separados", "Versão instrumental"],
        advantages: ["Estúdio profissional", "Projeto em andamento", "Possibilidade de parceria"],
        clientId: client.id,
        interestedCount: 89,
        matchPercentage: 87,
        isActive: true,
      },
      {
        title: "Desenvolvimento de App",
        category: "Tecnologia",
        shortDescription: "Preciso desenvolver um app simples para delivery de comida. Interface já definida, falta só o desenvolvimento.",
        fullDescription: "Tenho um projeto de app de delivery bem definido, com wireframes e design prontos. Preciso de um desenvolvedor React Native para implementar as funcionalidades básicas: login, catálogo, carrinho e pagamento.",
        location: "Savassi",
        distance: "3.1 km de distância",
        payment: "800.00",
        duration: "2 semanas",
        urgency: "Normal",
        difficulty: "Avançado",
        tags: ["React Native", "Mobile", "Delivery"],
        requirements: ["Experiência React Native", "Portfolio mobile", "Disponibilidade período integral"],
        deliverables: ["App funcional", "Código fonte", "Documentação básica"],
        advantages: ["Projeto bem definido", "Pagamento por etapas", "Possível contrato fixo"],
        clientId: client.id,
        interestedCount: 156,
        matchPercentage: 92,
        isActive: true,
      },
      {
        title: "Aulas de Violão",
        category: "Educação",
        shortDescription: "Procuro professor de violão para aulas particulares. Iniciante absoluto, preciso aprender do zero.",
        fullDescription: "Sempre quis aprender violão mas nunca tive oportunidade. Tenho um violão em casa e preciso de um professor paciente para me ensinar desde o básico: como segurar, primeiros acordes, etc.",
        location: "Funcionários",
        distance: "1.8 km de distância",
        payment: "60.00",
        duration: "1 hora/semana",
        urgency: "Baixa",
        difficulty: "Fácil",
        tags: ["Violão", "Iniciante", "Particular"],
        requirements: ["Paciência com iniciantes", "Método didático", "Flexibilidade de horários"],
        deliverables: ["Aulas semanais", "Material didático", "Acompanhamento progresso"],
        advantages: ["Horários flexíveis", "Pagamento pontual", "Ambiente familiar"],
        clientId: client.id,
        interestedCount: 43,
        matchPercentage: 78,
        isActive: true,
      },
      {
        title: "Limpeza Pós-Reforma",
        category: "Serviços",
        shortDescription: "Apartamento passou por reforma e precisa de limpeza pesada. Muito pó e restos de material de construção.",
        fullDescription: "Apartamento de 2 quartos passou por uma reforma completa. Preciso de serviço de limpeza pesada para remover todo o pó, restos de tinta, cimento e deixar tudo pronto para morar. Materiais de limpeza por nossa conta.",
        location: "Pampulha",
        distance: "8.2 km de distância",
        payment: "200.00",
        duration: "6 horas",
        urgency: "Alta",
        difficulty: "Pesado",
        tags: ["Limpeza", "Pós-obra", "Pesada"],
        requirements: ["Experiência pós-reforma", "Equipamentos próprios", "Disponibilidade fim de semana"],
        deliverables: ["Apartamento limpo", "Remoção entulho leve", "Limpeza detalhada"],
        advantages: ["Materiais fornecidos", "Pagamento em dinheiro", "Indicação garantida"],
        clientId: client.id,
        interestedCount: 67,
        matchPercentage: 84,
        isActive: true,
      }
    ];

    sampleMissions.forEach(mission => {
      const newMission: Mission = { 
        id: this.currentMissionId++, 
        ...mission,
        createdAt: new Date()
      };
      this.missions.set(newMission.id, newMission);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      rating: "0.00",
      reviewCount: 0,
      isVerified: false,
      responseTime: "< 1h",
    };
    this.users.set(id, user);
    return user;
  }

  async getMissions(filters?: { category?: string; offset?: number; limit?: number }): Promise<Mission[]> {
    let missions = Array.from(this.missions.values()).filter(m => m.isActive);
    
    if (filters?.category && filters.category !== "Todas") {
      missions = missions.filter(m => m.category === filters.category);
    }

    // Sort by match percentage and interested count
    missions.sort((a, b) => (b.matchPercentage + b.interestedCount/10) - (a.matchPercentage + a.interestedCount/10));

    const offset = filters?.offset || 0;
    const limit = filters?.limit || 20;
    
    return missions.slice(offset, offset + limit);
  }

  async getMission(id: number): Promise<Mission | undefined> {
    return this.missions.get(id);
  }

  async createMission(insertMission: InsertMission): Promise<Mission> {
    const id = this.currentMissionId++;
    const mission: Mission = { 
      ...insertMission, 
      id,
      interestedCount: 0,
      matchPercentage: Math.floor(Math.random() * 20) + 75, // 75-95%
      isActive: true,
      createdAt: new Date()
    };
    this.missions.set(id, mission);
    return mission;
  }

  async updateMissionInterestCount(id: number, count: number): Promise<void> {
    const mission = this.missions.get(id);
    if (mission) {
      mission.interestedCount = count;
      this.missions.set(id, mission);
    }
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async createUserInteraction(insertInteraction: InsertUserInteraction): Promise<UserInteraction> {
    const id = this.currentInteractionId++;
    const interaction: UserInteraction = { 
      ...insertInteraction, 
      id,
      createdAt: new Date()
    };
    this.userInteractions.set(id, interaction);
    return interaction;
  }

  async getUserInteractions(userId: number): Promise<UserInteraction[]> {
    return Array.from(this.userInteractions.values()).filter(i => i.userId === userId);
  }
}

export const storage = new MemStorage();
