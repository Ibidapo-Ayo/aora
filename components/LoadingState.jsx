import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";

const LoadingState = () => {
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg  justify-center items-center p-0.5 bg-gray-600"></View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <View className="w-52 h-[10px] p-0.5 animate-pulse bg-gray-600"></View>
            <View className="w-44 h-[10px] p-0.5 animate-pulse bg-gray-600"></View>
          </View>
        </View>
        <View className="w-5 h-10 bg-gray-600 animate-pulse"></View>
      </View>
      <TouchableOpacity className="w-full h-60 rounded-xl mt-3 relative justify-center items-center bg-gray-600 animate-pulse"></TouchableOpacity>
    </View>
  );
};

export default LoadingState;
