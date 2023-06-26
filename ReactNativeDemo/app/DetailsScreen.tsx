import React, { FC, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { Product } from './model/Product'

type Props = {
  route: {
    params: {
      asin: string
    }
  }
}

const DetailsScreen: FC<Props> = ({
  route
}) => {

  const { asin } = route.params

  const [product, setProduct] = useState<Product>()
  
  const loadProduct = (asin: string) => {
    fetch(`http://localhost:3000/products/${asin}`)
      .then(resp => resp.json())
      .then(response => {
        console.log(response)
        setProduct(response)
      })
  }

  useEffect(() => {
    loadProduct(asin)
  }, [asin])

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={(
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{ uri: product?.image }}
              style={styles.productImage}
            />
            <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>
              {product?.title}
            </Text>
          </View>
        )}
        data={product?.reviews}
        renderItem={({item}) => (
          <View style={styles.reviewCellContainer}>
            <Text style={{ fontWeight: 'bold' }}>
              {item.helpful}
            </Text>
            <Text style={{ marginLeft: 10, flex: 1 }}>
              {item.sentence}
            </Text>
          </View>
        )}
      />
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  productImage: {
    width: 120,
    height: 120,
  },
  reviewCellContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
  }
})