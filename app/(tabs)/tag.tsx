import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Tag() {

    const router = useRouter();

  return (
    <LinearGradient colors={["#ffffff", "#A4DAD2"]} style={{ flex: 1 }}>
      <View className="flex-1 justify-center items-center px-6">

      <Image className="p-10" source={require('./../../assets/images/logo.png')} style={{ width: 250, height: 250 }} resizeMode="contain"/>

        <Text className="font-bold mt-20 text-xl">Charles Jansen D. Alcantara</Text>
        <Text className="font-bold mt-5 text-xl">+63 123 456 7890</Text>
        <Text className="font-bold mt-5 text-xl">Contact Person 1: Charles</Text>
        <Text className="font-bold mt-5 text-xl">Contact Number: +63 098 765 4321</Text>
        <Text className="font-bold mt-5 text-xl">Contact Person 2: Alcantara</Text>
        <Text className="font-bold mt-5 text-xl">Contact Number: +63 098 765 4321</Text>

        <View className="items-center mt-20">
          <Pressable className="mt-10 p-4 bg-[#58823D] rounded-3xl"
          onPress={() => router.push("/")}>
            <Text className="text-white text-xl font-bold">
              Home
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
