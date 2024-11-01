import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../providers/ThemeProvider";
import Feather from "@expo/vector-icons/Feather";

// if it ends up near the edje mb make it less circled (like language modal)

const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.secondaryBackgroundColor },
      ]}
    >
      <ThemeIcon
        name="sun"
        color={
          theme.iconName === "sun" ? theme.iconColor : theme.inactiveTextColor
        }
        onPress={() => toggleTheme("light")}
        backgroundColor={theme.secondaryBackgroundColor}
      />
      <ThemeIcon
        name="cloud"
        color={
          theme.iconName === "cloud" ? theme.iconColor : theme.inactiveTextColor
        }
        onPress={() => toggleTheme("gray")}
        backgroundColor={theme.secondaryBackgroundColor}
      />
      <ThemeIcon
        name="moon"
        color={
          theme.iconName === "moon" ? theme.iconColor : theme.inactiveTextColor
        }
        onPress={() => toggleTheme("dark")}
        backgroundColor={theme.secondaryBackgroundColor}
      />
    </View>
  );
};

const ThemeIcon = ({ name, color, backgroundColor, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.iconContainer, { backgroundColor: backgroundColor }]}
    >
      <Feather name={name} size={28} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "gainsboro",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 105,
  },
  iconContainer: {
    backgroundColor: "green",
    padding: 6,
    borderRadius: 105,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default ThemeSwitcher;
