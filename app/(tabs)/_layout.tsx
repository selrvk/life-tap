import { Tabs } from "expo-router";
import React from "react";

const _Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="tag"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="demo_read_loading"
        options={{
          title: "Demo Read",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="demo_update_loading"
        options={{
          title: "Demo UL",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="demo_update_done"
        options={{
          title: "Demo UD",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _Layout;
