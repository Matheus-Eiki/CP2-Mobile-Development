import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import Header from '../../components/Header';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { TabParamList } from '../../types/navigation';

type NavigationProps = BottomTabNavigationProp<TabParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { tasks, loading } = useTasks();
  const { colors } = useTheme();

  const counts = useMemo(() => {
    const completed = tasks.filter(
      task => task.status === 'Concluída'
    ).length;

    const pending = tasks.filter(
      task => task.status === 'Pendente'
    ).length;

    const inProgress = tasks.filter(
      task => task.status === 'Em andamento'
    ).length;

    return {
      total: tasks.length,
      completed,
      pending,
      inProgress,
    };
  }, [tasks]);

  if (loading) {
    return (
      <View
        style={[
          styles.center,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Header title="Visão geral" />

      <Text style={[styles.subtitle, { color: colors.mutedText }]}>
        Acompanhe suas tarefas e organize seu dia.
      </Text>

      <View
        style={[
          styles.welcomeCard,
          { backgroundColor: colors.primary },
        ]}
      >
        <Text style={styles.welcomeTitle}>
          Olá! 👋
        </Text>

        <Text style={styles.welcomeDescription}>
          {counts.total === 0
            ? 'Você ainda não tem tarefas. Que tal criar a primeira?'
            : `Você tem ${counts.total} ${
                counts.total === 1 ? 'tarefa cadastrada' : 'tarefas cadastradas'
              }. Continue avançando!`}
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Tasks')}
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonText}>
            Ver minhas tarefas
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Resumo das tarefas
      </Text>

      <View style={styles.statsGrid}>
        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.statLabel, { color: colors.mutedText }]}>
            Total
          </Text>
          <Text style={[styles.statNumber, { color: colors.text }]}>
            {counts.total}
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.statLabel, { color: colors.mutedText }]}>
            Pendentes
          </Text>
          <Text style={[styles.statNumber, { color: colors.warning }]}>
            {counts.pending}
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.statLabel, { color: colors.mutedText }]}>
            Em andamento
          </Text>
          <Text style={[styles.statNumber, { color: colors.primary }]}>
            {counts.inProgress}
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.statLabel, { color: colors.mutedText }]}>
            Concluídas
          </Text>
          <Text style={[styles.statNumber, { color: colors.success }]}>
            {counts.completed}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.tipCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.tipTitle, { color: colors.text }]}>
          💡 Dica do dia
        </Text>

        <Text style={[styles.tipText, { color: colors.mutedText }]}>
          Divida tarefas grandes em etapas menores e priorize o que é mais
          importante para manter sua rotina organizada.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 32,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 22,
  },
  welcomeCard: {
    padding: 22,
    borderRadius: 16,
    marginBottom: 28,
  },
  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeDescription: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 26,
  },
  statCard: {
    width: '48%',
    flexGrow: 1,
    flexBasis: '40%',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
  },
  statLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tipCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 21,
  },
});