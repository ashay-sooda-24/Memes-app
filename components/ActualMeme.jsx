import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ActualMeme = () => {
    const [meme, setMeme] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchMeme();
    }, [])

    const fetchMeme = () => {
        setLoading(true)
        axios.get('https://meme-api.com/gimme/50').then(response => {
            setMeme(response.data.memes)
            setRefreshing(false)
        }).catch(error => {
            console.error(error);
            setRefreshing(false)
        })
        setLoading(false)
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchMeme();
    }

    return (
        <View style={{ padding: 5 }}>
            <FlatList
                data={meme}
                keyExtractor={(item) => item.postLink}
                renderItem={({ item }) => (
                    <View style={styles.listContainer}>
                        <Text style={styles.singleMemeTxt}>Author: {item.author}</Text>
                        <View style={styles.imgContainer}>
                            <Image style={styles.singleMemeImg} source={{ uri: item.url }} />
                        </View>

                    </View>
                )}
                onEndReached={fetchMeme}
                onEndReachedThreshold={0.2}
                ListFooterComponent={loading && <Text>Loading.....</Text>}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    )
}

export default ActualMeme

const styles = StyleSheet.create({
    listContainer: {
        // borderWidth: 2,
        marginBottom: "8%",
        backgroundColor: "purple",
        borderRadius: 20,
        padding: 15
    },
    singleMemeTxt: {
        color: "white",
        marginBottom: "2%"
    },
    imgContainer: {
        height: 400,
        width: "100%",
    },
    singleMemeImg: {
        height: "100%",
        width: "100%",
        resizeMode: "contain"
    }
})