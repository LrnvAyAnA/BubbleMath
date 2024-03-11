import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet,TouchableOpacity,FlatList,TouchableWithoutFeedback,Modal, Dimensions} from 'react-native';
import Home from "../assets/images/HomeIcon.svg"
import ListIcon from "../assets/images/listClass.svg"
import SearchIcon from "../assets/images/search.svg"
import Sep from "../assets/images/Sep.svg"
import { useNavigation } from '@react-navigation/native'
import Lesson from '../components/Lesson';
import CurLesson from '../components/CurLesson';
import { collection, doc, setDoc, getDoc ,getFirestore, getDocs} from 'firebase/firestore';
import { Button } from 'react-native-elements';

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
    const renderItem = ({ item }) => {
      console.log(item);
      if (item.type === 'section') {
        return <SectionComponent  />;
      } else if (item.type === 'lesson') {
        return <LessonComponent lessonNumber={item.lessonNumber} title={item.title} />;
      }
      return null;
    };

    const LessonComponent = ({ lessonNumber, title }) => {
      return (
        <CurLesson
        lessonNumber={lessonNumber}
        title={title}
        // status={item.status}
      />
      );
    };
    const SectionComponent = ({ item }) => {
      if (!item) {
        return null;
      }
      return (
        <View>
          <Text>{item.numberSection} раздел</Text>
          <Text>{item.name}</Text>
        </View>
      );
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const sectionsRef = collection(db, 'Class', classPath, 'Section');
          const sectionsSnapshot = await getDocs(sectionsRef);
          const sections = sectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const allData = [];
    
          for (const section of sections) {
            // Добавляем строку "section" перед уроками каждого раздела
            allData.push({ id: section.id, type: 'section', name: section.sectionName, numberSection: section.numberSection });
    
            const lessonRef = collection(db, 'Class', classPath, 'Section', section.id, 'Lesson');
            const lessonSnapshot = await getDocs(lessonRef);
            const lessonData = lessonSnapshot.docs.map(doc => ({ id: doc.id, type: 'lesson', ...doc.data() }));
            lessonData.sort((a, b) => a.lessonNumber.localeCompare(b.lessonNumber));
            allData.push(...lessonData);
          }
    
          //console.log("All data:", allData);
          setDataLesson(allData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [classPath]);
    // useEffect(()=>{
    //   const fetchData = async() => {
    //     try {
    //       //получение всех разделов класса
    //       const ref = collection(db,'Class',classPath,'Section');
    //       const snapshot = await getDocs(ref);
    //       const sectionNames = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //       console.log("Section names:", sectionNames);
    //       //получение всех уроков

    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   fetchData();
    // },[]);
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
          
    //       const ref = collection(db, 'Class', classPath, 'Section', 's1', 'Lesson');
    //       const snapshot = await getDocs(ref);
    //       const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //       setDataLesson(newData);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
  
    //   fetchData();
    // }, [classPath]);
    const headerComponent = () => <View style={styles.centeringSpace} />;
    return(
        <View style={styles.background}>
            <View style={styles.topPanel}>
                <TouchableOpacity style={styles.dropDown} onPress={()=>setModalVisible(!modalVisible)}>
                    <ListIcon/>
                </TouchableOpacity>
                <View style={styles.textTopPanel}> 
                    <Text style={styles.textNumberSection}>1 раздел</Text>
                    <Text style={styles.textSection}>Название раздела</Text>
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
            {/* <View>
              <Lesson number={'10'}/>
            </View> */}
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
      )
                      }
      const styles = StyleSheet.create({
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
          zIndex:2,
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
