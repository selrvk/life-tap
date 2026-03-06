import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#FDF6F0", "#F5E6E0", "#EDD5CC"]} className="flex-1">
      <View className="flex-1 pt-16 pb-12 px-6 justify-between">

        {/* Top label */}
        <View className="flex-row items-center justify-center">
          <View className="w-1.5 h-1.5 rounded-full bg-[#8B2A2A] opacity-50 mx-1.5" />
          <Text className="text-[11px] font-bold tracking-[3px] text-[#8B2A2A]">LIFETAP</Text>
          <View className="w-1.5 h-1.5 rounded-full bg-[#8B2A2A] opacity-50 mx-1.5" />
        </View>

        {/* Logo + greeting */}
        <View className="items-center">
          <Image
            source={require('./../../assets/images/logo.png')}
            className="w-28 h-28 mb-3"
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-[#A06060] tracking-wide mb-0.5">
            Welcome back,
          </Text>
          <Text className="text-4xl font-extrabold text-[#3A1010] tracking-wide">
            Charles
          </Text>
        </View>

        {/* Health prompt card */}
        <View className="flex-row items-center bg-[#FDF0EC] rounded-2xl border border-[#E8C8C0] px-4 py-3">
          <View className="w-10 h-10 rounded-xl bg-[#F5E0DC] items-center justify-center mr-3">
            <Text className="text-lg text-[#8B2A2A]">♥</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-[#3A1010] tracking-wide mb-0.5">
              How do you feel today?
            </Text>
            <Text className="text-xs text-[#A07070] tracking-wide">
              Answer our AI-powered health report test
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View className="w-full">
          <ActionButton
            icon="⟳"
            label="Read LifeTap"
            sub="Scan your NFC tag"
            onPress={() => router.push("/demo_read_loading")}
            variant="primary"
          />
          <ActionButton
            icon="✦"
            label="Update LifeTap"
            sub="Write new data to tag"
            onPress={() => router.push("/demo_update_loading")}
            variant="secondary"
          />
          <ActionButton
            icon="↑"
            label="Upload to Cloud"
            sub="Sync your latest record"
            onPress={() => router.push("/demo_update_done")}
            variant="secondary"
          />
        </View>

      </View>
    </LinearGradient>
  );
}

function ActionButton({
  icon, label, sub, onPress, variant,
}: {
  icon: string;
  label: string;
  sub: string;
  onPress: () => void;
  variant: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center w-full rounded-2xl px-4 py-3.5 border mb-3 active:opacity-80 active:scale-95
        ${isPrimary
          ? "bg-[#7A2020] border-[#6A1818]"
          : "bg-[#FDF0EC] border-[#E8C8C0]"
        }`}
    >
      {/* Icon box */}
      <View className={`w-11 h-11 rounded-xl items-center justify-center mr-3
        ${isPrimary ? "bg-[#9A3030]" : "bg-[#F5E0DC]"}`}>
        <Text className={`text-xl ${isPrimary ? "text-[#FFD0C0]" : "text-[#8B2A2A]"}`}>
          {icon}
        </Text>
      </View>

      {/* Labels */}
      <View className="flex-1 justify-center mr-2">
        <Text
          className={`text-[15px] font-bold tracking-wide mb-0.5
            ${isPrimary ? "text-[#FFF5F0]" : "text-[#3A1010]"}`}
          numberOfLines={1}
        >
          {label}
        </Text>
        <Text
          className={`text-xs tracking-wide
            ${isPrimary ? "text-[#FFBBAA]" : "text-[#A07070]"}`}
          numberOfLines={1}
        >
          {sub}
        </Text>
      </View>

      {/* Arrow */}
      <Text className={`text-2xl ${isPrimary ? "text-[#FFBBAA]" : "text-[#C8A0A0]"}`}>
        ›
      </Text>
    </Pressable>
  );
}