import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../../theme/tokens';
import { DemoBanner } from '../../components/DemoBanner';
import { DEMO_MODE } from '../../config';

export default function BookingsTabRoute() {
  return (
    <SafeAreaView style={styles.container}>
      {DEMO_MODE && <DemoBanner />}
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="calendar-outline" size={44} color={colors.brandPrimary} />
        </View>

        <Text style={styles.title}>Your Reservations</Text>
        <Text style={styles.phaseBadge}>Coming in Phase 3</Text>

        <Text style={styles.description}>
          Table booking management, arrival time synchronisation, pre-ordered meals, and instant confirmation for route pitstops.
        </Text>

        <View style={styles.card}>
          <View style={styles.featureRow}>
            <Ionicons name="bookmark-outline" size={20} color={colors.brandSecondary} />
            <Text style={styles.featureText}>Reserve tables with arrival ETA</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="fast-food-outline" size={20} color={colors.brandSecondary} />
            <Text style={styles.featureText}>Pre-order dishes ready on arrival</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="notifications-outline" size={20} color={colors.brandSecondary} />
            <Text style={styles.featureText}>Real-time restaurant table status updates</Text>
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
