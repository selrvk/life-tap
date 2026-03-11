import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function Tag() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#EAF4F2", "#C8E8E3", "#A4DAD2"]} className="flex">
      <View
        className="px-5 pt-16 h-screen"
      >
        {/* Profile Card */}
        <View className="bg-white/82 rounded-3xl p-7 shadow-lg border border-[#C0E0DB]"
          style={{
            shadowColor: "#2D7A72",
            shadowOpacity: 0.12,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 8 },
            elevation: 6,
          }}
        >
          {/* Logo / Avatar Section */}
          <View className="items-center mb-4">
            <View className="w-[110px] h-[110px] rounded-full border-[3px] border-[#58A99F] bg-[#EAF7F5] items-center justify-center overflow-hidden">
              <Image
                source={require('./../../assets/images/logo.png')}
                className="w-[90px] h-[90px]"
                resizeMode="contain"
              />
            </View>
            <View className="flex-row items-center gap-[5px] bg-[#E6F7F4] border border-[#A4DAD2] px-[10px] py-1 rounded-full mt-[10px]">
              <View className="w-[7px] h-[7px] rounded-full bg-[#3CB371]" />
              <Text className="text-xs font-semibold text-[#2D7A50] tracking-[0.5px]">Active</Text>
            </View>
          </View>

          {/* Name */}
          <Text className="text-xl font-extrabold text-[#1A3D3A] text-center tracking-[0.3px]">
            Charles Jansen D. Alcantara
          </Text>
          <Text className="text-xs text-[#5A8A85] text-center mt-1 tracking-[0.8px]">
            Patient ID: #00-2024-CJA
          </Text>

          {/* Divider */}
          <View className="h-px bg-[#C0E0DB] my-[10px]" />

          {/* Info Section */}
          <View className="gap-[10px]">
            <Text className="text-[10px] font-bold tracking-[2.5px] text-[#58A99F] mb-1">
              CONTACT DETAILS
            </Text>

            <InfoRow icon="📱" label="Primary Phone" value="+63 123 456 7890" />

            <View className="h-px bg-[#DFF0EE] my-[14px]" />
            <Text className="text-[10px] font-bold tracking-[2.5px] text-[#58A99F] mb-1">
              EMERGENCY CONTACTS
            </Text>

            <InfoRow icon="👤" label="Contact Person 1" value="Charles" />
            <InfoRow icon="📞" label="Phone" value="+63 098 765 4321" />

            <View className="h-px bg-[#DFF0EE] my-[14px]" />

            <InfoRow icon="👤" label="Contact Person 2" value="Alcantara" />
            <InfoRow icon="📞" label="Phone" value="+63 098 765 4321" />
          </View>
        </View>

        {/* Home Button */}
        <Pressable
          className="mt-6 bg-[#F5E0DC] border border-[#E8C8C0] rounded-2xl py-4 items-center active:bg-[#2D7A72] active:scale-[0.98]"
          style={({ pressed }) => pressed ? { backgroundColor: "#2D7A72", transform: [{ scale: 0.98 }] } : {}}
          onPress={() => router.push("/")}
        >
          <Text className="text-[#8B2A2A] text-base font-bold tracking-[0.5px]">← Return to Home</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View className="flex-row items-center gap-3 bg-[#F2FAF9] rounded-xl py-[10px] px-[14px]">
      <Text className="text-base">{icon}</Text>
      <View className="flex-1">
        <Text className="text-[11px] text-[#7AADA9] font-medium tracking-[0.3px]">{label}</Text>
        <Text className="text-[15px] text-[#1A3D3A] font-semibold mt-[1px]">{value}</Text>
      </View>
    </View>
  );
}