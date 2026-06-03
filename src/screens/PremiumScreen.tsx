import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, radius, spacing } from '../theme';
import { ProButton } from '../components/ProUI';

const FEATURES = [
  { emoji: '✅', text: 'Logger illimité — aucune limite de sessions' },
  { emoji: '✅', text: 'Prédiction de course précise' },
  { emoji: '✅', text: 'Analyse de ta station la plus faible' },
  { emoji: '✅', text: 'Plans d\'entraînement personnalisés' },
  { emoji: '✅', text: 'Graphiques de progression détaillés' },
  { emoji: '✅', text: 'Sans publicité' },
];

export default function PremiumScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1.2 }}
        style={[styles.gradient, { paddingTop: insets.top + 60, paddingBottom: 60 }]}
      >
        <Text style={styles.crown}>👑</Text>
        <Text style={styles.title}>HyroxTracker</Text>
        <Text style={styles.subtitle}>Premium</Text>
        <Text style={styles.trial}>7 jours gratuits</Text>
        <Text style={styles.price}>4,99€ / mois</Text>
        <Text style={styles.annual}>ou 39,99€ / an (économise 20€)</Text>
      </LinearGradient>

      <ScrollView style={styles.featuresContainer} contentContainerStyle={styles.featuresContent}>
        {FEATURES.map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <Text style={styles.featureEmoji}>{f.emoji}</Text>
            <Text style={styles.featureText}>{f.text}</Text>
          </View>
        ))}

        <View style={styles.buttons}>
          <ProButton title="🔥 Commencer l'essai gratuit" onPress={() => {}} />
          <ProButton title="En savoir plus" variant="ghost" onPress={() => navigation.goBack()} />
        </View>

        <Text style={styles.terms}>
          Annulation à tout moment. L'abonnement est renouvelé automatiquement sauf annulation
          24h avant la fin de la période d'essai.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  gradient: { alignItems: 'center', paddingHorizontal: spacing.xxl },
  crown: { fontSize: 56, marginBottom: spacing.md },
  title: { ...typography.h1, color: colors.text, marginBottom: 4 },
  subtitle: { ...typography.h3, color: colors.text, opacity: 0.9, marginBottom: spacing.xxl },
  trial: {
    ...typography.captionBold,
    color: colors.accentGreen,
    backgroundColor: 'rgba(48, 209, 88, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radius.full,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  price: { ...typography.price, color: colors.text, marginBottom: 4 },
  annual: { ...typography.caption, color: colors.text, opacity: 0.7, marginBottom: 0 },

  featuresContainer: { flex: 1 },
  featuresContent: { padding: spacing.xxl, paddingBottom: 40 },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  featureEmoji: { fontSize: 18, marginRight: spacing.md },
  featureText: { ...typography.body, color: colors.text, flex: 1 },

  buttons: { marginTop: spacing.xl, gap: spacing.sm },
  terms: {
    ...typography.small,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.xxl,
    lineHeight: 16,
  },
});
