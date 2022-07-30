import { useContext } from "react";
import { Image, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  PhotoLibrary,
  HomeScreen,
  WeatherScreen,
  Map,
  CalendarScreen
} from "./src/screens";
import ContactScreen from "./src/screens/contact-screen";
import ContactDetailScreen from "./src/screens/contact-detail-screen";
import FlexScreen from "./src/screens/flex-screen";
import { SettingsScreen } from "./src/screens/setting";
import { ProfileScreen } from "./src/screens/profile";
import { Login } from "./src/screens/login-screen";
import { AuthContext, AuthProvider } from "./src/context/auth";
import NavigatorExample from "./src/screens/test";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { CustomScreen } from "./src/screens/customScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={{
        uri: "https://prakashpun22.pythonanywhere.com/media/social/logo.jpg"
      }}
    />
  );
}

type RootStackParamList = {
  PhotoLibrary: undefined;
  ContactScreen: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList, "PhotoLibrary">;

const ContactNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contacts" component={ContactScreen} />
      <Stack.Screen name="Contact Detail" component={ContactDetailScreen} />
    </Stack.Navigator>
  );
};
const ProfileNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profiles"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons
                style={{ fontSize: 30, paddingRight: 5 }}
                name="ios-menu"
                onPress={() => alert("This is a button!")}
                color="black"
              />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="Weather" component={WeatherScreen} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Bottom" component={NavigatorExample} />
      <Stack.Screen name="Bottom-Modal" component={CustomScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <AuthProvider>
      <StatusBar barStyle={"dark-content"} />
      <BottomSheetModalProvider>
        <NavigationContainer>
          {!isAuthenticated ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  if (route.name === "Library") {
                    return (
                      <Ionicons
                        name={focused ? "ios-library" : "ios-library-outline"}
                        size={size}
                        color={color}
                      />
                    );
                  } else if (route.name === "Todos") {
                    return (
                      <Ionicons
                        name={focused ? "ios-today" : "ios-today-outline"}
                        size={size}
                        color={color}
                      />
                    );
                  } else if (route.name === "Contact") {
                    return (
                      <MaterialIcons
                        name={focused ? "contact-page" : "contact-page"}
                        size={size}
                        color={color}
                      />
                    );
                  } else if (route.name === "Profile") {
                    return (
                      <MaterialIcons
                        name="account-circle"
                        size={size}
                        color={color}
                      />
                    );
                  }
                },
                tabBarInactiveTintColor: "gray",
                tabBarActiveTintColor: "tomato"
              })}
            >
              <Tab.Screen name="Library" component={PhotoLibrary} />
              <Tab.Screen name="Todos" component={HomeScreen} />
              <Tab.Screen
                options={{ headerShown: false }}
                name="Contact"
                component={ContactNav}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileNav}
                options={{
                  headerShown: false,
                  title: "Profile",
                  headerRight: () => (
                    <TouchableOpacity>
                      <Ionicons
                        style={{ fontSize: 30, paddingRight: 5 }}
                        name="ios-menu"
                        onPress={() => alert("This is a button!")}
                        color="black"
                      />
                    </TouchableOpacity>
                  )
                }}
              />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={Login}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </BottomSheetModalProvider>
    </AuthProvider>
  );
}
// export default function App() {
//   const [commentModal, setCommentModal] = useState<any>({
//     showModal: false,
//     commentsForItem: {},
//     selectedItemId: null
//   });

//   const openCommentScreen = (id: any) => {
//     setCommentModal({ ...commentModal, showModal: true, selectedItemId: id });
//   };

//   const closeCommentScreen = () => {
//     setCommentModal({
//       ...commentModal,
//       showModal: false,
//       selectedItemId: null
//     });
//   };

//   const onSubmitComment = (text: string) => {
//     const comments =
//       commentModal.commentForItem[commentModal.selectedItemId] || [];
//     const updated = {
//       ...commentModal.commentsForItem,
//       [commentModal.selectedItemId]: [...comments, text]
//     };
//     setCommentModal({ ...commentModal, commentForItem: updated });
//   };

//   return (
//     <View>
//       {Platform.OS === "ios" ? (
//         <>
//           <InstaScreen
//             style={styles.insta}
//             commentsForItem={commentModal.commentsForItem}
//             onPressComments={openCommentScreen}
//           />
//           <Modal
//             visible={commentModal.showModal}
//             animationType="slide"
//             onRequestClose={closeCommentScreen}
//           >
//             <Comments
//               style={styles.container}
//               comments={
//                 commentModal.commentsForItem[commentModal.selectedItemId] || []
//               }
//               onClose={closeCommentScreen}
//               onSubmitComment={onSubmitComment}
//             />
//           </Modal>
//         </>
//       ) : (
//         <MessageScreen />
//       )}
//     </View>
//   );
// }

// const platformVersion =
//   Platform.OS === "ios" ? parseInt(Platform.Version, 10) : Platform.Version;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff"
//   },
//   insta: {
//     flex: 1,
//     marginTop:
//       Platform.OS === "android" || platformVersion < 11
//         ? Constants.statusBarHeight
//         : 0
//   },
//   comments: {
//     flex: 1,
//     marginTop:
//       Platform.OS === "ios" && platformVersion < 11
//         ? Constants.statusBarHeight
//         : 0
//   }
// });

// {
//   font-family: canada-type-gibson,helvetica neue,Helvetica,Arial,sans-serif;
// }
