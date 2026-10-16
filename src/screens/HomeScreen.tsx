import { useState } from 'react'
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { DineGoLogo } from '../components/DineGoLogo'
import { PrimaryButton } from '../components/PrimaryButton'
import { TextField } from '../components/TextField'
import { DEMO_MODE } from '../config'
import { AuthUser } from '../services/authService'
import { RestaurantResult, searchAlongRoute } from '../services/restaurantService'
import { colors, radius } from '../theme'

export function HomeScreen({ user, onSignOut }: { user: AuthUser; onSignOut: () => void }) {
  const [from, setFrom] = useState('')
  const [destination, setDestination] = useState('')
  const [errors, setErrors] = useState({ from: '', destination: '' })
  const [searchError, setSearchError] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<RestaurantResult[] | null>(null)

  const firstName = user.name.trim().split(' ')[0]

  const handleSearch = async () => {
    const next = {
      from: from.trim() ? '' : 'Enter your starting point',
      destination: destination.trim() ? '' : 'Enter your destination',
    }
    setErrors(next)
    setSearchError('')
    if (next.from || next.destination) return

    setLoading(true)
    try {
      setResults(await searchAlongRoute({ from, destination }))
    } catch (e) {
      setResults(null)
      setSearchError(e instanceof Error ? e.message : 'Search failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll} style={styles.flex}>
      <View style={styles.header}>
        <DineGoLogo size="sm" />
        <Pressable onPress={onSignOut} hitSlop={10} accessibilityRole="button" accessibilityLabel="Sign out">
          <Ionicons name="log-out-outline" size={22} color={colors.mutedForeground} />
        </Pressable>
      </View>

      <Text style={styles.title}>{firstName ? `Hi, ${firstName}` : 'Welcome'}</Text>
      <Text style={styles.subtitle}>Where are you headed? We'll find restaurants along your route.</Text>

      <View style={styles.routeCard}>
        <TextField label="From" value={from} onChangeText={(v) => { setFrom(v); setErrors((e) => ({ ...e, from: '' })) }} placeholder="Starting point" error={errors.from} />
        <TextField label="Destination" value={destination} onChangeText={(v) => { setDestination(v); setErrors((e) => ({ ...e, destination: '' })) }} placeholder="Where to?" error={errors.destination} />
        <PrimaryButton title="Find restaurants" loadingTitle="Searching…" loading={loading} onPress={handleSearch} />
      </View>

      {!!searchError && (
        <View style={styles.errorBox} accessibilityRole="alert">
          <Text style={styles.errorText}>{searchError}</Text>
        </View>
      )}

      {loading && <ActivityIndicator style={{ marginTop: 24 }} color={colors.brand} />}

      {results && !loading && (
        <View style={{ marginTop: 24 }}>
          <Text style={styles.sectionTitle}>
            {results.length} restaurant{results.length === 1 ? '' : 's'} along your route
          </Text>
          {DEMO_MODE && <Text style={styles.sampleNote}>Sample data — real results need the backend.</Text>}
          {results.map((r) => (
            <View key={r.id} style={styles.card}>
              <Image source={{ uri: r.imageUri }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardName}>{r.name}</Text>
                  {r.isSample && (
                    <View style={styles.sampleBadge}>
                      <Text style={styles.sampleBadgeText}>SAMPLE</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cardMeta}>
                  {r.cuisine} · {r.offRouteKm} km off route
                </Text>
                <View style={styles.cardFooter}>
                  <View style={styles.slotPill}>
                    <Text style={styles.slotText}>{r.nextSlot}</Text>
                  </View>
                  <View style={styles.reserveButton}>
                    <Text style={styles.reserveText}>Reserve</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { color: colors.foreground, fontSize: 26, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: colors.mutedForeground, fontSize: 14, marginBottom: 20, lineHeight: 20 },
  routeCard: { backgroundColor: colors.muted, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 16 },
  errorBox: {
    backgroundColor: 'rgba(248,113,113,0.10)',
    borderColor: 'rgba(248,113,113,0.35)',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: 12,
    marginTop: 16,
  },
  errorText: { color: colors.error, fontSize: 13 },
  sectionTitle: { color: colors.foreground, fontSize: 16, fontWeight: '700' },
  sampleNote: { color: colors.warningText, fontSize: 12, marginTop: 4 },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, marginTop: 14, overflow: 'hidden' },
  cardImage: { width: '100%', height: 140, backgroundColor: colors.muted },
  cardBody: { padding: 14 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  cardName: { flex: 1, color: colors.foreground, fontSize: 16, fontWeight: '700' },
  sampleBadge: { backgroundColor: colors.warningBg, borderColor: colors.warningBorder, borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2 },
  sampleBadgeText: { color: colors.warningText, fontSize: 9, fontWeight: '700', letterSpacing: 0.8 },
  cardMeta: { color: colors.mutedForeground, fontSize: 13, marginTop: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  slotPill: { backgroundColor: colors.warningBg, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6 },
  slotText: { color: colors.warningText, fontSize: 13, fontWeight: '700' },
  reserveButton: { backgroundColor: colors.brand, borderRadius: radius.pill, paddingHorizontal: 18, paddingVertical: 8, opacity: 0.55 },
  reserveText: { color: colors.onBrand, fontSize: 13, fontWeight: '700' },
})
