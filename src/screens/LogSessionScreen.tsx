import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, radius, spacing, shadows } from '../theme';
import { Card, ProButton, SectionHeader, StationRow } from '../components/ProUI';
import { STATIONS } from '../data/stations';

export default function LogSessionScreen() {
  const navigation = useNavigation();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [times, setTimes] = useState<Record<string, string>>({});

  const toggleStation = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((s) => s !== id);
      }
      return [...prev, id];
    });
  };

  const handleTimeChange = (id: string, value: string) => {
    // Allow only digits and colon
    const filtered = value.replace(/[^0-9:]/g, '');
    // Keep max 5 chars (mm:ss)
    if (filtered.length <= 5) {
      setTimes((prev) => ({ ...prev, [id]: filtered }));
    }
  };

  const selectedStations = STATIONS.filter((s) => selectedIds.includes(s.id));

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Nouvelle session</Text>

        <SectionHeader title="Sélectionne les stations" />

        <View style={styles.grid}>
          {STATIONS.map((station) => {
            const isSelected = selectedIds.includes(station.id);
            return (
              <TouchableOpacity
                key={station.id}
                style={[
                  styles.stationCard,
                  isSelected && styles.stationCardSelected,
                ]}
                onPress={() => toggleStation(station.id)}
                activeOpacity={0.75}
              >
                <Text style={styles.stationCardEmoji}>{station.emoji}</Text>
                <Text style={styles.stationCardName}>{station.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedStations.length > 0 && (
          <>
            <SectionHeader title="Temps par station" />
            {selectedStations.map((station) => (
              <View key={station.id} style={styles.timeRow}>
                <Text style={styles.timeLabel}>
                  {station.emoji} {station.name}
                </Text>
                <TextInput
                  style={styles.timeInput}
                  placeholder="mm:ss"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="number-pad"
                  value={times[station.id] || ''}
                  onChangeText={(val) => handleTimeChange(station.id, val)}
                />
              </View>
            ))}
          </>
        )}

        <View style={styles.saveSection}>
          <ProButton
            title="💾 Sauvegarder la session"
            onPress={handleSave}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 40,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  stationCard: {
    width: '47%',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  stationCardSelected: {
    borderColor: '#FF3B30',
    borderWidth: 2,
  },
  stationCardEmoji: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  stationCardName: {
    ...typography.bodyBold,
    color: colors.text,
    textAlign: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  timeLabel: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  timeInput: {
    backgroundColor: '#222222',
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    width: 80,
    textAlign: 'center',
  },
  saveSection: {
    marginTop: spacing.xxl,
  },
});
