import { FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'



const HomePage = () => {

    const [characters, setCharacters] = useState([]);
    const [jokes, setJokes] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData();
    }, [])



    const getData = async () => {
        setLoading(true);
        // Fetch data from the API
        const response = await axios.get(
            `https://rickandmortyapi.com/api/character?page=${page}`
        );
        setCharacters(characters.concat(response.data.results));
        setPage(page + 1);
        setLoading(false);

    };

    const getJokes = async () => {

        try {
            const response = await axios.get("https://icanhazdadjoke.com/search", {
                headers: {
                    Accept: "application/json",
                },
                params: {
                    limit: characters.length,
                },
            });
            setJokes(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (characters.length > 0) {
            getJokes();
        }
    }, [characters]);



    // console.log(typeof (joke) + " length of joke " + joke.length + " length of char " + characters.length)


    return (
        <>
            <StatusBar backgroundColor="white" />
            <View style={styles.container}>
                <FlatList
                    data={characters}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => (

                        <View style={styles.listView}>
                            <Image source={{ uri: item.image }} style={styles.imageView} />
                            <View>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemSpeicies}>{item.species}</Text>
                                <View style={styles.jokeContainer}>
                                    <Text style={styles.itemJoke}>{jokes[index] ? jokes[index].joke : "sorry, I am from  " + item.origin.name + " and I am " + item.status + ". I'll keep it simple...I have no dad joke :P"}</Text>
                                </View>
                            </View>
                        </View>

                    )}
                    onEndReached={getData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading && <Text>Loading.....</Text>}
                />
            </View>
        </>

    )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        // borderColor: "black",
        // borderWidth: 2,
        width: "100%",
        height: "100%",
        padding: 5
    },
    listView: {
        // borderWidth: 2,
        // borderColor: "purple",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: 4,
        padding: 5,
        height: 150,
        borderRadius: 15,
        backgroundColor: "purple",

        // elevation: 6,
    },
    imageView: {
        // borderWidth: 2,
        // borderColor: "green",
        height: "80%",
        width: "30%",
        borderRadius: 80,
        marginRight: 5
    },
    itemName: {
        // borderWidth: 2,
        // borderColor: "blue"
        fontSize: 20,
        color: "white"
    },
    itemSpeicies: {
        // borderWidth: 2,
        // borderColor: "green"
        fontSize: 13,
        fontWeight: '100',
        color: "gray",
        marginBottom: 10
    },

    jokeContainer: {
        // borderWidth: 2,
        width: "84%",
        padding: 5
    },
    itemJoke: {
        // borderWidth: 2,
        // borderColor: "yellow",
        // height: "100%",
        // fontSize: 12,
        color: "white"
    },
})