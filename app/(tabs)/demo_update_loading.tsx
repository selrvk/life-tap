import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function Demo_Update_Loading() {
  const router = useRouter();

  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const dotScale1 = useRef(new Animated.Value(1)).current;
  const dotScale2 = useRef(new Animated.Value(1)).current;
  const dotScale3 = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const [progressLabel, setProgressLabel] = useState("Connecting to device…");

  const steps = [
    "Connecting to device…",
    "Authenticating…",
    "Reading current data…",
    "Writing new record…",
    "Verifying integrity…",
    "Finalising update…",
  ];

  useEffect(() => {
    // Fade in
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Progress bar
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start();

    // Step labels
    steps.forEach((step, i) => {
      setTimeout(() => setProgressLabel(step), i * 700);
    });

    // Bouncing dots
    const makeDot = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1.5, duration: 350, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 1, duration: 350, useNativeDriver: true }),
          Animated.delay(700),
        ])
      );

    makeDot(dotScale1, 0).start();
    makeDot(dotScale2, 200).start();
    makeDot(dotScale3, 400).start();

    // Icon pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const barColor = progressAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#C88080", "#9A3030", "#7A2020"],
  });

  return (
    <LinearGradient colors={["#EAF4F2", "#F5E8E8", "#FDF0EC"]} style={styles.container}>

      {/* Top label */}
      <View style={styles.topLabel}>
        <View style={styles.labelDot} />
        <Text style={styles.labelText}>NFC WRITE MODE</Text>
        <View style={styles.labelDot} />
      </View>

      {/* Center content */}
      <Animated.View style={[styles.center, { opacity: fadeIn }]}>

        {/* Icon */}
        <Animated.View style={[styles.iconWrapper, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <Text style={styles.iconEmoji}>✦</Text>
            </View>
          </View>

          {/* Corner accents */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
        </Animated.View>

        <Text style={styles.mainTitle}>Updating Record</Text>
        <Text style={styles.subTitle}>Do not move your device{"\n"}away from the tag</Text>

        {/* Progress bar */}
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFill, { width: barWidth, backgroundColor: barColor }]} />
        </View>

        {/* Step label + dots */}
        <View style={styles.stepRow}>
          <Text style={styles.stepText}>{progressLabel}</Text>
          <View style={styles.dots}>
            <Animated.View style={[styles.dot, { transform: [{ scale: dotScale1 }] }]} />
            <Animated.View style={[styles.dot, { transform: [{ scale: dotScale2 }] }]} />
            <Animated.View style={[styles.dot, { transform: [{ scale: dotScale3 }] }]} />
          </View>
        </View>

        {/* Warning card */}
        <View style={styles.warnCard}>
          <Text style={styles.warnIcon}>⚠</Text>
          <Text style={styles.warnText}>
            Interrupting this process may corrupt the tag data.
          </Text>
        </View>

      </Animated.View>

      {/* Bottom */}
      <View style={styles.bottom}>
        <Text style={styles.hintText}>Ensure your NFC tag is within 2–4 cm of your device</Text>
        <Pressable
          style={({ pressed }) => [styles.skipBtn, pressed && { opacity: 0.4 }]}
          onPress={() => router.push("/demo_update_done")}
        >
          <Text style={styles.skipText}>Skip  →</Text>
        </Pressable>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 64,
    paddingBottom: 48,
    paddingHorizontal: 28,
  },

  // Top label — matches the subtle tracking label style from main page
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
    backgroundColor: "#7A2020",
    opacity: 0.7,
  },
  labelText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    color: "#7A2020",
  },

  // Center
  center: {
    alignItems: "center",
    gap: 18,
  },

  // Icon — warm cream bg with maroon accent, mirrors the ActionButton icon box
  iconWrapper: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  iconOuter: {
    width: 110,
    height: 110,
    borderRadius: 22,
    backgroundColor: "#FDF0EC",
    borderWidth: 1.5,
    borderColor: "#E8C8C0",
    alignItems: "center",
    justifyContent: "center",
  },
  iconInner: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: "#F5E0DC",
    borderWidth: 1,
    borderColor: "#9A303050",
    alignItems: "center",
    justifyContent: "center",
  },
  iconEmoji: {
    fontSize: 30,
    color: "#8B2A2A",
  },

  // Corner accents in maroon
  corner: {
    position: "absolute",
    width: 12,
    height: 12,
    borderColor: "#7A2020",
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2, borderTopLeftRadius: 4 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2, borderTopRightRadius: 4 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2, borderBottomLeftRadius: 4 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2, borderBottomRightRadius: 4 },

  // Text — mirrors main page heading colours
  mainTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#3A1010",
    letterSpacing: 0.4,
  },
  subTitle: {
    fontSize: 14,
    color: "#A07070",
    textAlign: "center",
    lineHeight: 21,
    letterSpacing: 0.2,
  },

  // Progress bar — warm cream track, maroon fill
  barTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "#F5E0DC",
    borderRadius: 99,
    overflow: "hidden",
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#E8C8C0",
  },
  barFill: {
    height: "100%",
    borderRadius: 99,
  },

  // Step row
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  stepText: {
    fontSize: 12,
    color: "#A07070",
    letterSpacing: 0.4,
    fontWeight: "500",
  },
  dots: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 99,
    backgroundColor: "#8B2A2A",
  },

  // Warning card — mirrors the health prompt card from main page
  warnCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#FDF0EC",
    borderWidth: 1,
    borderColor: "#E8C8C0",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 6,
  },
  warnIcon: {
    fontSize: 14,
    color: "#C07030",
    marginTop: 1,
  },
  warnText: {
    flex: 1,
    fontSize: 12,
    color: "#A07070",
    lineHeight: 18,
    letterSpacing: 0.2,
  },

  // Bottom
  bottom: {
    alignItems: "center",
    gap: 14,
  },
  hintText: {
    fontSize: 12,
    color: "#C8A0A0",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  skipBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 13,
    color: "#A07070",
    letterSpacing: 1,
    fontWeight: "500",
  },
});