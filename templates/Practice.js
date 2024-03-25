import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProgressBar from '../components/ProgressBar';
import CloseIcon from '../assets/images/closeIcon'
import { useNavigation } from '@react-navigation/native';
import { statusBarH } from '../constants';
import ButContinue from '../assets/images/ButtonContinue';
import Img from '../assets/images/1img';
import CorrectIcon from '../assets/images/correct'
import TheoryIconOff from "./assets/images/TheoryIconOff.svg"

const Practice = ({route}) => {
  const {practiceData,item, classPath} = route.params;
  const [currentPage, setCurrentPage] = useState (1);
  const [lastPage,setLastPage] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [options, setOptions] = useState([]);
  const [answer,setAnswer] = useState(null);
  const navigation = useNavigation();
  const curData = practiceData.find(item => item.numberPage == String(currentPage));

  const [selectedOption, setSelectedOption] = useState(null);

  const handlePress = (option) => {
    setSelectedOption(option);
  };

  const optionStyle = (option) => {
    return {
      width: 150,
      height: 137,
      borderColor: selectedOption === option ? '#866AF6' : '#E7E2FB',
      borderWidth: 3,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center'
    };
  };
  useEffect(()=>{
    setOptions(curData.options);
    setAnswer(curData.answer);
  },[curData]);

  const checkData = () =>{
    console.log(curData.options.length);
  };
  const Close = () => {
    setLastPage(false);
    setCurrentPage(1);
    navigation.goBack();
  };
  const goToNextPage = () => {
    setLoading(false);
    if(currentPage+1==practiceData.length){
      setLastPage(true);
    }
    setCurrentPage(prevPage => prevPage + 1); 
    navigation.navigate('PracticeTemp', { practiceData, numberPage: currentPage + 1, item, classPath });
  };
  return (
<View style={styles.page}>
      <TouchableOpacity style={styles.closeBut} onPress={Close}>
        <CloseIcon/>
      </TouchableOpacity>
        <Text style={styles.headerText}>ПРАКТИКА</Text>
        <View style={styles.progressBar}>
          <ProgressBar curProgress={currentPage} num={practiceData.length}/>
        </View>
        <View style={styles.contentContainer}>

        <View style={styles.content}>
          <Text style={styles.textContent}>Посмотри на эти фигуры. Сравни их форму и выбери лишнюю.</Text>
          <Text style={styles.addText}>(Укажи изображение нужного предмета)</Text>
        </View>
        {/* {options.length === 4 ?  */}
        <View style={{flexDirection:'column', width:'100%', justifyContent:'space-between', paddingHorizontal:24}}>
          <View style={{flexDirection:'row', marginBottom:10, justifyContent:'space-between'}}>
              <TouchableOpacity style={optionStyle(1)}
              onPress={() => handlePress(1)}>
              <Img/>
            </TouchableOpacity> 
            <TouchableOpacity style={optionStyle(2)}
            onPress={() => handlePress(2)}>
              <Img/>
            </TouchableOpacity> 
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <TouchableOpacity style={optionStyle(3)}
            onPress={() => handlePress(3)}>
              <Img/>
            </TouchableOpacity>
            <TouchableOpacity style={optionStyle(4)}
            onPress={() => handlePress(4)}>
              <Img/>
            </TouchableOpacity>        
          </View>
        </View>  
        </View>

        <View style={styles.butContainer}>
        {lastPage?
        <TouchableOpacity style={styles.butContinue}>
          <Text style={styles.textBut}>К тесту</Text>
        <ButContinue width={320} height={87}/>
      </TouchableOpacity>
         :<TouchableOpacity style={styles.butContinue} onPress={checkData}>
          <Text style={styles.textBut}>Продолжить</Text>
          <ButContinue width={320} height={87}/>
        </TouchableOpacity>}
        </View>
        <View>
              <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
              setModalVisible(!modalVisible);
              }}>                
                <View style={styles.modalView}>
                  <View style={{flexDirection:'row', paddingHorizontal:40}}>
                    <CorrectIcon/>
                    <Text style={{color:'#66DF79',fontSize:32,fontFamily:'Nunito-Bold'}}>Верно!</Text>
                    <TouchableOpacity>
                      <TheoryIconOff fill={'#66DF79'}/>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.butContinue} onPress={checkData}>
                    <Text style={styles.textBut}>Продолжить</Text>
                    <ButContinue width={320} height={87}/>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
    </View>

  );
};
const styles = StyleSheet.create({
  selectedOption:{
    borderColor: 'purple' 
  },
  options:{
    width:150,
    height:137,
    borderColor:'#E7E2FB',
    borderWidth:2,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
  },
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
  closeBut:{
    justifyContent:'center',
    position:'absolute',
    left:24,
    top:24,
    zIndex:1,
    width:30,
    height:30,
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
    bottom:70
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
    fontSize:20,
    fontFamily:'Nunito-Bold',
    textAlign:'left',
  },
  addText:{
    marginTop:5,
    fontSize:20,
    fontFamily:'Nunito-Bold',
    textAlign:'left',
    color:'gray'
  },
  imageContainer:{
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    flex:1,
  },
  modalView: {
    position:'absolute',
    height:300,
    bottom:0,
    width:'100%',
    borderRadius: 20,
    backgroundColor:'#fff',
  },
})

export default Practice;