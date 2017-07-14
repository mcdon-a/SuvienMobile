import React, { Component } from 'react';
import MusicPlayerController from 'react-native-musicplayercontroller';
import { View, AsyncStorage, Image, Text, ScrollView, TouchableWithoutFeedback, Modal, Dimensions } from 'react-native';
import { CardSection, Button, Input, Header } from './common';
import Languages from '../Languages/Languages.json';
import { Actions } from 'react-native-router-flux';

class AddAudioAnd extends Component {
    state = { title: null, artist: null, album: null, uri: null, caption: null, group: null, acheivement: null, languages: null, isNull: false, widthc: null, heightc: null, color: null }
    //console.log(JSON.parse(await AsyncStorage.getItem('samplemusic')));
//WARNING! Make sure to fix the unique id problem!! you need to add a check for presets
    async componentWillMount() {
        this.setState({ acheivement: await AsyncStorage.getItem('Acheivement'), languages: await AsyncStorage.getItem('Language'), color: await AsyncStorage.getItem('BGColour'), widthc: Dimensions.get('window').width, heightc: Dimensions.get('window').height });
    }
    async onSaveItemPress() {
        if (this.state.uri === null || this.state.caption === null || this.state.group === null || this.state.uri === '' || this.state.caption === '' || this.state.group === '') {
            this.setState({ isNull: true });
        } else {
            const { title, caption, group, artist, album, uri } = this.state;
            const audios = JSON.parse(await AsyncStorage.getItem('Audio'));
            const objec = JSON.parse(await AsyncStorage.getItem('uniqueID'));
            const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
            const gen = JSON.parse(await AsyncStorage.getItem('Media'));
            audios.push({
                uri,
                title,
                album,
                artist,
                caption,
                group,
                isFavourite: false,
                mediaType: 'MusicAnd'
            });
            gen.push({
                uniqueID: objec.uniqueID,
                uri,
                title,
                album,
                artist,
                caption,
                group,
                isFavourite: false,
                mediaType: 'MusicAnd'
            });
            const findTags = mytags.find((tag) => tag === this.state.group);
            if (findTags === undefined) {
                mytags.push(this.state.group);
                AsyncStorage.setItem('Tags', JSON.stringify(mytags));
            }
            AsyncStorage.setItem('Media', JSON.stringify(gen));
            AsyncStorage.setItem('Audio', JSON.stringify(audios));
            console.log(await AsyncStorage.getItem('Audio'));
            Actions.Home();
        }
    }

    async createNew() {
        if (this.state.uri === null || this.state.caption === null || this.state.group === null || this.state.uri === '' || this.state.caption === '' || this.state.group === '') {
            this.setState({ isNull: true });
        } else {
            const { title, caption, group, artist, album, uri } = this.state;
            const audios = JSON.parse(await AsyncStorage.getItem('Audio'));
            const objec = JSON.parse(await AsyncStorage.getItem('uniqueID'));
            const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
            const gen = JSON.parse(await AsyncStorage.getItem('Media'));
            audios.push({
                uri,
                title,
                album,
                artist,
                caption,
                group,
                isFavourite: false,
                mediaType: 'MusicAnd'
            });
            gen.push({
                uniqueID: objec.uniqueID,
                uri,
                title,
                album,
                artist,
                caption,
                group,
                isFavourite: false,
                mediaType: 'MusicAnd'
            });
            const findTags = mytags.find((tag) => tag === this.state.group);
            if (findTags === undefined) {
                mytags.push(this.state.group);
                AsyncStorage.setItem('Tags', JSON.stringify(mytags));
            }
            AsyncStorage.setItem('Media', JSON.stringify(gen));
            AsyncStorage.setItem('Audio', JSON.stringify(audios));
            console.log(await AsyncStorage.getItem('Audio'));
            this.setState({ title: null, artist: null, album: null, uri: null, caption: null, group: null });
        }
    }
    
    onAudioSelect() {
        if (this.state.languages === null) {
            return (
                <View />
            );
        }
        if (this.state.languages !== null) {
            if (this.state.title === null || this.state.album === null || this.state.artist === null) {
                return (
                    <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                        <View>
                        <CardSection style={{ borderBottomWidth: 0 }}>
                            <Image source={{ uri: Languages[this.state.languages]['066'] }} style={{ height: 300, width: 300 }} />
                        </CardSection>
                        </View>
                        <View style={{ width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                            <View style={{ flexDirection: 'row', width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                            <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                <Button onPress={this.onChooseMusicPress.bind(this)}>
                                    {Languages[this.state.languages]['055']}
                                    <Image source={require('../Images/choosefromlibrary.png')} style={{ height: 40, width: 40 }} />
                                </Button>
                            </CardSection>
                            </View>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                            <Input
                            placeholder={Languages[this.state.languages]['062']}
                            label={Languages[this.state.languages]['059']}
                            value={this.state.caption}
                            onChangeText={(caption) => this.setState({ caption })}
                            />
                        </CardSection>
                        <CardSection style={{ width: (this.state.widthc - 380) }}>
                            <Input
                            placeholder={Languages[this.state.languages]['063']}
                            label={Languages[this.state.languages]['060']}
                            value={this.state.group}
                            onChangeText={(group) => this.setState({ group })}
                            ref='username'
                            />
                        </CardSection>
                            <CardSection style={{ borderTopWidth: 1 }}>
                            <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>{Languages[this.state.languages]['058']}</Text>
                                <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{(Languages[this.state.languages]['094'])[3]}</Text>
                            </View>
                        </CardSection>
                        <CardSection style={{ borderTopWidth: 1 }}>
                            <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>{Languages[this.state.languages]['051']}</Text>
                                <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{(Languages[this.state.languages]['094'])[3]}</Text>
                            </View>
                        </CardSection>
                        <CardSection style={{ borderTopWidth: 1 }}>
                            <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>{Languages[this.state.languages]['052']}</Text>
                                <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{(Languages[this.state.languages]['094'])[3]}</Text>
                            </View>
                        </CardSection>
                        </View>
                    </View>
                );
        }
        if (this.state.title !== null && this.state.album !== null && this.state.artist !== null) {
            return (
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                    <View>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={require('../Images/musicalbumart.png')} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    </View>
                    <View style={{ width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                        <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                            <Button onPress={this.onChooseMusicPress.bind(this)}>
                                {Languages[this.state.languages]['055']}
                                <Image source={require('../Images/choosefromlibrary.png')} style={{ height: 40, width: 40 }} />
                            </Button>
                        </CardSection>
                        </View>
                        <CardSection style={{ width: (this.state.widthc - 380) }}>
                        <Input
                        placeholder={Languages[this.state.languages]['062']}
                        label={Languages[this.state.languages]['059']}
                        value={this.state.caption}
                        onChangeText={(caption) => this.setState({ caption })}
                        />
                    </CardSection>
                    <CardSection style={{ width: (this.state.widthc - 380) }}>
                        <Input
                        placeholder={Languages[this.state.languages]['063']}
                        label={Languages[this.state.languages]['060']}
                        value={this.state.group}
                        onChangeText={(group) => this.setState({ group })}
                        ref='username'
                        />
                    </CardSection>
                        <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>{Languages[this.state.languages]['058']}</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.title}</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>{Languages[this.state.languages]['051']}</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.album}</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>{Languages[this.state.languages]['052']}</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.artist}</Text>
                        </View>
                    </CardSection>
                    </View>
                </View>
            );
        }
        }
    }

    async onChooseMusicPress() {
    MusicPlayerController.presentPicker(false, (metadata) => {
        //console.log(metadata[0].uri);
        //this.setState({ audiopath: metadata[0].uri });
        console.log(metadata[0]);
        this.setState({ title: metadata[0].title, artist: metadata[0].artist, album: metadata[0].album, uri: metadata[0].uri });
    }, () => {
        console.log('Cancel');
    });
    }
    
    render() {
        if (this.state.languages === null) {
            return (
                <View />
            );
        }
        if (this.state.languages !== null) {
            if (this.state.acheivement === null || this.state.acheivement === 'INCOM') {
                return (
                    <View style={{ flex: 1 }}>
                        <Modal
                        animationType={"fade"}
                        transparent
                        visible={this.state.isNull}
                        onRequestClose={() => {}}
        >
                    <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 600, width: 800, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light' }}>{Languages[this.state.languages]['111']}</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 5 }}>{Languages[this.state.languages]['112']}</Text>
                            <CardSection style={{ borderBottomWidth: 0, marginRight: 15 }}>
                                <Button 
                                onPress={() => {
                                this.setState({ isNull: false });
                                }}
                                >
                            {Languages[this.state.languages]['113']}
                                </Button>
                            </CardSection>
                        </View>
                        </View>
                        </Modal>
                        <Header style={{ height: 60, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['086']}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                            <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </Header>
                            {this.onAudioSelect()}
                            <View>
                    <CardSection>
                    <Button onPress={this.onSaveItemPress.bind(this)}>
                        {Languages[this.state.languages]['067']}
                        <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                    </Button>
                    </CardSection>
                    <CardSection>
                    <Button onPress={() => Actions.Settings()}>
                        {Languages[this.state.languages]['069']}
                    </Button>
                    </CardSection>
                </View>
                    </View>
                );
            }
            if (this.state.acheivement !== null && this.state.acheivement !== 'INCOM') {
                return (
                    <View style={{ flex: 1 }}>
                        <Modal
                        animationType={"fade"}
                        transparent
                        visible={this.state.isNull}
                        onRequestClose={() => {}}
        >
                    <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 600, width: 800, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light' }}>{Languages[this.state.languages]['111']}</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 5 }}>{Languages[this.state.languages]['112']}</Text>
                            <CardSection style={{ borderBottomWidth: 0, marginRight: 15 }}>
                                <Button 
                                onPress={() => {
                                this.setState({ isNull: false });
                                }}
                                >
                            {Languages[this.state.languages]['113']}
                                </Button>
                            </CardSection>
                        </View>
                        </View>
                        </Modal>
                        <Header style={{ height: 60, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['086']}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                            <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </Header>
                            {this.onAudioSelect()}
                            <View>
                    <CardSection>
                    <Button onPress={this.onSaveItemPress.bind(this)}>
                        {Languages[this.state.languages]['067']}
                        <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                    </Button>
                    </CardSection>
                    <CardSection>
                    <Button onPress={this.createNew.bind(this)}>
                        {Languages[this.state.languages]['068']}
                        <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                    </Button>
                    </CardSection>
                    <CardSection>
                    <Button onPress={() => Actions.Settings()}>
                        {Languages[this.state.languages]['069']}
                    </Button>
                    </CardSection>
                </View>
                    </View>
                );
            }
        }
    }
}

export { AddAudioAnd };
