import React from 'react'
import {View,StyleSheet,Text,ScrollView,Image} from 'react-native'
import {Grid,Col, Row} from 'native-base'
import moment from 'moment'

import thermometer from '../assets/thermometer.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'

export default class HeaderTitle extends React.Component{
    constructor(props){
        super(props)
        this.state=({
            dataWeather:[]
        })
    }
    componentDidMount(){
        const {data}=this.props
        var arr = []
        data.map(item=>{
            var date = new Date(item.dt*1000)
            if(date.getHours()==10){
                arr.push(item)
            }
        })
        this.setState({
            dataWeather:arr
        })
    }

    render(){
        const {dataWeather} = this.state
        return(

                <ScrollView style={{width:400}} contentContainerStyle={{alignItems:'center',paddingBottom:20}}>
                    <Text style={styles.header}>Dự báo 5 ngày tới</Text>
                    {
                        dataWeather.map((item,index)=><View key={index} style={styles.child}>

                            <Grid style={{alignItems:'center',paddingBottom:25}}>
                                <Row>
                                    <Text style={{paddingLeft:10,fontSize:16}}>{moment(item.dt*1000).format("dddd hh:mm A")}</Text>
                                </Row>
                                <Row style={{alignItems:'center'}}>
                                    {
                                        item.weather.map((icon,idx)=><Image key={idx} style={{width:50,height:50}} source={{uri:`https://openweathermap.org/img/wn/${icon.icon}@2x.png`}}/>)
                                    }
                                </Row>
                            </Grid>

                            <Grid >
                                <Col style={{alignItems:'center'}}>
                                    <Row>
                                        <Image style={styles.img} source={thermometer}/>
                                        <Text style={styles.textContent}>{`   ${item.main.temp}°C`}</Text>
                                    </Row>
                                </Col>   
                                <Col style={{alignItems:'center'}}>
                                    <Row>
                                        <Image style={styles.img} source={humidity}/>
                                        <Text style={styles.textContent}>{`   ${item.main.humidity}%`}</Text>
                                    </Row>
                                </Col>
                            </Grid>
        
                        </View>)
                    }
                </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    child:{
        marginTop:20,
        width:350,
        height:150,
        borderRadius:10,
        elevation:10,
        backgroundColor:'#fff'
    },
    img:{
        width:32,
        height:32,
    },
    header:{
        paddingTop:10,
        fontSize:30,
        textAlign:'center'
    },
    textContent:{
        fontSize:20
    }
})