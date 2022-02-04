import { useState } from "react";
import { Modal, Platform, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { MessageScreen, PhotoLibrary } from "./src/screens";
import ContactScreen from "./src/screens/contact-screen";
import ContactDetailScreen from "./src/screens/contact-detail-screen";
import FlexScreen from "./src/screens/flex-screen";

export default function App() {
  return <PhotoLibrary />;
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
