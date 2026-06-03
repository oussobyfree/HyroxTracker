import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { colors, typography, radius, spacing } from '../theme';
import { Card, ProButton } from '../components/ProUI';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }: any) {
  const { user } = useAuth();

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Tu veux vraiment te déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Se déconnecter',
        style: 'destructive',
        onPress: () => signOut(auth),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile header */}
      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.email?.charAt(0).toUpperCase() || '👤'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.email?.split('@')[0] || 'Athlète'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🔓 Compte gratuit</Text>
        </View>
      </Card>

      {/* Menu */}
      <Text style={styles.sectionTitle}>Paramètres</Text>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuIcon}>🏋️</Text>
        <Text style={styles.menuText}>Catégorie : Open</Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuIcon}>🔔</Text>
        <Text style={styles.menuText}>Notifications</Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuIcon}>❓</Text>
        <Text style={styles.menuText}>Aide & Support</Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      {/* Upgrade */}
      <View style={styles.upgradeCard}>
        <Text style={styles.upgradeEmoji}>👑</Text>
        <Text style={styles.upgradeTitle}>Passe à Premium</Text>
        <Text style={styles.upgradeDesc}>7 jours gratuits, puis 4,99€/mois</Text>
        <ProButton title="🔥 Voir les offres" onPress={() => navigation.navigate('Premium')} />
      </View>

      {/* Logout */}
      <ProButton title="🚪 Se déconnecter" variant="ghost" onPress={handleLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xxl, paddingBottom: 40 },

  profileCard: { alignItems: 'center', paddingVertical: spacing.xxxl },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: { ...typography.h1, color: colors.text },
  name: { ...typography.h3, color: colors.text, marginBottom: 4 },
  email: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.md },
  badge: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  badgeText: { ...typography.captionBold, color: colors.accent },

  sectionTitle: { ...typography.captionBold, color: colors.textSecondary, marginTop: spacing.xxl, marginBottom: spacing.md, textTransform: 'uppercase', letterSpacing: 1 },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  menuIcon: { fontSize: 20, marginRight: spacing.md },
  menuText: { ...typography.body, color: colors.text, flex: 1 },
  chevron: { fontSize: 20, color: colors.textTertiary },

  upgradeCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  upgradeEmoji: { fontSize: 40, marginBottom: spacing.sm },
  upgradeTitle: { ...typography.h3, color: colors.text, marginBottom: 4 },
  upgradeDesc: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.lg },
});
