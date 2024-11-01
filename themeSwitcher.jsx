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

// 
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../providers/ThemeProvider";
import Feather from "@expo/vector-icons/Feather";
// if it ends up near the edje mb make it less circled (like language modal)

//mb add littlr padding

//rename toggleTheme its more of a chooseTheme now

// after new architecture mb introduce onLayoutEffect

const DraftH = () => {
  const { toggleTheme, theme } = useTheme();

  const [visible, setVisible] = useState(false);
  const dropdownButton = useRef(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);

  const modalIconsOrder =
    theme.iconName === "cloud"
      ? [
          { id: 0, iconName: "sun", themeName: "light" },
          { id: 1, iconName: "moon", themeName: "dark" },
          { id: 2, iconName: "cloud", themeName: "gray" },
        ]
      : theme.iconName === "moon"
      ? [
          { id: 0, iconName: "sun", themeName: "light" },
          { id: 1, iconName: "cloud", themeName: "gray" },
          { id: 2, iconName: "moon", themeName: "dark" },
        ]
      : [
          { id: 0, iconName: "cloud", themeName: "gray" },
          { id: 1, iconName: "moon", themeName: "dark" },
          { id: 2, iconName: "sun", themeName: "light" },
        ];

  const openDropdown = () => {
    setVisible(true);
  };

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  useEffect(() => {
    dropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py);
      setDropdownLeft(_px);
    });
  }, []);

  const chooseThemeAndClose = (themeName) => {
    toggleTheme(themeName);
    toggleDropdown();
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <Modal visible={visible} transparent animationType="none">
          <Pressable
            style={styles.overlay}
            onPress={() => {
              setVisible(false);
            }}
          >
            <View
              style={[
                styles.dropdown,
                {
                  top: dropdownTop,
                  left: dropdownLeft,
                  backgroundColor: theme.secondaryBackgroundColor,
                },
              ]}
            >
              {modalIconsOrder.map(({ id, iconName, themeName }) => (
                <ThemeIcon
                  key={id}
                  name={iconName}
                  color={
                    theme.iconName === iconName
                      ? theme.iconColor
                      : theme.inactiveTextColor
                  }
                  onPress={() => {
                    chooseThemeAndClose(themeName);
                  }}
                  backgroundColor={theme.secondaryBackgroundColor}
                />
              ))}
            </View>
          </Pressable>
        </Modal>
      );
    }
  };

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.secondaryBackgroundColor },
      ]}
      ref={dropdownButton}
    >
      {renderDropdown()}
      <ThemeIcon
        name={theme.iconName}
        color={theme.iconColor}
        onPress={toggleDropdown}
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
    // borderRadius: 105,
    borderTopRightRadius: 105,
    borderBottomRightRadius: 105,
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
  overlay: {
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    flexDirection: "row",
    borderTopRightRadius: 105,
    borderBottomRightRadius: 105,
    // paddingTop: 4,
    // paddingBottom: 4,
  },
});

export default DraftH;
