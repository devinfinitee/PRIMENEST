import { storage } from "./storage";
import { insertContactSchema, insertUserSchema } from "@shared/schema";
import type { Property, Agent, User, Contact } from "@shared/schema";

// Simulate network delay for realistic behavior
const delay = (ms: number = 100) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  properties: {
    getAll: async (filters?: { city?: string; status?: string; propertyType?: string }): Promise<Property[]> => {
      await delay();
      try {
        const properties = await storage.getProperties(filters);
        return properties;
      } catch (error) {
        throw new Error("Failed to fetch properties");
      }
    },

    getById: async (id: string): Promise<Property> => {
      await delay();
      try {
        const property = await storage.getProperty(id);
        if (!property) {
          throw new Error("Property not found");
        }
        return property;
      } catch (error) {
        throw new Error("Failed to fetch property");
      }
    },
  },

  agents: {
    getAll: async (filters?: { specialty?: string }): Promise<Agent[]> => {
      await delay();
      try {
        const agents = await storage.getAgents(filters);
        return agents;
      } catch (error) {
        throw new Error("Failed to fetch agents");
      }
    },

    getById: async (id: string): Promise<Agent> => {
      await delay();
      try {
        const agent = await storage.getAgent(id);
        if (!agent) {
          throw new Error("Agent not found");
        }
        return agent;
      } catch (error) {
        throw new Error("Failed to fetch agent");
      }
    },
  },

  contacts: {
    create: async (data: unknown): Promise<Contact> => {
      await delay();
      try {
        const validatedData = insertContactSchema.parse(data);
        const contact = await storage.createContact(validatedData);
        return contact;
      } catch (error) {
        throw new Error("Invalid contact data");
      }
    },
  },

  auth: {
    signup: async (data: unknown): Promise<Omit<User, 'password'>> => {
      await delay();
      try {
        const validatedData = insertUserSchema.parse(data);
        
        const existingUser = await storage.getUserByEmail(validatedData.email);
        if (existingUser) {
          throw new Error("Email already exists");
        }
        
        const user = await storage.createUser(validatedData);
        
        const { password, ...userWithoutPassword } = user;
        
        // Store current user in session
        sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        return userWithoutPassword;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("Invalid signup data");
      }
    },

    login: async (data: { email: string; password: string }): Promise<Omit<User, 'password'>> => {
      await delay();
      try {
        const { email, password } = data;
        
        const user = await storage.getUserByEmail(email);
        if (!user || user.password !== password) {
          throw new Error("Invalid credentials");
        }
        
        const { password: _, ...userWithoutPassword } = user;
        
        // Store current user in session
        sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        return userWithoutPassword;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("Login failed");
      }
    },

    logout: async (): Promise<void> => {
      await delay(50);
      sessionStorage.removeItem('currentUser');
    },

    getCurrentUser: (): Omit<User, 'password'> | null => {
      try {
        const userJson = sessionStorage.getItem('currentUser');
        if (!userJson) return null;
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    },
  },
};
