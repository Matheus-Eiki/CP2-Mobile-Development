import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  title: string;
  action?: ReactNode;
}

export default function Header({ title, action }: HeaderProps) {
  const { colors } = useTheme();
  const { user, treatment } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.titles}>
        {user ? (
          <Text style={[styles.greeting, { color: colors.mutedText }]}>
            {treatment} {user.name}
          </Text>
        ) : null}
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  titles: { flex: 1 },
  greeting: { fontSize: 14, marginBottom: 4 },
  title: { fontSize: 26, fontWeight: '700' },
});