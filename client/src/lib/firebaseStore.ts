import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// Property data interface
export interface PropertyData {
  id?: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: 'For Sale' | 'For Rent';
  featured: boolean;
  images: string[];
  agentId: string;
  createdAt?: string;
  updatedAt?: string;
}

// Booking/Tour data interface
export interface BookingData {
  id?: string;
  propertyId: string;
  userId: string;
  agentId: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

// Favorite property data
export interface FavoriteData {
  userId: string;
  propertyId: string;
  createdAt?: string;
}

// Save property to Firestore
export const saveProperty = async (propertyData: PropertyData): Promise<string> => {
  try {
    const propertyRef = doc(collection(db, 'properties'));
    const data = {
      ...propertyData,
      id: propertyRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await setDoc(propertyRef, data);
    return propertyRef.id;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to save property');
  }
};

// Get property by ID
export const getProperty = async (propertyId: string): Promise<PropertyData | null> => {
  try {
    const propertyDoc = await getDoc(doc(db, 'properties', propertyId));
    if (propertyDoc.exists()) {
      return propertyDoc.data() as PropertyData;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get property');
  }
};

// Get all properties
export const getAllProperties = async (): Promise<PropertyData[]> => {
  try {
    const propertiesSnapshot = await getDocs(collection(db, 'properties'));
    return propertiesSnapshot.docs.map(doc => doc.data() as PropertyData);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get properties');
  }
};

// Create booking/tour
export const createBooking = async (bookingData: BookingData): Promise<string> => {
  try {
    const bookingRef = doc(collection(db, 'bookings'));
    const data = {
      ...bookingData,
      id: bookingRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await setDoc(bookingRef, data);
    return bookingRef.id;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create booking');
  }
};

// Get user bookings
export const getUserBookings = async (userId: string): Promise<BookingData[]> => {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const bookingsSnapshot = await getDocs(q);
    return bookingsSnapshot.docs.map(doc => doc.data() as BookingData);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get bookings');
  }
};

// Add property to favorites
export const addToFavorites = async (userId: string, propertyId: string): Promise<void> => {
  try {
    const favoriteRef = doc(db, 'favorites', `${userId}_${propertyId}`);
    await setDoc(favoriteRef, {
      userId,
      propertyId,
      createdAt: new Date().toISOString(),
    });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add to favorites');
  }
};

// Remove property from favorites
export const removeFromFavorites = async (userId: string, propertyId: string): Promise<void> => {
  try {
    const favoriteRef = doc(db, 'favorites', `${userId}_${propertyId}`);
    await deleteDoc(favoriteRef);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to remove from favorites');
  }
};

// Get user favorites
export const getUserFavorites = async (userId: string): Promise<string[]> => {
  try {
    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', userId)
    );
    const favoritesSnapshot = await getDocs(q);
    return favoritesSnapshot.docs.map(doc => doc.data().propertyId);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get favorites');
  }
};

// Save chat message
export interface ChatMessage {
  id?: string;
  userId: string;
  agentId: string;
  message: string;
  sender: 'user' | 'agent' | 'ai';
  createdAt?: string;
}

export const saveChatMessage = async (chatData: ChatMessage): Promise<string> => {
  try {
    const chatRef = doc(collection(db, 'chats'));
    const data = {
      ...chatData,
      id: chatRef.id,
      createdAt: new Date().toISOString(),
    };
    await setDoc(chatRef, data);
    return chatRef.id;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to save chat message');
  }
};

// Get chat messages
export const getChatMessages = async (userId: string, agentId: string): Promise<ChatMessage[]> => {
  try {
    const q = query(
      collection(db, 'chats'),
      where('userId', '==', userId),
      where('agentId', '==', agentId),
      orderBy('createdAt', 'asc')
    );
    const chatsSnapshot = await getDocs(q);
    return chatsSnapshot.docs.map(doc => doc.data() as ChatMessage);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get chat messages');
  }
};
