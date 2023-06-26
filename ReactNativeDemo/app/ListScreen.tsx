import React, { useEffect, useMemo, useState } from 'react'
import { FlatList, StyleSheet, TextInput, View } from 'react-native'
import { ProductItem } from './model/Product'
import ProductCell from './components/ProductCell'

const ListScreen = () => {

  const [products, setProducts] = useState<ProductItem[]>()
  const [keyword, setKeyword] = useState("")

  const loadProducts = () => {
    fetch('http://localhost:3000/products')
      .then(resp => resp.json())
      .then(response => {
        setProducts(response)
      })
  }

  const filteredProducts = useMemo(() => {
    if (keyword === "") {
      return products
    } else {
      return products?.filter(product => product.title.toLowerCase().includes(keyword.toLowerCase()))
    }
  }, [products, keyword])

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.keyword}
        placeholder='Search title...'
        value={keyword}
        onChangeText={setKeyword}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({item, index}) => <ProductCell item={item} keyword={keyword} />}
        keyExtractor={(item, index) => item.asin}
      />
    </View>
  )
}

export default ListScreen

const styles = StyleSheet.create({
  keyword: {
    height: 36,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    paddingHorizontal: 20,
  }
})