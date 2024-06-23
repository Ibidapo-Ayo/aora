import { Client } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.strangedev.aora",
  projectId: "666cb8db0021f10ca6c8",
  databaseId: "666cb9f2003909e3af46",
  userCollectionId: "666cba090028699ecfd2",
  videosCollectionId: "666cba290006ecc1076f",
  storageId: "666cbc59001fe1b74f66",
};

export const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videosCollectionId,
  storageId,
} = config; 
// Init your React Native SDK
const client = new Client();

export const aora_client = client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.
