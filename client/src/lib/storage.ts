import { type User, type InsertUser, type Property, type InsertProperty, type Agent, type InsertAgent, type Contact, type InsertContact } from "@shared/schema";

const property1 = '/attached_assets/generated_images/Luxury_beachfront_villa_exterior_cdc3f925.png';
const property2 = '/attached_assets/generated_images/Contemporary_family_villa_4a2973ee.png';
const property3 = '/attached_assets/generated_images/Modern_luxury_condo_building_93c29a0b.png';
const property4 = '/attached_assets/Gemini_Generated_Image_3nuhuu3nuhuu3nuh_1761814379060.png';
const property5 = '/attached_assets/Gemini_Generated_Image_87vmqq87vmqq87vm_1761814379063.png';
const property6 = '/attached_assets/Gemini_Generated_Image_jl0zgjl0zgjl0zgj_1761814379061.png';
const agent1 = '/attached_assets/generated_images/Female_real_estate_agent_e99fbd8d.png';
const agent2 = '/attached_assets/generated_images/Male_real_estate_agent_8f0aa81f.png';
const agent3 = '/attached_assets/Gemini_Generated_Image_v86rw7v86rw7v86r_1761814379062.png';
const agent4 = '/attached_assets/Gemini_Generated_Image_yepqyyepqyyepqyy_1761814379064.png';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProperties(filters?: { city?: string; status?: string; propertyType?: string }): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  getAgents(filters?: { specialty?: string }): Promise<Agent[]>;
  getAgent(id: string): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class FrontendStorage implements IStorage {
  private users: Map<string, User>;
  private properties: Map<string, Property>;
  private agents: Map<string, Agent>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.agents = new Map();
    this.contacts = new Map();
    
    this.loadFromLocalStorage();
    this.seedData();
  }

  private loadFromLocalStorage() {
    try {
      const usersData = localStorage.getItem('primenest_users');
      const propertiesData = localStorage.getItem('primenest_properties');
      const agentsData = localStorage.getItem('primenest_agents');
      const contactsData = localStorage.getItem('primenest_contacts');

      if (usersData) {
        const users = JSON.parse(usersData);
        users.forEach((user: User) => {
          user.createdAt = new Date(user.createdAt);
          this.users.set(user.id, user);
        });
      }

      if (propertiesData) {
        const properties = JSON.parse(propertiesData);
        properties.forEach((property: Property) => {
          property.createdAt = new Date(property.createdAt);
          this.properties.set(property.id, property);
        });
      }

      if (agentsData) {
        const agents = JSON.parse(agentsData);
        agents.forEach((agent: Agent) => {
          agent.createdAt = new Date(agent.createdAt);
          this.agents.set(agent.id, agent);
        });
      }

      if (contactsData) {
        const contacts = JSON.parse(contactsData);
        contacts.forEach((contact: Contact) => {
          contact.createdAt = new Date(contact.createdAt);
          this.contacts.set(contact.id, contact);
        });
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem('primenest_users', JSON.stringify(Array.from(this.users.values())));
      localStorage.setItem('primenest_properties', JSON.stringify(Array.from(this.properties.values())));
      localStorage.setItem('primenest_agents', JSON.stringify(Array.from(this.agents.values())));
      localStorage.setItem('primenest_contacts', JSON.stringify(Array.from(this.contacts.values())));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private seedData() {
    // Only seed if no data exists
    if (this.agents.size > 0 || this.properties.size > 0) {
      return;
    }

    const agent1Id = generateUUID();
    const agent2Id = generateUUID();
    
    const mockAgents: Agent[] = [
      {
        id: agent1Id,
        name: "Jane Doe",
        title: "PrimeNest Agent",
        email: "jane.doe@primenest.com",
        phone: "+1 (555) 123-4567",
        photo: agent1,
        activeListings: 15,
        experience: "5 Years",
        specialty: "Residential",
        createdAt: new Date(),
      },
      {
        id: agent2Id,
        name: "Michael Chen",
        title: "Senior Agent",
        email: "michael.chen@primenest.com",
        phone: "+1 (555) 234-5678",
        photo: agent2,
        activeListings: 22,
        experience: "8 Years",
        specialty: "Luxury",
        createdAt: new Date(),
      },
      {
        id: generateUUID(),
        name: "David Smith",
        title: "PrimeNest Agent",
        email: "david.smith@primenest.com",
        phone: "+1 (555) 345-6789",
        photo: agent3,
        activeListings: 18,
        experience: "6 Years",
        specialty: "Commercial",
        createdAt: new Date(),
      },
      {
        id: generateUUID(),
        name: "Sophia Rodriguez",
        title: "Senior Agent",
        email: "sophia.rodriguez@primenest.com",
        phone: "+1 (555) 456-7890",
        photo: agent4,
        activeListings: 25,
        experience: "10 Years",
        specialty: "Residential",
        createdAt: new Date(),
      },
    ];
    
    mockAgents.forEach(agent => this.agents.set(agent.id, agent));
    
    const mockProperties: Property[] = [
      {
        id: generateUUID(),
        title: "Luxury Beachfront Villa",
        description: "Experience luxury beachfront living in this stunning villa. This meticulously designed home features breathtaking ocean views, modern amenities, and spacious living areas perfect for entertaining. The open-concept layout seamlessly blends indoor and outdoor spaces, offering a true coastal lifestyle. High-end finishes throughout, including marble countertops, hardwood floors, and designer fixtures.",
        price: "1800000",
        location: "Miami, FL",
        city: "Miami",
        bedrooms: 4,
        bathrooms: "3.5",
        area: 2800,
        status: "For Sale",
        propertyType: "Villa",
        featured: true,
        images: [property1, property2, property3, property1],
        agentId: agent1Id,
        createdAt: new Date(),
      },
      {
        id: generateUUID(),
        title: "Modern Family Home",
        description: "Beautiful contemporary home perfect for families. Features include an open floor plan, gourmet kitchen with stainless steel appliances, spacious master suite with walk-in closet, and a large backyard ideal for entertaining. Located in a quiet neighborhood with excellent schools nearby.",
        price: "850000",
        location: "Austin, TX",
        city: "Austin",
        bedrooms: 3,
        bathrooms: "2",
        area: 2200,
        status: "For Sale",
        propertyType: "House",
        featured: false,
        images: [property2, property1, property3],
        agentId: agent2Id,
        createdAt: new Date(),
      },
      {
        id: generateUUID(),
        title: "Downtown Luxury Condo",
        description: "Stunning luxury condo in the heart of downtown. Floor-to-ceiling windows offer panoramic city views. Modern kitchen with high-end appliances, spa-like bathrooms, and premium finishes throughout. Building amenities include 24/7 concierge, fitness center, and rooftop terrace.",
        price: "650000",
        location: "New York, NY",
        city: "New York",
        bedrooms: 2,
        bathrooms: "2",
        area: 1500,
        status: "For Rent",
        propertyType: "Condo",
        featured: true,
        images: [property3, property2, property1],
        agentId: agent1Id,
        createdAt: new Date(),
      },
      {
        id: generateUUID(),
        title: "Coastal Estate",
        description: "Magnificent coastal estate with private beach access. This architectural masterpiece features soaring ceilings, walls of glass, and seamless indoor-outdoor living. Chef's kitchen, wine cellar, home theater, and infinity pool overlooking the ocean.",
        price: "2100000",
        location: "Malibu, CA",
        city: "Malibu",
        bedrooms: 5,
        bathrooms: "4",
        area: 3500,
        status: "For Sale",
        propertyType: "House",
        featured: true,
        images: [property4, property1, property3, property2],
        agentId: agent2Id,
        createdAt: new Date(),
      },
      {
        id: generateUUID(),
        title: "Urban Apartment",
        description: "Charming urban apartment in vibrant neighborhood. Recently renovated with modern finishes, open kitchen, in-unit washer/dryer, and private balcony. Walking distance to restaurants, shops, and public transportation.",
        price: "495000",
        location: "Chicago, IL",
        city: "Chicago",
        bedrooms: 2,
        bathrooms: "1",
        area: 1200,
        status: "For Rent",
        propertyType: "Apartment",
        featured: false,
        images: [property5, property2, property3, property1],
        agentId: agent1Id,
        createdAt: new Date(),
      },
      {
        id: generateUUID(),
        title: "Suburban House",
        description: "Spacious family home in desirable suburban location. Updated kitchen and bathrooms, hardwood floors, finished basement, and beautifully landscaped yard. Close to top-rated schools, parks, and shopping centers.",
        price: "720000",
        location: "Seattle, WA",
        city: "Seattle",
        bedrooms: 4,
        bathrooms: "2.5",
        area: 2400,
        status: "For Sale",
        propertyType: "House",
        featured: false,
        images: [property6, property3, property1, property2],
        agentId: agent2Id,
        createdAt: new Date(),
      },
    ];
    
    mockProperties.forEach(property => this.properties.set(property.id, property));
    this.saveToLocalStorage();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = generateUUID();
    const user: User = { 
      ...insertUser,
      phone: insertUser.phone ?? null,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    this.saveToLocalStorage();
    return user;
  }

  async getProperties(filters?: { city?: string; status?: string; propertyType?: string }): Promise<Property[]> {
    let properties = Array.from(this.properties.values());
    
    if (filters?.city) {
      properties = properties.filter(p => p.city.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters?.status) {
      properties = properties.filter(p => p.status === filters.status);
    }
    if (filters?.propertyType) {
      properties = properties.filter(p => p.propertyType === filters.propertyType);
    }
    
    return properties.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = generateUUID();
    const property: Property = { 
      ...insertProperty,
      featured: insertProperty.featured ?? false,
      id,
      createdAt: new Date(),
    };
    this.properties.set(id, property);
    this.saveToLocalStorage();
    return property;
  }

  async getAgents(filters?: { specialty?: string }): Promise<Agent[]> {
    let agents = Array.from(this.agents.values());
    
    if (filters?.specialty) {
      agents = agents.filter(a => a.specialty === filters.specialty);
    }
    
    return agents.sort((a, b) => b.activeListings - a.activeListings);
  }

  async getAgent(id: string): Promise<Agent | undefined> {
    return this.agents.get(id);
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const id = generateUUID();
    const agent: Agent = { 
      ...insertAgent,
      specialty: insertAgent.specialty ?? null,
      activeListings: insertAgent.activeListings ?? 0,
      id,
      createdAt: new Date(),
    };
    this.agents.set(id, agent);
    this.saveToLocalStorage();
    return agent;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = generateUUID();
    const contact: Contact = { 
      ...insertContact,
      phone: insertContact.phone ?? null,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    this.saveToLocalStorage();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new FrontendStorage();
