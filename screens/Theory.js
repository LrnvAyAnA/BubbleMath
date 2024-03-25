import React, { useEffect, useContext, useState } from 'react';
import { Text, View,StyleSheet, FlatList } from 'react-native';
import Search from '../components/SearchComponent';
import SearchIcon from '../assets/images/search'
import { changeClass } from '../context/ClassContext';
import { Error, HEADER_HEIGHT, statusBarH } from '../constants';
import SectionComponent from '../components/theoryTab/SectionComponent';
import LessonComponent from '../components/theoryTab/LessonComponent';
import { getAllLesson, getFromLesson } from '../firebaseQueries';
import { useNavigation } from '@react-navigation/native';


export default function Theory(){
  const {classPath} = changeClass();
  const [dataTheory,setDataTheory] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();
  const [error, catchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllLesson({ classPath });
        // console.log(allData);
        setDataTheory(allData);
        setFilteredData(allData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[classPath]);

const renderTheory=({item})=>{
  const goToAllTheory = async () => {
    try {
      const theoryData = await getFromLesson({classPath:classPath,lesson:item,type:'Theory'});
      if(theoryData.length>0){
        console.log('Theory data',theoryData);
        catchError(false);
        navigation.navigate('AllTheoryTemp', { theoryData });
      }
      else {
        catchError('Извините, пока не сделали =(');
      }
    } catch (error) {
      console.error('Error getting theory data:', error);
    }
  };

 if(item.type==='section'){
  return(
    <SectionComponent numberSection={item.numberSection} name={item.name}/>
    );
 }
 else{
  return(
    <LessonComponent numberLesson={item.lessonNumber} text={item.title} onPress={goToAllTheory}/>
  );
 }
};
const closeError = () =>{
  catchError(null);
};
const handleSearch = (text) => {
  const newData = dataTheory.filter((item) => {
    if (item.type === 'lesson') {
      return item.title.toLowerCase().includes(text.toLowerCase());
    }
    else {
      return item.name.toLowerCase().includes(text.toLowerCase());
    }
  });
  setFilteredData(newData);
};
return(
  <View style={styles.background}>
    <View style={styles.topPanel}>
      <View style={{height:statusBarH,width:'100%'}}/>
      <View style={styles.elements}>
        <Text style={styles.topPanelText}>Темы</Text>
        <Search widthBar={230} onSearch={handleSearch}/>
      </View>
    </View>
    <FlatList data={filteredData} showsVerticalScrollIndicator={false} contentContainerStyle={styles.flatList}  keyExtractor={(item)=>item.id} renderItem={renderTheory}/>  
    {error && <Error error={error} onClose={closeError}/>}   
</View>
)
}
const styles = StyleSheet.create({
  flatList:{
    paddingBottom:10,
    paddingTop:144,
    paddingHorizontal:24,
  },
background:{
    backgroundColor:'#F5F3FD',
    flex:1,
},
topPanel:{
  alignItems:'center',
  flexDirection:'column',
  backgroundColor:'#6A54E9',
  width:'100%',
  height:HEADER_HEIGHT,
  position:'absolute',
  zIndex:1,
},
elements:{
 paddingHorizontal:24,
 flexDirection:'row',
 justifyContent:'space-between',
 width:'100%',
 flex:1,
 alignItems:'center',
},
topPanelText:{
  fontFamily:'Nunito-ExtraBold',
  fontSize:22,
  color:'#fff',
},
})