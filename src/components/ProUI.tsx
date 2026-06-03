import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, radius, spacing, shadows } from '../theme';

// ─── Card ────────────────────────────────────────────
export function Card({ children, style, gradient }: {
  children: ReactNode;
  style?: ViewStyle;
  gradient?: boolean;
}) {
  if (gradient) {
    return (
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, styles.cardGradient, style]}
      >
        {children}
      </LinearGradient>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

// ─── Button ─────────────────────────────────────────────
export function ProButton({ title, onPress, variant = 'primary', icon, disabled }: {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: string;
  disabled?: boolean;
}) {
  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.85}>
        <LinearGradient
          colors={disabled ? [colors.textTertiary, colors.textTertiary] : [colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.button, shadows.button]}
        >
          {icon && <Text style={styles.btnIcon}>{icon}</Text>}
          <Text style={styles.btnText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, variant === 'secondary' ? styles.btnSecondary : styles.btnGhost]}
      activeOpacity={0.7}
    >
      {icon && <Text style={styles.btnIcon}>{icon}</Text>}
      <Text style={[styles.btnText, variant === 'ghost' && styles.btnGhostText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Stat Badge ─────────────────────────────────────
export function StatBadge({ icon, value, label, color }: {
  icon: string;
  value: string;
  label: string;
  color?: string;
}) {
  return (
    <View style={styles.statBadge}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statValue, color && { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Section Header ──────────────────────────────────
export function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && <Text style={styles.sectionAction}>{action}</Text>}
    </View>
  );
}

// ─── Station Row ────────────────────────────────────
export function StationRow({ emoji, name, time, onPress }: {
  emoji: string;
  name: string;
  time?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.stationRow} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.stationEmoji}>{emoji}</Text>
      <View style={styles.stationInfo}>
        <Text style={styles.stationName}>{name}</Text>
      </View>
      {time && <Text style={styles.stationTime}>{time}</Text>}
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

// ─── Input ──────────────────────────────────────────
export function ProInput({ placeholder, value, onChangeText, icon, secureTextEntry, keyboardType, multiline }: {
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  icon?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'email-address' | 'default';
  multiline?: boolean;
}) {
  return (
    <View style={styles.inputGroup}>
      {icon && <Text style={styles.inputIcon}>{icon}</Text>}
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        autoCapitalize="none"
      />
    </View>
  );
}

import { TextInput } from 'react-native';

const styles = StyleSheet.create({
  // Card
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardGradient: {
    borderColor: 'transparent',
  },

  // Button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: radius.md,
    gap: 8,
  },
  btnIcon: { fontSize: 18 },
  btnText: { ...typography.bodyBold, color: colors.text },
  btnSecondary: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  btnGhost: { backgroundColor: 'transparent' },
  btnGhostText: { color: colors.textSecondary },

  // Stat badge
  statBadge: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    flex: 1,
  },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { ...typography.h2, color: colors.text },
  statLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: { ...typography.h3, color: colors.text },
  sectionAction: { ...typography.caption, color: colors.accent },

  // Station row
  stationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  stationEmoji: { fontSize: 24, marginRight: spacing.md },
  stationInfo: { flex: 1 },
  stationName: { ...typography.bodyBold, color: colors.text },
  chevron: { fontSize: 20, color: colors.textTertiary, marginLeft: spacing.sm },

  // Station time
  stationTime: {
    ...typography.captionBold,
    color: colors.accentGreen,
    marginRight: spacing.sm,
  },

  // Input
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    height: 52,
  },
  inputIcon: { fontSize: 18, marginRight: spacing.md },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    height: '100%',
  },
  inputMultiline: { height: 80, paddingTop: 12, textAlignVertical: 'top' },
});
