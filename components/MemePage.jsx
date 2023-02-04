import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MemePage = () => {

    const [memes, setMemes] = useState([]);

    useEffect(() => {
        axios.get('https://api.imgflip.com/get_memes')
            .then(response => {
                setMemes(response.data.data.memes);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={memes}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                    <View style={{ padding: 16, backgroundColor: '#f9f9f9' }}>
                        <Text>{item.name}</Text>
                        <View style={styles.imgList}>
                            <Image style={styles.memeImage} source={{ uri: item.url }} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

export default MemePage

const styles = StyleSheet.create({
    imgList: {
        // borderWidth: 2,
        // borderColor: "red",
        height: 300,
        width: "100%"
    },
    memeImage: {
        height: "100%",
        width: "100%"
    }
})