import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet,TouchableOpacity,FlatList,TouchableWithoutFeedback,Modal} from 'react-native';
import Home from "../assets/images/HomeIcon.svg"
import ListIcon from "../assets/images/listClass.svg"
import SearchIcon from "../assets/images/search.svg"
import Sep from "../assets/images/Sep.svg"
import { useNavigation } from '@react-navigation/native'
import Lesson from '../components/Lesson';
import CurLesson from '../components/CurLesson';
import { collection, doc, setDoc, getDoc ,getFirestore, getDocs} from 'firebase/firestore';
import { Button } from 'react-native-elements';
import 'react-native-gesture-handler';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function Learn(){  
  const db = getFirestore();
  const [dataLesson, setDataLesson] = useState([]);
  const [dataSection, setDataSection] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [classPath, setClassPath] = useState('c1');
  const selectItem = (item) => {
    if(item.key=='1'){
      setClassPath('c1');
    }
    if(item.key=='2'){
      setClassPath('c2');
    }
    if(item.key=='3'){
      setClassPath('c3');
    }
    setSelectedItem(item);
    setModalVisible(false);
    console.log(item.key);    
  };
  const data = [
      { key: '1', label: '1 класс' },
      { key: '2', label: '2 класс' },
      { key: '3', label: '3 класс' },
    ];
    
    const LessonComponent = ({ lessonNumber, title }) => {
      return (
        <CurLesson
        lessonNumber={lessonNumber}
        title={title}
        // status={item.status}
      />
      );
    };
    const SectionComponent = ({ numberSection, name }) => {
      return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTextOne}>{numberSection} раздел</Text>
        <Text style={styles.sectionTextTwo}>{name}</Text>
      </View>
      );
    };
    const renderItem = ({ item,index }) => {
      if(index===0 && item.type==='section'){
        setDataSection(item);
      }
      else if (item.type === 'section') {
        return <SectionComponent name={item.name} numberSection={item.numberSection}/>;
      } else if (item.type === 'lesson') {
        return <LessonComponent lessonNumber={item.lessonNumber} title={item.title} />;
      }
      return null;
    };
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const sectionsRef = collection(db, 'Class', classPath, 'Section');
          const sectionsSnapshot = await getDocs(sectionsRef);
          const sections = sectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const allData = [];   
          for (const section of sections) {
            allData.push({ id: section.id, type: 'section', name: section.sectionName, numberSection: section.numberSection });
    
            const lessonRef = collection(db, 'Class', classPath, 'Section', section.id, 'Lesson');
            const lessonSnapshot = await getDocs(lessonRef);
            const lessonData = lessonSnapshot.docs.map(doc => ({ id: doc.id, type: 'lesson', ...doc.data() }));
            lessonData.sort((a, b) => a.lessonNumber.localeCompare(b.lessonNumber));
            allData.push(...lessonData);
          }
          setDataLesson(allData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [classPath]);

    const headerComponent = () => <View style={styles.centeringSpace} />;
    return(
        <View style={styles.background}>
            <View style={styles.topPanel}>
                <TouchableOpacity style={styles.dropDown} onPress={()=>setModalVisible(!modalVisible)}>
                    <ListIcon/>
                </TouchableOpacity>
                <View style={styles.textTopPanel}> 
                    <Text style={styles.textNumberSection}>{dataSection.numberSection} раздел</Text>
                    <Text style={styles.textSection}>{dataSection.name}</Text>
                </View>
                <TouchableOpacity style={styles.searchBut}>
                  <SearchIcon/>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
            <FlatList
            data={dataLesson}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
            ListHeaderComponent={headerComponent}
            />            
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
                <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}>
                    <View style={styles.onBackdrop}>
                      </View>
                  </TouchableWithoutFeedback>
                  <View style={styles.flatList}>
                    <Text style={styles.flatListText}>Выберите класс</Text>
                      <FlatList 
                      data={data}
                      renderItem={({ item }) => (
                      <TouchableOpacity style={styles.dropdownItem} onPress={() => selectItem(item)}>
                          <Text>{item.label}</Text>
                      </TouchableOpacity>
                      )}
                      ItemSeparatorComponent={Sep}
                      />
                  </View>
                </View>
              </Modal>
            </View>
      </View>
      )}
      const styles = StyleSheet.create({
        sectionContainer:{
          height:80,
          backgroundColor:'#6A54E9',
          //borderRadius:15,
          justifyContent:'center',
          alignItems:'center',
          marginBottom:50,
        },
        sectionTextOne:{
          fontFamily:'Nunito-ExtraBold',
          fontSize: 20,
          color:'rgba(255,255,255,0.5)'
        },
        sectionTextTwo:{
          fontFamily:'Nunito-ExtraBold',
          fontSize: 22,
          color:'#fff',
        },
        centeringSpace:{
          height: 150,
        },
        textTopPanel:{
          flex:1,
          alignItems:'center',
        },
        topPanel:{
          flexDirection:'row',
          alignItems:'flex-end',
          position:'absolute',
          backgroundColor:'#6A54E9',
          width:'100%',
          height:'16%',
          zIndex:1,
          paddingHorizontal:'3%',
          paddingBottom:'5%',
        },
        textNumberSection:{
          fontFamily:'Nunito-ExtraBold',
          fontSize: 20,
          color:'rgba(255,255,255,0.5)'
        },
        textSection:{
          fontFamily:'Nunito-ExtraBold',
          fontSize: 22,
          color:'#fff',
        },
        dropDown:{
          // backgroundColor:'#000',
          alignItems:'flex-end',
          justifyContent:'center',
          width:34,
          height:32,
          },
        searchBut:{
          // backgroundColor:'#000',
          alignItems:'flex-end',
          justifyContent:'flex-end',
          width:34,
          height:32,
        },
        modalView: {
          flex:1,
          borderRadius: 20,
        },
        onBackdrop:{
            flex:1,
            backgroundColor:'rgba(24, 24, 37,0.9)',
        },
        flatListText:{
        marginBottom:4,
        },
        flatList:{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 369,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 32,
        paddingLeft:44,
        paddingRight:44,
        paddingBottom: 44,
        flex: 1,
        },
        dropdownItem:{
        borderRadius:100,
        backgroundColor:'transparent', //#AAAAAA
        width:'100%',
        height:58,
        alignItems:'center',
        alignSelf:'flex-start',
        justifyContent:'center',
        marginBottom:1,        
        marginTop:1,        
        },
        background:{
        backgroundColor:'#F5F3FD',
        flex:1,
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        top:0,
        },
        })
