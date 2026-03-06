import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function Demo_Update_Done() {
  const router = useRouter();

  const fadeIn = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(0)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(0.6)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(30)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Ring burst
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(ringScale, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(ringOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]),
      Animated.timing(ringOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();

    // Check icon pop
    Animated.sequence([
      Animated.delay(400),
      Animated.spring(checkScale, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(checkOpacity, { toValue: 1, duration: 0, useNativeDriver: true }),
    ]).start();

    Animated.timing(checkOpacity, {
      toValue: 1,
      duration: 50,
      delay: 400,
      useNativeDriver: true,
    }).start();

    // Content slide up
    Animated.sequence([
      Animated.delay(650),
      Animated.parallel([
        Animated.timing(contentSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(contentOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();

    // Overall fade
    Animated.timing(fadeIn, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);

  return (
    <LinearGradient colors={["#0A1F14", "#0D2B1C", "#0A1F14"]} style={styles.container}>

      {/* Top label */}
      <View style={styles.topLabel}>
        <View style={styles.labelDot} />
        <Text style={styles.labelText}>UPDATE COMPLETE</Text>
        <View style={styles.labelDot} />
      </View>

      {/* Center */}
      <Animated.View style={[styles.center, { opacity: fadeIn }]}>

        {/* Check animation */}
        <View style={styles.checkWrapper}>
          <Animated.View style={[styles.ringBurst, {
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          }]} />
          <Animated.View style={[styles.checkCircle, {
            opacity: checkOpacity,
            transform: [{ scale: checkScale }],
          }]}>
            <Text style={styles.checkMark}>✓</Text>
          </Animated.View>
        </View>

        {/* Text content */}
        <Animated.View style={[styles.textBlock, {
          opacity: contentOpacity,
          transform: [{ translateY: contentSlide }],
        }]}>
          <Text style={styles.mainTitle}>Tag Updated</Text>
          <Text style={styles.subTitle}>
            The NFC tag has been successfully{"\n"}written with the new record.
          </Text>
        </Animated.View>

        {/* Summary card */}
        <Animated.View style={[styles.summaryCard, {
          opacity: contentOpacity,
          transform: [{ translateY: contentSlide }],
        }]}>
          <SummaryRow label="Status" value="Write Successful" valueColor="#3CB371" />
          <View style={styles.cardDivider} />
          <SummaryRow label="Tag Type" value="NFC Type 2" />
          <View style={styles.cardDivider} />
          <SummaryRow label="Record Updated" value="Medical Info" />
          <View style={styles.cardDivider} />
          <SummaryRow label="Timestamp" value={new Date().toLocaleTimeString()} />
        </Animated.View>

      </Animated.View>

      {/* Bottom buttons */}
      <Animated.View style={[styles.bottom, { opacity: contentOpacity }]}>
        <Pressable
          style={({ pressed }) => [styles.viewBtn, pressed && styles.viewBtnPressed]}
          onPress={() => router.push("/tag")}
        >
          <Text style={styles.viewBtnText}>View Updated Tag</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.homeBtn, pressed && { opacity: 0.5 }]}
          onPress={() => router.push("/")}
        >
          <Text style={styles.homeBtnText}>← Back to Home</Text>
        </Pressable>
      </Animated.View>

    </LinearGradient>
  );
}

function SummaryRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, valueColor ? { color: valueColor } : {}]}>{value}</Text>
    </View>
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
    backgroundColor: "#3CB371",
    opacity: 0.8,
  },
  labelText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    color: "#3CB371",
  },
  center: {
    alignItems: "center",
    gap: 24,
  },
  checkWrapper: {
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  ringBurst: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "#3CB371",
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#1A3D28",
    borderWidth: 2.5,
    borderColor: "#3CB371",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3CB371",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  checkMark: {
    fontSize: 42,
    color: "#3CB371",
    fontWeight: "300",
    lineHeight: 50,
  },
  textBlock: {
    alignItems: "center",
    gap: 8,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#E8F5EE",
    letterSpacing: 0.4,
  },
  subTitle: {
    fontSize: 14,
    color: "#4A7A5A",
    textAlign: "center",
    lineHeight: 21,
    letterSpacing: 0.2,
  },
  summaryCard: {
    width: "100%",
    backgroundColor: "#0F2A1A",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1E4A2E",
    overflow: "hidden",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#3A6A4A",
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  summaryValue: {
    fontSize: 13,
    color: "#A0CCA8",
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#1A3A24",
    marginHorizontal: 18,
  },
  bottom: {
    alignItems: "center",
    gap: 14,
  },
  viewBtn: {
    width: "100%",
    backgroundColor: "#3CB371",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#3CB371",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  viewBtnPressed: {
    backgroundColor: "#2E9E5E",
    transform: [{ scale: 0.98 }],
  },
  viewBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  homeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  homeBtnText: {
    fontSize: 13,
    color: "#2A4A34",
    letterSpacing: 1,
    fontWeight: "500",
  },
});