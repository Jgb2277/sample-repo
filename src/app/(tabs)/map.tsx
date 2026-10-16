import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../../theme/tokens';
import { DemoBanner } from '../../components/DemoBanner';
import { DEMO_MODE } from '../../config';

export default function MapTabRoute() {
  return (
    <SafeAreaView style={styles.container}>
      {DEMO_MODE && <DemoBanner />}
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="map" size={44} color={colors.brandPrimary} />
        </View>

        <Text style={styles.title}>Interactive Route Map</Text>
        <Text style={styles.phaseBadge}>Coming in Phase 2</Text>

        <Text style={styles.description}>
          Google Maps Platform integration with real-time route polyline display, waypoint calculation, and geocoded restaurant discovery along your travel corridor.
        </Text>

        <View style={styles.card}>
          <View style={styles.featureRow}>
            <Ionicons name="navigate-circle-outline" size={20} color={colors.brandSecondary} />
            <Text style={styles.featureText}>Directions API route calculation</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="restaurant-outline" size={20} color={colors.brandSecondary} />
            <Text style={styles.featureText}>Places API nearby corridor discovery</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="time-outline" size={20} color={colors.brandSecondary} />
            <Text style={styles.featureText}>Estimated detour and meal arrival time</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  phaseBadge: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.brandPrimary,
    backgroundColor: 'rgba(255, 107, 53, 0.12)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    gap: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.secondaryForeground,
  },
});
