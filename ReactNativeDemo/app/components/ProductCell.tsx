import React, { FC } from 'react'
import { ProductItem } from '../model/Product';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HighlightText from '@sanar/react-native-highlight-text';
import { useNavigation } from '@react-navigation/native';

type Props = {
  item: ProductItem;
  keyword: string;
}

const ProductCell: FC<Props> = ({
  item,
  keyword,
}) => {

  const navigation = useNavigation()

  return (
    <TouchableOpacity style={styles.container} onPress={() => {
      navigation.navigate('Details', {
        asin: item.asin,
      })
    }}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />
      <View style={styles.content}>
        <HighlightText
          highlightStyle={{ backgroundColor: 'yellow' }}
          searchWords={[keyword]}
          textToHighlight={item.title}
        />
        <Text style={{ color: '#7f7f7f', marginTop: 5 }}>
          {item.helpfulAver} ({item.reviewsTotal} reviews)
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCell

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40
  },
  content: {
    marginLeft: 20,
    flex: 1
  }
})