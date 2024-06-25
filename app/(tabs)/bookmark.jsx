import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";

import { icons, images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getDocument, getLatestPosts } from "../../lib/api";
import VideoCard from "../../components/VideoCard";
import { Alert } from "react-native";

const Bookmark = () => {
  const { user, updated, savedPosts } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [savedPostsData, setSavedPostsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      try {
        const fetchedPosts = await Promise.all(
          savedPosts.map(async (postId) => {
            const result = await getDocument(postId);
            return result
          })
        );
        console.log(fetchedPosts);
        setSavedPostsData(fetchedPosts);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setRefreshing(false);
      }
    };

    fetchData()
  }, [savedPosts]);
  return (
    <SafeAreaView className="bg-primary h-full">
      {refreshing ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            data={savedPostsData}
            keyExtractor={(item, index) => index}
            renderItem={({ item }, index) => (
              <VideoCard video={item} id={item.$id} />
            )}
            ListHeaderComponent={() => (
              <View className="my-6 px-4">
                <Text className="text-2xl text-white">Saved Video</Text>

                <View className="mt-6 mb-8">
                  <SearchInput />
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
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Bookmark;
