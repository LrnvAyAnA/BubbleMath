import React, { useEffect, useState } from 'react';
import CloseIcon from '../assets/images/closeIcon'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import ButContinue from '../assets/images/ButtonContinue'
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
const statusBar = StatusBar.currentHeight;
import { FirebaseApp } from '../firebase';
const Theory = ({route}) => {
  const storage = getStorage(FirebaseApp);
  const navigation = useNavigation();
  const { theoryData } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [imageURL, setImageURL] = useState(null);
  const curData = theoryData.find(item => item.numberPage == currentPage);

  // useEffect(() => {
  //   if (curData && curData.image) {
  //     const fileRef = ref(storage, curData.image);
  //     getDownloadURL(fileRef)
  //       .then(url => setImageURL(url))
  //       .catch(error => console.error('Error getting download URL:', error));
  //   }
  // }, [currentPage, theoryData, storage]);

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1); 
    navigation.navigate('TheoryTemp', { theoryData, numberPage: currentPage + 1 });
  };
  return (
    <View style={styles.page}>
      <TouchableOpacity style={styles.closeBut} onPress={()=>navigation.goBack()}>
        <CloseIcon/>
      </TouchableOpacity>
        <Text style={styles.headerText}>ТЕОРИЯ</Text>
        <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.textContent}>{curData.text}</Text>
        </View>
        <View style={styles.imageContainer}>
        <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/bubblemath-9dff8.appspot.com/o/1img.jpg?alt=media&token=18ad8744-43af-4c34-bd7c-4a5609321e7c" }} style={{width:358, height:358}}/>
        </View>
        
        </View>
        <View style={styles.butContainer}>
        <TouchableOpacity style={styles.butContinue} onPress={goToNextPage}>
          <Text style={styles.textBut}>Продолжить</Text>
          <ButContinue width={320} height={87}/>
        </TouchableOpacity>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  page:{
    top:statusBar,
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
    top: 128,
    flex:1,
    marginBottom:350,
  },
  content:{
    marginHorizontal:17,
    backgroundColor:'red',
    alignSelf: 'flex-start', 
  },
  textContent:{
    fontSize:24,
    fontFamily:'Nunito-Medium',
    textAlign:'center',
  },
  imageContainer:{
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    flex:1,
  },
})
export default Theory;