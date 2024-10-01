import { useUser } from "@clerk/clerk-expo";
import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { supabase } from "./../../Utils/SupabaseConfig";

const HomeScreen = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      updateProfileImage(); 
    }
    getLatestVideoList();
  }, [user]);

  const updateProfileImage = async () => {
    const { data, error } = await supabase
      .from("Users")
      .update({ profilepic: user.imageUrl })
      .eq("email", user?.primaryEmailAddress?.emailAddress)
      .is("profilepic", null)
      .select();
    console.log(data);
  };

  const getLatestVideoList = async () => {
    const { data: PostList, error } = await supabase
      .from("PostList")
      .select("*"); // Fetch all posts
    console.log(PostList);

    const { data: UsersData, error: usersError } = await supabase
      .from("Users")
      .select("username, profilepic, name"); // Fetch user data
    console.log(UsersData);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 2 }}>
        <View style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Snaazr</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
