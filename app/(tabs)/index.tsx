import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <LinearGradient colors={["#ffffff", "#A4DAD2"]} style={{ flex: 1 }}>
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-3xl font-semibold text-center">
          Welcome back, Charles
        </Text>

        <Text className="font-bold mt-4">How do you feel today?</Text>

        <Text className="mt-2 text-center">
          Answer our AI-powered health report test
        </Text>
      </View>
    </LinearGradient>
  );
}
