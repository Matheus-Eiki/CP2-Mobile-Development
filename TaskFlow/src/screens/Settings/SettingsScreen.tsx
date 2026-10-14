import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAuth } from '../../hooks/useAuth';
import { Treatment } from '../../types/user';

const TREATMENTS: Treatment[] = ['Sr.', 'Sra.', 'Srta.'];

export default function SettingsScreen() {
  const { user, logout, treatment, setTreatment } = useAuth();
  const [saving, setSaving] = useState(false);

  async function handleLogout() {
    try {
      await logout();
    } catch {
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  }

  async function handleSelectTreatment(value: Treatment) {
    if (value === treatment) {
      return;
    }

    try {
      setSaving(true);
      await setTreatment(value);
      Alert.alert('Sucesso', 'Tratamento atualizado.');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o tratamento.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Usuário conectado</Text>
        <Text style={styles.value}>
          {treatment} {user?.name ?? 'Usuário'}
        </Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>
          {user?.email ?? 'Não informado'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Tratamento</Text>
      {TREATMENTS.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            treatment === option && styles.selected,
          ]}
          onPress={() => void handleSelectTreatment(option)}
          disabled={saving}
          accessibilityRole="button"
          accessibilityLabel={`Selecionar tratamento ${option}`}
          accessibilityHint="Salva o tratamento exibido no cabeçalho"
          accessibilityState={{ selected: treatment === option }}
        >
          <Text
            style={[
              styles.optionText,
              treatment === option && styles.selectedText,
            ]}
          >
            {treatment === option ? '● ' : '○ '}
            {option}
          </Text>
        </TouchableOpacity>
      ))}
      {saving ? <ActivityIndicator style={styles.loader} /> : null}

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
        accessibilityRole="button"
        accessibilityLabel="Sair da conta"
        accessibilityHint="Encerra a sessão atual"
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  option: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 8,
  },
  selected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  optionText: {
    color: '#374151',
  },
  selectedText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#DC2626',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
