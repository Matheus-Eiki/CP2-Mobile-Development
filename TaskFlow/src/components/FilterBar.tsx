import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TaskStatus } from '../types/task';
import { useTheme } from '../hooks/useTheme';

export type TaskFilter = 'Todas' | TaskStatus;

interface FilterBarProps {
  selected: TaskFilter;
  onSelect: (filter: TaskFilter) => void;
}

const filters: TaskFilter[] = ['Todas', 'Pendente', 'Em andamento', 'Concluída'];

export default function FilterBar({ selected, onSelect }: FilterBarProps) {
  const { colors } = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {filters.map(filter => {
        const active = selected === filter;
        return (
          <TouchableOpacity
            key={filter}
           style={[
          styles.option,
          {
            borderColor: active ? colors.primary : colors.border,
            backgroundColor: active
              ? colors.primaryMuted
              : colors.surface,
  },
]}
            onPress={() => onSelect(filter)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`Filtrar por ${filter.toLowerCase()}`}
            accessibilityHint="Mostra apenas as tarefas com este status"
          >
            <Text style={[styles.label, { color: active ? colors.primary : colors.mutedText }]}>{filter}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8, paddingBottom: 16 },
  option: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 9 },
  label: { fontSize: 13, fontWeight: '600' },
});
