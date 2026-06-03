import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, typography, radius, spacing } from '../theme';
import { Card, StatBadge, SectionHeader } from '../components/ProUI';
import { STATIONS, WC_TIME_BY_STATION } from '../data/stations';

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

// Simulated "your time" per station (for UI demo)
const MOCK_USER_TIMES: Record<string, number> = {
  skierg: 260,
  sledpush: 52,
  sledpull: 58,
  burpee: 100,
  rowing: 255,
  farmer: 55,
  sandbag: 76,
  wallball: 130,
};

export default function ProgressScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>📈 Progression</Text>

      {/* Top row badges */}
      <View style={styles.badgeRow}>
        <StatBadge icon="🏆" value="1h10min" label="Meilleur" />
        <StatBadge icon="📊" value="1h14min" label="Moyenne" />
        <StatBadge icon="🚀" value="+3%" label="Progression" color={colors.accentGreen} />
      </View>

      <View style={styles.sectionWrapper}>
        <SectionHeader title="Performance par station" />
      </View>

      {/* Station cards */}
      {STATIONS.map((station) => {
        const goalSeconds = WC_TIME_BY_STATION[station.id] ?? 120;
        const userSeconds = MOCK_USER_TIMES[station.id] ?? goalSeconds;
        const isBetter = userSeconds <= goalSeconds;

        return (
          <Card key={station.id}>
            <View style={styles.stationHeader}>
              <Text style={styles.stationEmoji}>{station.emoji}</Text>
              <Text style={styles.stationName}>{station.name}</Text>
            </View>

            {/* Progress bar */}
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>

            {/* Time comparison */}
            <View style={styles.timeRow}>
              <Text style={styles.yourTime}>
                Ton temps: {formatTime(userSeconds)}
              </Text>
              <Text
                style={[
                  styles.goalTime,
                  { color: isBetter ? colors.accentGreen : colors.accent },
                ]}
              >
                Objectif: {formatTime(goalSeconds)}
              </Text>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  sectionWrapper: {
    marginBottom: spacing.md,
  },

  // Station card internals
  stationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  stationEmoji: {
    fontSize: 22,
    marginRight: spacing.sm,
  },
  stationName: {
    ...typography.h3,
    color: colors.text,
  },

  // Progress bar
  progressTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    width: '60%',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3B30',
  },

  // Time row
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yourTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  goalTime: {
    ...typography.captionBold,
  },
});
