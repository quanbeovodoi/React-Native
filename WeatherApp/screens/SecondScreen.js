import React from 'react'
import { View,StyleSheet,Dimensions } from "react-native";
import axios from 'axios'
import DayliForecast from '../components/DayliForecast';
var width = Dimensions.get('window').width
var height = Dimensions.get('window').height;
export default class SecondScreen extends React.Component{
    static navigationOptions = {
      title:'Dự Báo',
      headerStyle: {
        backgroundColor: '#2ecc71',
      }
    }
    
    constructor(props) {
        super(props)
        this.state = {
          dayli:[]
        }
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition(pos=>{
          var dayliUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=391528de4ad7f3ad43c7964a2bf118bd`
    
          axios.get(dayliUrl)
          .then(res=>{
            this.setState({
              dayli:[res.data.list]
            })
          })
          .catch(err=>{
            this.setState({
              dayli:['error']
            })
          })
    
        })
    
    }

    render(){
        const {dayli} = this.state
        return(
            <View>
                <View style={styles.container}>
                    {
                        dayli.map((item,index)=><DayliForecast key={index} data={item}/>)
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  container:{
      justifyContent:'center',
      alignItems:'center',
      width:width,
      height:height-130,
      backgroundColor:'#2ecc71'
  }
})