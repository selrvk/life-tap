import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Index() {

  const router = useRouter();

  return (
    <LinearGradient colors={["#ffffff", "#A4DAD2"]} style={{ flex: 1 }}>
      <View className="flex-1 justify-center items-center px-6">

      <Image className="p-10" source={require('./../../assets/images/logo.png')} style={{ width: 250, height: 250 }} resizeMode="contain"/>

        <Text className="text-4xl font-semibold text-center">
          Welcome back, Charles
        </Text>

        <Text className="font-bold mt-20 text-xl">How do you feel today?</Text>

        <Text className="mt-2 text-center">
          Answer our AI-powered health report test
        </Text>

        <View className="items-center mt-20">
          <Pressable className="mt-10 p-4 bg-[#58823D] rounded-3xl"
          onPress={() => router.push("/tag")}>
            <Text className="text-white text-xl font-bold">
              Read LifeTap
            </Text>
          </Pressable>
          <Pressable className="mt-10 p-4 bg-[#58823D] rounded-3xl">
            <Text className="text-white text-xl font-bold">
              Update LifeTap
            </Text>
          </Pressable>
          <Pressable className="mt-10 p-4 bg-[#58823D] rounded-3xl">
            <Text className="text-white text-xl font-bold">
              Uploud LifeTap to Cloud
            </Text>
          </Pressable>

        </View>
      </View>
    </LinearGradient>
  );
}
