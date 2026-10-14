import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAuth } from '../../hooks/useAuth';
import { Treatment } from '../../types/user';

const TREATMENTS: Treatment[] = ['Sr.', 'Sra.'];

export default function SettingsScreen() {
  const { user, logout, treatment, setTreatment } = useAuth();
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      await logout();
    } catch {
      const message = 'Não foi possível sair da conta.';

      if (Platform.OS === 'web') {
        globalThis.alert(message);
      } else {
        Alert.alert('Erro', message);
      }
    } finally {
      setLoggingOut(false);
    }
  }

  function confirmLogout() {
    const message = 'Deseja realmente sair da conta?';

    if (Platform.OS === 'web') {
      if (globalThis.confirm(message)) {
        void handleLogout();
      }
      return;
    }

    Alert.alert('Sair da conta', message, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => void handleLogout(),
      },
    ]);
  }

  async function handleSelectTreatment(value: Treatment) {
    if (value === treatment || saving) return;

    try {
      setSaving(true);
      await setTreatment(value);

      if (Platform.OS === 'web') {
        globalThis.alert('Tratamento atualizado.');
      } else {
        Alert.alert('Sucesso', 'Tratamento atualizado.');
      }
    } catch {
      const message = 'Não foi possível salvar o tratamento.';

      if (Platform.OS === 'web') {
        globalThis.alert(message);
      } else {
        Alert.alert('Erro', message);
      }
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
          disabled={saving || loggingOut}
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

      {saving && <ActivityIndicator style={styles.loader} />}

      <TouchableOpacity
        style={[
          styles.button,
          loggingOut && styles.buttonDisabled,
        ]}
        onPress={confirmLogout}
        disabled={loggingOut}
        accessibilityRole="button"
        accessibilityLabel="Sair da conta"
        accessibilityHint="Encerra a sessão atual"
      >
        {loggingOut ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Sair da conta</Text>
        )}
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
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
