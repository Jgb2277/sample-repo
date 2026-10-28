import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useBooking } from '../../store/bookingContext';
import { MOCK_HIGHWAY_ROUTE, MOCK_RESTAURANTS, RestaurantData } from '../../data/mockData';
import { colors, radius, spacing, typography } from '../../theme/tokens';
import { DemoBanner } from '../../components/DemoBanner';
import { DEMO_MODE } from '../../config';

export default function RouteMapTabRoute() {
  const { routeSearch } = useBooking();
  const [selectedStopId, setSelectedStopId] = useState<string>('sample-1');

  const selectedRestaurant: RestaurantData | undefined =
    MOCK_RESTAURANTS.find((r) => r.id === selectedStopId) || MOCK_RESTAURANTS[0];

  const handleOpenRestaurant = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {DEMO_MODE && <DemoBanner />}

      {/* Header Route Info */}
      <View style={styles.routeHeader}>
        <View style={styles.routeSummaryCol}>
          <View style={styles.originDestRow}>
            <View style={styles.originDot} />
            <Text style={styles.originText} numberOfLines={1}>
              {routeSearch.from || MOCK_HIGHWAY_ROUTE.from}
            </Text>
            <Ionicons name="arrow-forward" size={14} color={colors.brandPrimary} />
            <View style={styles.destDot} />
            <Text style={styles.destText} numberOfLines={1}>
              {routeSearch.destination || MOCK_HIGHWAY_ROUTE.destination}
            </Text>
          </View>

          <View style={styles.corridorMetaRow}>
            <Text style={styles.corridorMeta}>
              {MOCK_HIGHWAY_ROUTE.highway} · {routeSearch.distanceKm || 178} km · {routeSearch.estimatedDuration || '4h 15m'}
            </Text>
            <View style={styles.pitstopCountPill}>
              <Text style={styles.pitstopCountText}>{MOCK_HIGHWAY_ROUTE.stops.length} Pitstops</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Visual Route Corridor Map Preview */}
        <View style={styles.mapCanvasCard}>
          <View style={styles.mapCanvasHeader}>
            <View style={styles.mapCanvasHeaderLeft}>
              <Ionicons name="compass" size={16} color={colors.brandPrimary} />
              <Text style={styles.mapCanvasTitle}>Interactive Highway Corridor</Text>
            </View>
            <View style={styles.sampleMapBadge}>
              <Text style={styles.sampleMapBadgeText}>MOCK ROUTE PREVIEW</Text>
            </View>
          </View>

          <Text style={styles.mapInstructions}>
            Tap a highway stop below to preview detour time and available table slots.
          </Text>

          {/* Visual Route Path Line */}
          <View style={styles.corridorPathContainer}>
            {/* Start Node */}
            <View style={styles.pathNodeRow}>
              <View style={styles.pathIndicatorCol}>
                <View style={styles.startCircle}>
                  <Ionicons name="navigate" size={12} color={colors.onBrand} />
                </View>
                <View style={styles.verticalSpine} />
              </View>
              <View style={styles.pathNodeInfo}>
                <Text style={styles.nodeLocation}>
                  {routeSearch.from || MOCK_HIGHWAY_ROUTE.from} (Departure)
                </Text>
                <Text style={styles.nodeKm}>KM 0 · Corridor Start</Text>
              </View>
            </View>

            {/* Restaurant Stops along highway */}
            {MOCK_HIGHWAY_ROUTE.stops.map((stop, index) => {
              const isSelected = selectedStopId === stop.restaurantId;
              const isLast = index === MOCK_HIGHWAY_ROUTE.stops.length - 1;

              return (
                <Pressable
                  key={stop.restaurantId}
                  style={styles.pathNodeRow}
                  onPress={() => setSelectedStopId(stop.restaurantId)}
                  accessibilityRole="button"
                  accessibilityLabel={`Select pitstop ${stop.restaurantName}`}
                >
                  <View style={styles.pathIndicatorCol}>
                    <View
                      style={[
                        styles.stopPinCircle,
                        isSelected && styles.stopPinCircleActive,
                      ]}
                    >
                      <Ionicons
                        name="restaurant"
                        size={12}
                        color={isSelected ? colors.onBrand : colors.brandPrimary}
                      />
                    </View>
                    <View style={styles.verticalSpine} />
                  </View>

                  <View
                    style={[
                      styles.stopNodeCard,
                      isSelected && styles.stopNodeCardActive,
                    ]}
                  >
                    <View style={styles.stopNodeTop}>
                      <Text
                        style={[
                          styles.stopNodeName,
                          isSelected && styles.stopNodeNameActive,
                        ]}
                      >
                        {stop.restaurantName}
                      </Text>
                      <View style={styles.kmBadge}>
                        <Text style={styles.kmBadgeText}>KM {stop.km}</Text>
                      </View>
                    </View>

                    <Text style={styles.stopNodeLocation}>{stop.location}</Text>
                    <View style={styles.stopDetourRow}>
                      <Ionicons name="git-branch" size={12} color="#FCD34D" />
                      <Text style={styles.stopDetourText}>{stop.detour}</Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}

            {/* Destination Node */}
            <View style={styles.pathNodeRow}>
              <View style={styles.pathIndicatorCol}>
                <View style={styles.destCircle}>
                  <Ionicons name="location" size={12} color={colors.onBrand} />
                </View>
              </View>
              <View style={styles.pathNodeInfo}>
                <Text style={styles.nodeLocation}>
                  {routeSearch.destination || MOCK_HIGHWAY_ROUTE.destination} (Destination)
                </Text>
                <Text style={styles.nodeKm}>KM {routeSearch.distanceKm || 178} · Trip Arrival</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Selected Stop Details Preview Drawer */}
        {selectedRestaurant && (
          <View style={styles.selectedStopCard}>
            <View style={styles.drawerHeader}>
              <View style={styles.drawerHeaderLeft}>
                <Ionicons name="pin" size={16} color={colors.brandPrimary} />
                <Text style={styles.drawerTitle}>Selected Pitstop</Text>
              </View>
              <View style={styles.drawerRatingPill}>
                <Ionicons name="star" size={12} color="#FCD34D" />
                <Text style={styles.drawerRatingText}>{selectedRestaurant.rating}</Text>
              </View>
            </View>

            <View style={styles.drawerBodyRow}>
              <Image
                source={{ uri: selectedRestaurant.imageUri }}
                style={styles.drawerImage}
              />
              <View style={styles.drawerInfo}>
                <Text style={styles.drawerName}>{selectedRestaurant.name}</Text>
                <Text style={styles.drawerCuisine}>
                  {selectedRestaurant.cuisine} · {selectedRestaurant.priceRange}
                </Text>
                <Text style={styles.drawerAddress} numberOfLines={2}>
                  {selectedRestaurant.address}
                </Text>

                <View style={styles.drawerDetourPill}>
                  <Ionicons name="git-branch-outline" size={12} color="#FCD34D" />
                  <Text style={styles.drawerDetourText}>
                    {selectedRestaurant.offRouteKm} km off route ({selectedRestaurant.detourMinutes} min)
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Bar */}
            <View style={styles.drawerActionsRow}>
              <View style={styles.drawerSlotPill}>
                <Ionicons name="time-outline" size={13} color={colors.warningText} />
                <Text style={styles.drawerSlotText}>Next: {selectedRestaurant.nextSlot}</Text>
              </View>

              <Pressable
                style={styles.drawerBookBtn}
                onPress={() => handleOpenRestaurant(selectedRestaurant.id)}
                accessibilityRole="button"
                accessibilityLabel={`View and reserve at ${selectedRestaurant.name}`}
              >
                <Text style={styles.drawerBookBtnText}>View & Reserve</Text>
                <Ionicons name="arrow-forward" size={15} color={colors.onBrand} />
              </Pressable>
            </View>
          </View>
        )}

        {/* Future Google Maps Integration Notice */}
        <View style={styles.gmapsNotice}>
          <Ionicons name="map-outline" size={20} color={colors.partnerAccent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.gmapsNoticeTitle}>Google Maps Platform Integration</Text>
            <Text style={styles.gmapsNoticeSubtitle}>
              Phase 2 connects Google Directions API (polylines & live traffic ETA) and Places API (corridor spatial queries). All markers above link to working reservation flows.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  routeHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    backgroundColor: colors.surfaceLow,
  },
  routeSummaryCol: {
    gap: 6,
  },
  originDestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  originDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.brandPrimary,
  },
  originText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.foreground,
  },
  destDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.success,
  },
  destText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.foreground,
  },
  corridorMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  corridorMeta: {
    fontSize: 11,
    fontFamily: typography.fontFamily.regular,
    color: colors.mutedForeground,
  },
  pitstopCountPill: {
    backgroundColor: colors.surfaceMid,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  pitstopCountText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.bold,
    color: colors.brandSecondary,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 40,
    gap: spacing.lg,
  },
  mapCanvasCard: {
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  mapCanvasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  mapCanvasHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mapCanvasTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.foreground,
  },
  sampleMapBadge: {
    backgroundColor: colors.warningBg,
    borderColor: colors.warningBorder,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  sampleMapBadgeText: {
    color: colors.warningText,
    fontSize: 9,
    fontFamily: typography.fontFamily.bold,
  },
  mapInstructions: {
    fontSize: 11,
    fontFamily: typography.fontFamily.regular,
    color: colors.mutedForeground,
    marginBottom: spacing.md,
  },
  corridorPathContainer: {
    paddingLeft: spacing.xs,
  },
  pathNodeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pathIndicatorCol: {
    alignItems: 'center',
    width: 32,
  },
  startCircle: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    backgroundColor: colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destCircle: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopPinCircle: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMid,
    borderWidth: 1.5,
    borderColor: colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopPinCircleActive: {
    backgroundColor: colors.brandPrimary,
    borderColor: colors.brandSecondary,
    transform: [{ scale: 1.15 }],
  },
  verticalSpine: {
    width: 2,
    flex: 1,
    minHeight: 28,
    backgroundColor: colors.borderSubtle,
    marginVertical: 2,
  },
  pathNodeInfo: {
    flex: 1,
    paddingLeft: spacing.sm,
    paddingBottom: spacing.md,
    justifyContent: 'center',
  },
  nodeLocation: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.bold,
    color: colors.foreground,
  },
  nodeKm: {
    fontSize: 10,
    fontFamily: typography.fontFamily.regular,
    color: colors.mutedForeground,
    marginTop: 1,
  },
  stopNodeCard: {
    flex: 1,
    backgroundColor: colors.surfaceMid,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.sm,
    marginLeft: spacing.sm,
    marginBottom: spacing.md,
  },
  stopNodeCardActive: {
    borderColor: colors.brandPrimary,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
  },
  stopNodeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stopNodeName: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.bold,
    color: colors.foreground,
    flex: 1,
  },
  stopNodeNameActive: {
    color: colors.brandPrimary,
  },
  kmBadge: {
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.xs,
  },
  kmBadgeText: {
    fontSize: 9,
    fontFamily: typography.fontFamily.bold,
    color: colors.brandSecondary,
  },
  stopNodeLocation: {
    fontSize: 11,
    fontFamily: typography.fontFamily.regular,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  stopDetourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  stopDetourText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.medium,
    color: '#FCD34D',
  },
  selectedStopCard: {
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.brandPrimary,
    gap: spacing.md,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  drawerTitle: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.bold,
    color: colors.brandPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  drawerRatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(252, 211, 77, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  drawerRatingText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.bold,
    color: '#FCD34D',
  },
  drawerBodyRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  drawerImage: {
    width: 80,
    height: 80,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMid,
  },
  drawerInfo: {
    flex: 1,
  },
  drawerName: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.bold,
    color: colors.foreground,
  },
  drawerCuisine: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.brandSecondary,
    marginTop: 1,
  },
  drawerAddress: {
    fontSize: 10,
    fontFamily: typography.fontFamily.regular,
    color: colors.mutedForeground,
    marginTop: 2,
    lineHeight: 14,
  },
  drawerDetourPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  drawerDetourText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.medium,
    color: '#FCD34D',
  },
  drawerActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xs,
  },
  drawerSlotPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warningBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  drawerSlotText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.bold,
    color: colors.warningText,
  },
  drawerBookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.brandPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  drawerBookBtnText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.bold,
    color: colors.onBrand,
  },
  gmapsNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: 'rgba(123, 208, 255, 0.08)',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(123, 208, 255, 0.25)',
    padding: spacing.md,
  },
  gmapsNoticeTitle: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.bold,
    color: colors.partnerAccent,
  },
  gmapsNoticeSubtitle: {
    fontSize: 11,
    fontFamily: typography.fontFamily.regular,
    color: colors.secondaryForeground,
    lineHeight: 16,
    marginTop: 2,
  },
});
