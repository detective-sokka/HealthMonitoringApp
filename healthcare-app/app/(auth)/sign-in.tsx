import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';
import FormField from '../../components/FormField';

const SignIn = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
      <View className="w-full flex justify-center h-full px-4 my-6" >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[360px] h-[134px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to <Text className="text-secondary-200">Health Care</Text>
          </Text>

          <FormField />
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn