import { View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";

import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/api";
import useFetch from "../../hooks/useFetch";
import VideoCard from "../../components/VideoCard";
import LoadingState from "../../components/LoadingState";
import { router, useLocalSearchParams } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn, updated } = useGlobalContext();
  const { query } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: posts,
    isLoading,
    refetch,
  } = useFetch(() => getUserPosts(user.$id));

  useEffect(() => {
    refetch();
  }, [updated]);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(null);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={isLoading || refreshing ? ["items1", "item2", "items3"] : posts}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) =>
          isLoading || refreshing ? (
            <LoadingState />
          ) : (
            <VideoCard video={item} />
          )
        }
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12  px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyle="mt-5"
              titleStyles="text-lg"
              containerStyles="mt-5"
            />
            <View className="flex-row">
              <InfoBox
                title={posts.length || 0}
                subTitle="Posts"
                containerStyles="mr-5"
                titleStyles="text-xl"
              />
              <InfoBox
                title={"1.2k"}
                subTitle={"Followers"}
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Videos Found"
              subTitle="No videos found for this search"
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
