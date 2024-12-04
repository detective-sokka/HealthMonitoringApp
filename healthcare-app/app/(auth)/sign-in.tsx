import { View, Text, ScrollView, Alert, Image } from "react-native";
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from "expo-router";

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import {signInWithEmailAndPassword} from 'firebase/auth';
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  const [form, setForm] = useState<FormData>({ email: "", password: "" });
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const auth = FIREBASE_AUTH; 

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await signInWithEmailAndPassword(auth, form.email, form.password);
      console.log(response);
    } catch (error:any) {
      console.log(error);
      Alert.alert("Login failed : " + error.message);
      setSubmitting(false);
      return;
    }

    try {
      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[360px] h-[134px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
