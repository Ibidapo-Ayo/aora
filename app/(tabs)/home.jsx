import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";

import { icons, images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/api";
import useFetch from "../../hooks/useFetch";
import VideoCard from "../../components/VideoCard";
import LoadingState from "../../components/LoadingState";
import Actions from "../../components/Actions";

const Home = () => {
  const { user, updated } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch, isLoading } = useFetch(getAllPosts);
  const { data: latestPosts, refetch: refetchPosts } = useFetch(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await refetchPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, [updated]);

  return (
    <SafeAreaView className="bg-primary h-full">
      {isLoading || refreshing ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.$id}
            renderItem={({ item }, index) => (
              <VideoCard video={item} id={item.$id} />
            )}
            ListHeaderComponent={() => (
              <View className="my-6 px-4 space-y-6">
                <View className="justify-between items-start flex-row mb-6">
                  <View>
                    <Text className="font-pmedium text-sm text-gray-100">
                      Welcome back,
                    </Text>
                    <Text className="text-2xl font-psemibold text-white">
                      {user?.username}
                    </Text>
                  </View>

                  <View className="mt-1.5">
                    <Image
                      source={images.logoSmall}
                      className="w-9 h-10"
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <SearchInput placeholder="Search for a video topic" />
                <View className="w-full flex-1 pt-5 pb-8">
                  <Text className="text-gray-100 text-lg font-pregular mb-3">
                    Latest Videos
                  </Text>

                  <Trending posts={latestPosts ?? []} />
                </View>
              </View>
            )}
            ListEmptyComponent={() => {
              return (
                <EmptyState
                  title="No Videos Found"
                  subTitle="Be the first one to upload a video"
                />
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />

          <Actions />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
