
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAuth } from '../../hooks/useAuth';

export default function SettingsScreen() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch {
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Usuário conectado</Text>
        <Text style={styles.value}>
          {user?.name ?? 'Usuário'}
        </Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>
          {user?.email ?? 'Não informado'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Alert.alert('Sair da conta', 'Deseja realmente sair?', [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Sair',
              style: 'destructive',
              onPress: () => void handleLogout(),
            },
          ])
        }
      >
        <Text style={styles.buttonText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 5,
  },
  value: {
    fontSize: 17,
    color: '#111827',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#DC2626',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
