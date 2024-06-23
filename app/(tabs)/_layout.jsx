import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "../../constants";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./home";
import Bookmark from "./bookmark";
import Create from "./create"
import Profile from "./profile"

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, color, name, focussed }) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focussed ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
          tabBarHideOnKeyboard: true
        }}
      >
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Home"
                icon={icons.home}
                focussed={focused}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="bookmark"
          component={Bookmark}
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Bookmark"
                icon={icons.bookmark}
                focussed={focused}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="create"
          component={Create}
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Create"
                icon={icons.plus}
                focussed={focused}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Profile"
                icon={icons.profile}
                focussed={focused}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabsLayout;
