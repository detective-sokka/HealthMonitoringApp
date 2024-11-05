import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center justify-center p-8 bg-blue-500">
        <Text className="text-2xl font-pbold4">Hello, Health Care App!</Text>
        <Text className="text-lg text-blue-200 mb-4">Welcome to the demo page</Text>
        <StatusBar style="auto" />
      </View>

      <View className="p-6">
        <View className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Text className="text-gray-800 text-lg font-pblack">Card Section</Text>
          <Text className="text-gray-600 mt-2">
            This is a sample card to check border radius, shadow, padding, and background color.
          </Text>
        </View>

        <View className="flex-row justify-around my-4">
          <Button title="Primary Action" color="primary" />
          <Button title="Secondary Action" color="gray" />
        </View>

        <View className="items-center mt-6">
          <Image
            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500"
            source={require('../assets/health-care-app-icon.png')}
          />
          <Text className="text-xl font-medium text-gray-700">Sample Image</Text>
        </View>

        <Link href="/profile" className="mt-8 text-blue-500 underline text-lg text-center">
          Go to Profile
        </Link>
      </View>
    </ScrollView>
  );
}