import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { icons } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";
import Modal from "react-native-modal";
import { deletePost, updateUser } from "../lib/api";
import Icon from "react-native-vector-icons/FontAwesome";

const Actions = () => {
  const {
    openActions,
    savedPosts,
    setOpenActions,
    setSavedPosts,
    setUpdated,
    user,
    postId,
  } = useGlobalContext();
  const handleDeletePost = async () => {
    try {
      await deletePost(savedPosts);
      Alert.alert("Post deleted", "Post has been delete successfully");
      setUpdated((prev) => prev + 1);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setOpenActions(false);
    }
  };

  const handleLikePost = async (type) => {
    let updateData;
    if(type === 'remove'){
     updateData = savedPosts.filter((data) => data !== postId)
    }else{
        updateData = [...savedPosts, postId]
    }
    try {
      const result = await updateUser(user.$id, {
        likedPosts: updateData,
      });
      setSavedPosts(result.likedPosts)
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setOpenActions(false);
    }
  };
  const isSaved = () => {
    return savedPosts.includes(postId);
  };
  return (
    <Modal
      isVisible={openActions}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection="down"
      onBackdropPress={() => {
        setOpenActions(false);
      }}
      propagateSwipe
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      <View
        className={`w-full h-60 absolute bottom-0 transition-transform duration-1000 bg-black-200 rounded-t-2xl py-2 px-4 items-center space-y-8`}
      >
        <View className="w-20 h-2 rounded-xl bg-gray-100/10"></View>
        <TouchableOpacity
          className="flex-row items-center justify-center space-x-5"
          activeOpacity={0.7}
          onPress={
            isSaved()
              ? () => handleLikePost("remove")
              : () => handleLikePost("add")
          }
        >
          <View className="w-10 h-10 rounded-full bg-gray-100/10 items-center justify-center">
            {isSaved() ? (
              <View className="relative items-center justify-center">
                <Icon name="bookmark" size={24} color="white"  />
                <Icon name="times" size={10} color="red" style={{
                    position: "absolute",
                    top: 6,
                    left: 4.5
                }} />
              </View>
            ) : (
              <Icon name="bookmark" size={24} color="white"  />
            )}
          </View>
          <View className="flex-1">
            <Text className="text-xl text-white">
              {!isSaved() ? "Save this post" : "Remove post from bookmark"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-center space-x-5"
          activeOpacity={0.7}
          onPress={handleDeletePost}
        >
          <View className="w-10 h-10 rounded-full bg-gray-100/10 items-center justify-center">
            <Icon name="trash" size={24} color="red" />
          </View>
          <View className="flex-1">
            <Text className="text-xl text-white">Remove from posts</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Actions;
