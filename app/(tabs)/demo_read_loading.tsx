import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
//import NfcManager, { NfcTech } from "react-native-nfc-manager";

const RING_SIZE = 120;

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
          Animated.timing(anim, { toValue: 1, duration: 2000, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])
      );

    Animated.loop(
      Animated.sequence([
        Animated.timing(iconPulse, { toValue: 1.08, duration: 900, useNativeDriver: true }),
        Animated.timing(iconPulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();

    makeRingAnim(ring1, 0).start();
    makeRingAnim(ring2, 600).start();
    makeRingAnim(ring3, 1200).start();
  }, []);

  const ringStyle = (anim: Animated.Value) => ({
    opacity: anim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 0.4, 0] }),
    transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.6] }) }],
  });

  return (
    <LinearGradient
      colors={["#EAF4F2", "#F5E8E8", "#FDF0EC"]}
      style={{ flex: 1 }}
    >
      {/* Top label */}
      <View style={{ paddingTop: 56, paddingHorizontal: 28 }}>
        <View className="flex-row items-center justify-center">
          <View className="w-1.5 h-1.5 rounded-full bg-[#7A2020] opacity-70 mr-2" />
          <Text className="text-[11px] font-bold tracking-[3px] text-[#7A2020]">NFC READER ACTIVE</Text>
          <View className="w-1.5 h-1.5 rounded-full bg-[#7A2020] opacity-70 ml-2" />
        </View>
      </View>

      {/* Center — absolutely positioned to guarantee true centering */}
      <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, alignItems: "center", justifyContent: "center" }}>

        {/* Pulse rings + icon */}
        <View style={{ width: RING_SIZE, height: RING_SIZE, alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
          <Animated.View style={[{ position: "absolute", width: RING_SIZE, height: RING_SIZE, borderRadius: RING_SIZE / 2, borderWidth: 1.5, borderColor: "#9A3030" }, ringStyle(ring1)]} />
          <Animated.View style={[{ position: "absolute", width: RING_SIZE, height: RING_SIZE, borderRadius: RING_SIZE / 2, borderWidth: 1.5, borderColor: "#9A3030" }, ringStyle(ring2)]} />
          <Animated.View style={[{ position: "absolute", width: RING_SIZE, height: RING_SIZE, borderRadius: RING_SIZE / 2, borderWidth: 1.5, borderColor: "#9A3030" }, ringStyle(ring3)]} />

          <Animated.View
            style={{
              width: RING_SIZE,
              height: RING_SIZE,
              borderRadius: RING_SIZE / 2,
              backgroundColor: "#FDF0EC",
              borderWidth: 2,
              borderColor: "#C88080",
              alignItems: "center",
              justifyContent: "center",
              transform: [{ scale: iconPulse }],
            }}
          >
            <Text className="text-3xl text-[#8B2A2A] mb-1">⟳</Text>
            <View className="flex-row items-center justify-center">
              <View style={{ width: 14, height: 14, borderWidth: 2, borderColor: "#C8808080", borderRadius: 99, marginRight: 4 }} />
              <View style={{ width: 24, height: 24, borderWidth: 2, borderColor: "#C8808080", borderRadius: 99, marginRight: 4 }} />
              <View style={{ width: 34, height: 34, borderWidth: 2, borderColor: "#C8808080", borderRadius: 99 }} />
            </View>
          </Animated.View>
        </View>

        <Text className="text-[28px] font-extrabold text-[#3A1010] tracking-wide mb-2">
          Ready to Scan
        </Text>
        <Text className="text-sm text-[#A07070] text-center leading-[22px] mb-6">
          Hold your NFC tag close{"\n"}to the back of your device
        </Text>

        {/* Status pill */}
        <View className="flex-row items-center bg-[#FDF0EC] border border-[#E8C8C0] rounded-full px-4 py-2">
          <Animated.View
            className="w-2 h-2 rounded-full bg-[#8B2A2A] mr-2"
            style={{ transform: [{ scale: iconPulse }] }}
          />
          <Text className="text-[13px] font-semibold text-[#8B2A2A] tracking-widest">Scanning…</Text>
        </View>

      </View>

      {/* Bottom — pinned to bottom */}
      <View style={{ position: "absolute", bottom: 32, left: 0, right: 0, alignItems: "center" }}>
        <Text className="text-xs text-[#C8A0A0] text-center mb-3">
          Make sure NFC is enabled in your device settings
        </Text>
        <Pressable
          className="px-5 py-2 active:opacity-40"
          onPress={() => router.push("/tag")}
        >
          <Text className="text-[13px] text-[#A07070] tracking-widest font-medium">Skip  →</Text>
        </Pressable>
      </View>

    </LinearGradient>
  );
}