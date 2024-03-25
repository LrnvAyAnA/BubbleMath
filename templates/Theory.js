import React, { useEffect, useState } from 'react';
import CloseIcon from '../assets/images/closeIcon'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ButContinue from '../assets/images/ButtonContinue';
import { SvgUri } from 'react-native-svg';
import ProgressBar from '../components/ProgressBar';
import {Error, statusBarH} from '../constants'
import { getFromLesson } from '../firebaseQueries';



const Theory = ({route}) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { theoryData, item , classPath} = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage,setLastPage] = useState(false);
  const curData = theoryData.find(item => item.numberPage == String(currentPage));
  const [error, catchError] = useState(null);

  const Close = () => {
    setLoading(false);
    setLastPage(false);
    setCurrentPage(1);
    navigation.goBack();
  };
  const closeError = () =>{
    catchError(null);
  };
  const goToNextPage = () => {
    setLoading(false);
    if(currentPage+1==theoryData.length){
      setLastPage(true);
    }
    setCurrentPage(prevPage => prevPage + 1); 
    navigation.navigate('TheoryTemp', { theoryData, numberPage: currentPage + 1, item, classPath });
  };
  const goToPractice = async () =>{    
    try {
      const practiceData = await getFromLesson({classPath:classPath,lesson:item,type:'Practice'})
      if(practiceData.length>0){
        catchError(false);
        navigation.navigate('PracticeTemp', {practiceData, item,classPath});        
      }
      else {
        catchError('Извините, пока не сделали =(');
      }
    } catch (error) {
      console.error('Error getting theory data:', error);
    }
  };
  return (
    <View style={styles.page}>
      <TouchableOpacity style={styles.closeBut} onPress={Close}>
        <CloseIcon/>
      </TouchableOpacity>
        <Text style={styles.headerText}>ТЕОРИЯ</Text>
        <View style={styles.progressBar}>
          <ProgressBar curProgress={currentPage} num={theoryData.length-1}/>
        </View>
        <View style={styles.contentContainer}>

        <View style={styles.content}>
          <Text style={styles.textContent}>{curData.text}</Text>
        </View>   
        <View style={styles.imageContainer}>
          <SvgUri
          uri={curData.image}
          onLoad={() => setLoading(true)}
          />
        </View>  
        </View>
        <View style={styles.butContainer}>
        {lastPage?
        <TouchableOpacity style={styles.butContinue} onPress={goToPractice}>
          <Text style={styles.textBut}>К практике</Text>
        <ButContinue width={320} height={87}/>
      </TouchableOpacity>
         :<TouchableOpacity style={styles.butContinue} onPress={goToNextPage}>
          <Text style={styles.textBut}>Продолжить</Text>
          <ButContinue width={320} height={87}/>
        </TouchableOpacity>}
        </View>
        {error && <Error error={error} onClose={closeError}/>}
    </View>

  );
};
const styles = StyleSheet.create({
  // skeleton:{
  //   flex:1,
  //   backgroundColor:'gray'
  // },
  progressBar:{
    width:'100%',
    height:30,
    top:50,
    justifyContent:'center',
    alignItems:'center',
  },
  page:{
    top:statusBarH,
    flex:1,
    backgroundColor:'#fff',
  },
  headerContainer:{
    paddingLeft:24,
    alignItems:'center',
    width:'100%',
    top:24,
    flexDirection:'row',
  },
  closeBut:{
    justifyContent:'center',
    position:'absolute',
    left:24,
    top:24,
    zIndex:1,
    width:30,
    height:30,
  },
  headerTextCont:{
    flex:1,
    alignItems:'center',
  },
  headerText:{  
    top:24,
    textAlign:'center',
    fontSize: 22,
    color:'#6A54E9',
  },
  butContainer:{
    width:"100%", 
    position:'absolute', 
    alignItems:'center',
    justifyContent:'center',
    bottom:110
  },
  butContinue:{
    alignItems:'center', 
  },
  textBut:{
    position:'absolute',
    zIndex:1,
    bottom:35,
    color:'#fff',
    fontSize:22,
    fontFamily:'Nunito-ExtraBold'
  },
  contentContainer:{
    flexDirection:'column',
    top: 80,
    flex:1,
    marginBottom:350,
  },
  content:{
    marginHorizontal:17,
    alignSelf: 'flex-start',
    marginBottom:20,
  },
  textContent:{
    fontSize:24,
    fontFamily:'Nunito-Bold',
    textAlign:'center',
  },
  imageContainer:{
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    flex:1,
  },
  modalView: {
    flex:1,
    borderRadius: 20,
  },
})
export default Theory;