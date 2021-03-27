import React from 'react'
import { View,Dimensions,StyleSheet,ScrollView,RefreshControl} from "react-native";

import axios from 'axios'
navigator.geolocation = require('@react-native-community/geolocation');
import CurrentWeather from '../components/CurrentWeather';

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height;

export default class HomePage extends React.Component{
    static navigationOptions = {
        title:'Trang Chủ',
        headerStyle: {
            backgroundColor: '#2ecc71',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
          current:[],
          location:{coords:{latitude:'',longitude:''}},
          uv:null
        }
    }

    getUvData(pos){
        axios({
            "method":"GET",
            "url":"https://api.openuv.io/api/v1/uv",
            "headers":{
            'content-type': 'application/json',
            'x-access-token': '6abf8c1ab048d0cb001e2b3fc3a7d71c'
            },"params":{
                "lat": `${pos.coords.latitude}`, "lng": `${pos.coords.longitude}`
            }
        })
        .then(res=>{
            this.setState({
                uv:res.data.result.uv
            })
        })
        .catch(err=>{
            this.setState({
                uv:err
            })
        })
    }

    getWeatherData(pos){
        var currentUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=391528de4ad7f3ad43c7964a2bf118bd`
        
        axios.get(currentUrl)
        .then(res=>{
            this.setState({
            current:[res.data]
            })
        })
        .catch(err=>{
            this.setState({
            current:['error']
            })
        })
    }
    
    componentDidMount() {

        navigator.geolocation.getCurrentPosition(pos=>{
            this.setState({
                location:{coords:{latitude:pos.coords.latitude,longitude:pos.coords.longitude}}
            })
            this.getUvData(pos)
            this.getWeatherData(pos)
        })
    }

    render(){
        const { current,uv,location} = this.state
        let a = false
        return(
            <View style={styles.container}>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={a} onRefresh={()=>{
                        this.getWeatherData(location)
                        this.getUvData(location)
                        a=true
                    }}/>
                }>
                    {
                        current.map((item,index)=><CurrentWeather key={index} data={item} uvi={uv}/>)
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'#2ecc71'
    }
})