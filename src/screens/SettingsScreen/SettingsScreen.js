import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Button,
  Divider,
  Avatar,
  Text,
  Portal,
  Dialog,
} from "react-native-paper";
import { signout } from "../../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";

export default function SettingsScreen({ navigation }) {
  const username = useSelector((state) => state.auth.username);
  const emailId = useSelector((state) => state.auth.emailId);
  async function handleSignout() {
    // const resp = await signout();
    await AsyncStorage.removeItem("token");
  }
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  function handleDialogYes() {}
  return (
    <View
      style={{
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 10,
        }}
      >
        <View>
          <Avatar.Text label={username?.split("")[0] || ":)"} />
        </View>
        <View>
          <Text style={{ marginLeft: 20 }} variant="titleMedium">
            {username}
          </Text>
          <Text style={{ marginLeft: 20, marginTop: 10 }} variant="titleSmall">
            {emailId}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Divider />
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("ManageCategories")}
        >
          <Text variant="titleSmall">All categories</Text>
          <Text variant="titleSmall">
            <Icon name="arrowright" size={20} />
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("ManageCurrency")}
        >
          <Text variant="titleSmall">Manage currency symbols</Text>
          <Text variant="titleSmall">
            <Icon name="arrowright" size={20} />
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-between",
          }}
          onPress={showDialog}
        >
          <Text variant="titleSmall">Reset report</Text>
          <Text variant="titleSmall">
            <Icon name="arrowright" size={20} />
          </Text>
        </TouchableOpacity>
        <DialogAlert
          visible={visible}
          hideDialog={hideDialog}
          handleDialogYes={handleDialogYes}
        />
        <Divider />
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-between",
          }}
          onPress={handleSignout}
        >
          <Text variant="titleSmall">Logout</Text>
          <Text variant="titleSmall">
            <Icon name="arrowright" size={20} />
          </Text>
        </TouchableOpacity>
        <Divider />
      </View>
    </View>
  );
}

function DialogAlert({ visible, hideDialog, handleDialogYes }) {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Do you want to reset the report section?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDialogYes}>Yes</Button>
            <Button onPress={hideDialog}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
