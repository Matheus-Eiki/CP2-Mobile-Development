
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

const SESSION_KEY = '@TaskApp:session';

export async function saveSession(user: User): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export async function getSession(): Promise<User | null> {
  const data = await AsyncStorage.getItem(SESSION_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data) as User;
  } catch {
    await AsyncStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}
