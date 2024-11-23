import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import React from 'react';

export default function App() {

  return (
    <SafeAreaView style={{ backgroundColor: "#7B97A3", height: "100%" }}>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[200px] h-[143px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
            Stay Informed, Stay Safe {"\n"}
            Stay Healthy, {" "}
              <Text className="text-secondary-200">Health Care</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Empowering you with real-time insights on your surroundings to help you live healthier every day
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Go to
            </Text>
            <Link
              href="/home"
              className="text-lg font-psemibold text-secondary"
            >
              Home
            </Link>
          </View>  
        </View>
      
        <StatusBar backgroundColor="#161622" style="light" />
      </ScrollView>

    </SafeAreaView>
  );
}