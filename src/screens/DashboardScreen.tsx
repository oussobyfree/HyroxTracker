import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { colors, typography, radius, spacing, shadows } from '../theme';
import { Card, ProButton, StatBadge, SectionHeader, StationRow } from '../components/ProUI';
import { STATIONS, OFFICIAL_ORDER, WC_TIME_BY_STATION } from '../data/stations';
import { useAuth } from '../context/AuthContext';

// Helper: format seconds to mm:ss
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Helper: format total seconds to XhYminZs (or XhYmin, etc.)
function formatTotal(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}h${m.toString().padStart(2, '0')}min${s}s`;
  }
  return `${m}min${s}s`;
}

// Hardcoded example sessions
const EXAMPLE_SESSIONS = [
  {
    id: '1',
    date: '2026-05-28',
    stationsCount: 8,
    totalTime: 4350, // 1h12min30s
  },
  {
    id: '2',
    date: '2026-05-21',
    stationsCount: 8,
    totalTime: 4500, // 1h15min
  },
  {
    id: '3',
    date: '2026-05-14',
    stationsCount: 6,
    totalTime: 3880, // 1h04min40s
  },
];

function getTodayDate(): string {
  const d = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return d.toLocaleDateString('fr-FR', options);
}

export default function DashboardScreen({ navigation }: any) {
  const { user } = useAuth();
  const displayName = user?.displayName || 'Invité';

  // Compute total WC estimate
  const totalWcSeconds = OFFICIAL_ORDER.reduce(
    (sum, id) => sum + (WC_TIME_BY_STATION[id] || 0),
    0,
  );
  // Roughly: ~38min run, ~34min stations => ~1h12min
  const estimatedRunSeconds = 2280; // 38min
  const estimatedStationsSeconds = 2040; // 34min
  const estimatedTotalSeconds = totalWcSeconds + estimatedRunSeconds;

  // Stations ordered officially
  const orderedStations = OFFICIAL_ORDER.map((id) =>
    STATIONS.find((s) => s.id === id),
  ).filter(Boolean);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Header ─────────────────────────────── */}
        <View style={styles.header}>
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.greeting}>Salut {displayName}</Text>
              <Text style={styles.fireIcon}>🔥</Text>
            </View>
            <Text style={styles.date}>{getTodayDate()}</Text>
          </View>
        </View>

        {/* ─── Hero Card ──────────────────────────── */}
        <Card gradient>
          <Text style={styles.heroTime}>
            {formatTotal(estimatedTotalSeconds)}
          </Text>
          <Text style={styles.heroCaption}>Meilleure perf estimée</Text>
        </Card>

        {/* ─── Stats Row ──────────────────────────── */}
        <View style={styles.statsRow}>
          <StatBadge
            icon="🏃"
            value="38min"
            label="Course"
            color={colors.accentOrange}
          />
          <StatBadge
            icon="🏋️"
            value="34min"
            label="Stations"
            color={colors.accentGreen}
          />
          <StatBadge
            icon="⏱️"
            value="1h12min"
            label="Total"
            color={colors.accent}
          />
        </View>

        {/* ─── Log Session Button ─────────────────── */}
        <ProButton
          title="Logger une session"
          icon="🏁"
          onPress={() => navigation.navigate('LogSession')}
        />

        {/* ─── Stations Section ───────────────────── */}
        <SectionHeader title="Mes Stations" />
        {orderedStations.map((station: any) => (
          <StationRow
            key={station.id}
            emoji={station.emoji}
            name={station.name}
            time={formatTime(WC_TIME_BY_STATION[station.id] || 0)}
          />
        ))}

        {/* ─── Recent Sessions Section ────────────── */}
        <SectionHeader title="Dernières sessions" />
        <FlatList
          data={EXAMPLE_SESSIONS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Card>
              <View style={styles.sessionRow}>
                <Text style={styles.sessionDate}>{item.date}</Text>
                <View style={styles.sessionMeta}>
                  <Text style={styles.sessionStations}>
                    {item.stationsCount} stations
                  </Text>
                  <Text style={styles.sessionTotal}>
                    {formatTotal(item.totalTime)}
                  </Text>
                </View>
              </View>
            </Card>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxxl + 20,
    paddingBottom: spacing.xxxl,
  },

  // Header
  header: {
    marginBottom: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  greeting: {
    ...typography.h1,
    color: colors.text,
  },
  fireIcon: {
    fontSize: 24,
  },
  date: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textTransform: 'capitalize',
  },

  // Hero card
  heroTime: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1,
  },
  heroCaption: {
    ...typography.captionBold,
    color: colors.text,
    opacity: 0.8,
    marginTop: spacing.xs,
  },

  // Stats row
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  // Session card
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionDate: {
    ...typography.bodyBold,
    color: colors.text,
  },
  sessionMeta: {
    alignItems: 'flex-end',
  },
  sessionStations: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  sessionTotal: {
    ...typography.bodyBold,
    color: colors.accentGreen,
    marginTop: 2,
  },
});
