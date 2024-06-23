import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import Button from "./Button";
import { router } from "expo-router";

const EmptyState = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-xl text-gray-100">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>
      <Button 
      title={"Create video"}
      handlePress={()=> router.push("/create")}
      containerStyle={"w-full my-4"}
      />
    </View>
  );
};

export default EmptyState;
