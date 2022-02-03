import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  PixelRatio,
  StyleSheet
} from "react-native";

export function Grid(props: any) {
  const renderGridItem = (info: any) => {
    const { index } = info;
    const { numColumns, itemMargin, renderItem } = props;
    const { width } = Dimensions.get("window");

    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns
    );

    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;
    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({ ...info, size, marginLeft, marginTop });
  };
  return <FlatList {...props} renderItem={renderGridItem} />;
}

const keyExtractor = ({ uri }: any) => uri;

export function ImageGrid() {
  const [images, setImages] = useState([{ uri: "" }]);

  useEffect(() => {
    setImages([
      { uri: "https://picsum.photos/600/600?image=10" },
      { uri: "https://picsum.photos/600/600?image=20" },
      { uri: "https://picsum.photos/600/600?image=30" },
      { uri: "https://picsum.photos/600/600?image=40" }
    ]);
  }, []);

  const renderItem = ({ item: { uri }, size, marginTop, marginLeft }: any) => {
    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop
    };
    return <Image source={{ uri }} style={style} />;
  };

  return (
    <Grid
      data={images}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    ></Grid>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  }
});
