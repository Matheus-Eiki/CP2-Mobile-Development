import AsyncStorage from '@react-native-async-storage/async-storage';
import { Treatment, User } from '../types/user';

const SESSION_KEY = '@TaskApp:session';
const TREATMENT_KEY = '@TaskApp:treatment';

function isTreatment(value: string): value is Treatment {
  return value === 'Sr.' || value === 'Sra.' || value === 'Srta.';
}

export async function saveSession(user: User): Promise<void> {
  try {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Erro ao salvar sessão:', error);
    throw error;
  }
}

export async function getSession(): Promise<User | null> {
  try {
    const data = await AsyncStorage.getItem(SESSION_KEY);

    if (!data) return null;

    return JSON.parse(data) as User;
  } catch (error) {
    console.error('Erro ao carregar sessão:', error);
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
    } catch {
      // ignora falha ao limpar sessão inválida
    }
    return null;
  }
}

export async function clearSession(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Erro ao limpar sessão:', error);
    throw error;
  }
}

export async function getTreatment(): Promise<Treatment | null> {
  try {
    const data = await AsyncStorage.getItem(TREATMENT_KEY);

    if (!data || !isTreatment(data)) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao carregar o tratamento:', error);
    return null;
  }
}

export async function saveTreatment(treatment: Treatment): Promise<void> {
  try {
    await AsyncStorage.setItem(TREATMENT_KEY, treatment);
  } catch (error) {
    console.error('Erro ao salvar o tratamento:', error);
    throw error;
  }
}
