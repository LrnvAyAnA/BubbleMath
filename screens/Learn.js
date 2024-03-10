import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet,TouchableOpacity,FlatList,TouchableWithoutFeedback,Modal, Dimensions} from 'react-native';
import Home from "../assets/images/HomeIcon.svg"
import ListIcon from "../assets/images/listClass.svg"
import Sep from "../assets/images/Sep.svg"
import { useNavigation } from '@react-navigation/native'
import Lesson from '../components/Lesson';
import CurLesson from '../components/CurLesson';
import { collection, doc, setDoc, getDoc ,getFirestore, getDocs} from 'firebase/firestore';
import { Button } from 'react-native-elements';

export default function Learn(){  
  const db = getFirestore();
  const [dataLesson, setDataLesson] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [classPath, setClassPath] = useState('c1');
  // const navigation = useNavigation();
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
    const renderItem = ({ item }) => (
      <CurLesson
        lessonNumber={item.lessonNumber}
        title={item.title}
        // status={item.status}
      />
    );
    useEffect(() => {
      console.log('useEffect is called');
      const fetchData = async () => {
        try {
          const ref = collection(db, 'Class', classPath, 'Section', 's1', 'Lesson');
          const snapshot = await getDocs(ref);
          const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setDataLesson(newData);
          console.log("data",newData);
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
                    <View style={styles.containerClass}>
                    <ListIcon/>
                    <Text style={styles.textTouchableOpacity}>{selectedItem ? selectedItem.label : '1 класс'}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.infoPanelLesson}>
                  <Text style={styles.infoPanelText}>Здесь инф</Text>
                </View>
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
            {/* <View style={{marginTop:400,justifyContent:'center',alignItems:'center',height:200, width:200}}>
              <TouchableOpacity style={{height:100, width:200,backgroundColor:'#000'}} onPress={myFirestore}>
                  <Text>Press down</Text>
    </TouchableOpacity></View>*/}
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
          height: 250, 
        },
        infoPanelText:{
          color:'white',
          fontFamily:'Nunito-ExtraBold',
          fontSize:22,
        },
        infoPanelLesson:{
          backgroundColor:'#866AF6',
          borderRadius:30,
          width:'100%',
          height:'55%',
          marginTop:22,
          alignItems:'center',
          justifyContent:'center',
        },
        topPanel:{
          position:'absolute',
          backgroundColor:'#6A54E9',
          width:'100%',
          height:'25%',
          zIndex:2,
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
        containerClass:{
        flexDirection:'row'
        },
        dropDown:{
        justifyContent: 'center',
        backgroundColor:'#fff',
        marginTop:50,
        marginLeft:15,
        paddingLeft:22,
        paddingRight:45,
        borderRadius:100,
        alignSelf:'flex-start',
        width:219,
        height:58,
        },
        textTouchableOpacity:{
        fontSize:20,
        textAlign:'right',
        flex:1,
        marginTop:2,
        color:'#6A54E9',
        fontFamily:'Nunito-Black',
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
