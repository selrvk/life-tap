import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function Demo_Read_Loading() {
  const router = useRouter();

  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;
  const iconPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const makeRingAnim = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

    const iconAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(iconPulse, {
          toValue: 1.08,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(iconPulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );

    makeRingAnim(ring1, 0).start();
    makeRingAnim(ring2, 600).start();
    makeRingAnim(ring3, 1200).start();
    iconAnim.start();
  }, []);

  const ringStyle = (anim: Animated.Value) => ({
    opacity: anim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 0.5, 0] }),
    transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.6] }) }],
  });

  return (
    <LinearGradient colors={["#0D2B2A", "#0F3D38", "#0D2B2A"]} style={styles.container}>

      {/* Top label */}
      <View style={styles.topLabel}>
        <View style={styles.labelDot} />
        <Text style={styles.labelText}>NFC READER ACTIVE</Text>
        <View style={styles.labelDot} />
      </View>

      {/* Center scanning area */}
      <View style={styles.center}>

        {/* Pulse rings */}
        <View style={styles.ringsWrapper}>
          <Animated.View style={[styles.ring, ringStyle(ring1)]} />
          <Animated.View style={[styles.ring, ringStyle(ring2)]} />
          <Animated.View style={[styles.ring, ringStyle(ring3)]} />

          {/* NFC icon core */}
          <Animated.View style={[styles.iconCore, { transform: [{ scale: iconPulse }] }]}>
            <Text style={styles.nfcSymbol}>⟳</Text>
            <View style={styles.nfcLines}>
              <View style={[styles.nfcArc, { width: 14, height: 14 }]} />
              <View style={[styles.nfcArc, { width: 24, height: 24 }]} />
              <View style={[styles.nfcArc, { width: 34, height: 34 }]} />
            </View>
          </Animated.View>
        </View>

        {/* Text below scanner */}
        <Text style={styles.mainTitle}>Ready to Scan</Text>
        <Text style={styles.subTitle}>Hold your NFC tag close{"\n"}to the back of your device</Text>

        {/* Status pill */}
        <View style={styles.statusPill}>
          <Animated.View style={[styles.statusDot, { transform: [{ scale: iconPulse }] }]} />
          <Text style={styles.statusText}>Scanning…</Text>
        </View>
      </View>

      {/* Bottom area */}
      <View style={styles.bottom}>
        <Text style={styles.hintText}>Make sure NFC is enabled in your device settings</Text>

        {/* Discreet skip button */}
        <Pressable
          style={({ pressed }) => [styles.skipBtn, pressed && { opacity: 0.5 }]}
          onPress={() => router.push("/tag")}
        >
          <Text style={styles.skipText}>Skip  →</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const RING_SIZE = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 64,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  topLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  labelDot: {
    width: 5,
    height: 5,
    borderRadius: 99,
    backgroundColor: "#4ECDC4",
    opacity: 0.7,
  },
  labelText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    color: "#4ECDC4",
  },
  center: {
    alignItems: "center",
    gap: 20,
  },
  ringsWrapper: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 1.5,
    borderColor: "#4ECDC4",
  },
  iconCore: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    backgroundColor: "#163D39",
    borderWidth: 2,
    borderColor: "#4ECDC4",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  nfcSymbol: {
    fontSize: 28,
    color: "#4ECDC4",
  },
  nfcLines: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  nfcArc: {
    borderWidth: 2,
    borderColor: "#4ECDC480",
    borderRadius: 99,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#E8F5F4",
    letterSpacing: 0.5,
    marginTop: 8,
  },
  subTitle: {
    fontSize: 15,
    color: "#7ABDB8",
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1A4A45",
    borderWidth: 1,
    borderColor: "#2D7A74",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: "#4ECDC4",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4ECDC4",
    letterSpacing: 1,
  },
  bottom: {
    alignItems: "center",
    gap: 16,
  },
  hintText: {
    fontSize: 12,
    color: "#3D6E6A",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  skipBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 13,
    color: "#3D6E6A",
    letterSpacing: 1,
    fontWeight: "500",
  },
});