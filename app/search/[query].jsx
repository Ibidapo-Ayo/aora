import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";

import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchPosts } from "../../lib/api";
import useFetch from "../../hooks/useFetch";
import VideoCard from "../../components/VideoCard";
import LoadingState from "../../components/LoadingState";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { user } = useGlobalContext();
  const { query } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: posts,
    refetch,
    isLoading,
  } = useFetch(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

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
          <View className="my-3 px-4">
              <Text className="font-pmedium text-sm text-gray-100">
                Search Result
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {query}
              </Text>

           <View className="mt-6 mb-8">
           <SearchInput initialQuery={query} />
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

export default Search;
