import React, { useRef, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import Icon from "react-native-ico-flags";
import i18n from "../../localization/i18n";
import { useTheme } from "../../providers/ThemeProvider";
import { languageData } from "../../constants/languageData";
import { preferencesStorage } from "../../db/Storage";
// choose minHeight
// if remove +h it will stick directly to button
// change touchable opacitys to pressables
//mb change button color
//mb swap onPress for onPressIn

const LanguageDropdown = ({}) => {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef();
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);

  const { theme } = useTheme();

  const identifyPreferedLanguageId = preferencesStorage.contains(
    "preferedLanguageId"
  )
    ? preferencesStorage.getNumber("preferedLanguageId")
    : 0;

  const [selectedLanguage, setSelectedLanguage] = useState(
    languageData[identifyPreferedLanguageId]
  );

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };
  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
      setDropdownLeft(_px);
    });

    setVisible(true);
  };

  const onItemPress = (item) => {
    setSelectedLanguage(item);
    preferencesStorage.set("preferedLanguageId", item.id);
    i18n.changeLanguage(`${item.value}`);
    setVisible(false);
  };

  const renderDropdown = () => {
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Icon name={item.flagIcon} />
        <Text style={{ color: theme.textColor }}>{item.lable}</Text>
      </TouchableOpacity>
    );

    if (visible) {
      return (
        <Modal visible={visible} transparent animationType="none">
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}
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
              <FlashList
                data={languageData}
                renderItem={renderItem}
                estimatedItemSize={30}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.backgroundColor }]}
      onPress={toggleDropdown}
      ref={DropdownButton}
    >
      {renderDropdown()}
      <Icon name={selectedLanguage.flagIcon} />
      <Text style={[styles.buttonText, { color: theme.textColor }]}>
        {selectedLanguage.lable}
      </Text>
      <AntDesign name="down" size={24} color={theme.textColor} />
    </TouchableOpacity>
  );
};
//  backgroundColor: "#efefef",
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#efefef",
    width: "25%",
    paddingHorizontal: 10,
    zIndex: 1,
    marginLeft: "auto",
    borderRadius: 25,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "25%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    minHeight: 100,
  },
  overlay: {
    flex: 1,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    // borderBottomWidth: 1,
    flexDirection: "row",
    gap: 10,
  },
});

export default LanguageDropdown;
