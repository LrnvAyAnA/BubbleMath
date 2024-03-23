import React, { useEffect, useRef, useState } from 'react';
import { Text, View,StyleSheet,TouchableOpacity,FlatList,TouchableWithoutFeedback,Modal, Animated, Dimensions} from 'react-native';
import Home from "../assets/images/HomeIcon.svg"
import ListIcon from "../assets/images/listClass.svg"
import SearchIcon from "../assets/images/search.svg"
import Sep from "../assets/images/Sep.svg"
import { useNavigation } from '@react-navigation/native'
import Lesson, { ITEMLESSON_SIZE } from '../components/Lesson';
import CurLesson from '../components/CurLesson';
import SearchComponent from '../components/SearchComponent';
import SectionComponent from '../components/SectionComponent';
import { useAnimatedReaction, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { getAllLesson, getTheoryFromLesson } from '../firebaseQueries';
//import { TABBAR_HEIGHT } from '../navigate';

const HEADER_HEIGHT = 120;
const TABBAR_HEIGHT = 70;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
const WORK_SPACE = WINDOW_HEIGHT-TABBAR_HEIGHT-HEADER_HEIGHT;
export default function Learn(){  
  const navigation = useNavigation();
  const [dataLesson, setDataLesson] = useState([]);
  const [dataSection, setDataSection] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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
    setModalVisible(false);   
  };
  const data = [
      { key: '1', label: '1 класс' },
      { key: '2', label: '2 класс' },
      { key: '3', label: '3 класс' },
    ];

    const animatedHeaderText = useSharedValue('Loading...');
    const [viewableItems,setViewableItems] = useState([]);

    const viewItems = (viewableItems) => {
      let i = 0; // Определение переменной за пределами функции
          setViewableItems(viewableItems);
          // viewableItems.forEach(element => {
          //     i += 1; // Увеличение значения переменной на каждой итерации
          //    console.log({i}, ':', {element});
          // });
         //console.log();
      };
//если первый элмент раздел - меняем, если второй элемент раздел и при этом animatedHeaderText не равен предыдущему разделу - меняем


    useAnimatedReaction(
      () => {
        const firstItem = viewableItems[0]?.item;
        const secondItem = viewableItems[1]?.item;
        return [firstItem, secondItem];
      },
      ([firstItem, secondItem]) => {
        const prev = animatedHeaderText.value;
      },
      [viewableItems]
    );
  
    // useAnimatedReaction(
    //   () => viewItems.map(item => item.item.name),
    //   (names) => {
    //     const sectionName = names.find(name => name && name !== 'section');
    //     if (sectionName) {
    //       // Изменяем анимированный стейт, чтобы обновить текст в верхней панели
    //       animatedHeaderText.value = sectionName;
    //     }
    //   },
    //   [viewItems]
    // );
    const [currentLesson, setCurrentLesson] = useState(null);
    const renderItem = ({ item }) => {   

      //  if (item.type === 'section') {
      //   return (
      //       <SectionComponent name={item.name} numberSection={item.numberSection}/>
      //   );
      // } else 
      const goToTheory = async () => {
        try {
          // Вызываем функцию getTheoryFromLesson
          const theoryData = await getTheoryFromLesson({classPath:classPath,lesson:item})
          // console.log(theoryData);
          navigation.navigate('TheoryTemp', { theoryData });
        } catch (error) {
          console.error('Error getting theory data:', error);
        }
      };
      if(item.type==='lesson'){
        return (
          <CurLesson lessonNumber={item.lessonNumber} title={item.title} onpress={goToTheory}/>
        );
      }
      
      // if (item.type === 'lesson') {
      //       return (
      //       <Lesson number={item.lessonNumber} contentOffset={contentOffset} index={item.index} title={item.title} onPress={goToTheory}/>
      //   );
      // }
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const allData = await getAllLesson({ classPath }); // Вызываем функцию getAllLesson из объекта экспорта
          //console.log(allData.filter(item=>item.type==='lesson'));
          // Фильтруем только элементы типа 'lesson'
          const lessonItems = allData.filter(item => item.type === 'lesson');
    
          const indexedData = lessonItems.map((item, index) => ({ ...item, index: index }));
    
          setDataLesson([indexedData[0]]);
          animatedHeaderText.value = allData.find(item => item.type === 'section').name;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData(); // Вызываем функцию fetchData для получения данных при монтировании компонента или изменении класса
    }, [classPath]);
    const scrollY = useRef(new Animated.Value(0)).current;
    const diffClamScrollY = Animated.diffClamp(scrollY,0,HEADER_HEIGHT);
    const translateHeader = diffClamScrollY.interpolate({
      inputRange:[0,HEADER_HEIGHT],
      outputRange:[0,-HEADER_HEIGHT],
    })
    const flatListRef = useRef(null);
    // const scrollToCenter = () => {
    //   const centerIndex = findNearestIndexToCenter();
    //   flatListRef.current?.scrollToIndex({
    //     animated: true,
    //     index: centerIndex,
    //   });
    // };
    // const findNearestIndexToCenter = ()=>{
      
    // }
    const contentOffset = useSharedValue(0);
    const headerComponent = () => <View style={styles.centeringSpace}/>;
    return(
        <View style={styles.background}>
              <Animated.View style={styles.topPanel}>
                <View style={styles.empty}/>         
                <View style={styles.elements}>
                  <TouchableOpacity style={styles.dropDown} onPress={()=>setModalVisible(!modalVisible)}>
                      <ListIcon/>
                  </TouchableOpacity>
                  <Animated.View style={styles.textTopPanel}> 
                      {/* <Text style={styles.textNumberSection}>{dataSection.numberSection} раздел</Text> */}
                      <Animated.Text style={styles.textSection}>{animatedHeaderText.value}</Animated.Text>
                  </Animated.View>
                  <View style={styles.search}>
                  {/* <SearchComponent/> */}
                  <SearchIcon/>
                  </View>
                </View>
            </Animated.View>
            <View style={{flex:1, marginTop:HEADER_HEIGHT}}>
              <Animated.FlatList
                onScroll={(e)=>{
                  contentOffset.value= e.nativeEvent.contentOffset.y;
                }}
                
                snapToInterval={334}
                ref={flatListRef}
                data={dataLesson}
                keyExtractor={(item) => item.index}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContainer}
                scrollEventThrottle={16}
                onViewableItemsChanged={({viewableItems})=>viewItems(viewableItems)}
                />          
            </View>
            {/* Выбор классов */}
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
        //Верхняя
        topPanel:{
          position:'absolute',
          flexDirection:'column',
          backgroundColor:'#6A54E9',
          width:'100%',
          height:HEADER_HEIGHT,
          zIndex:1,
        },
        empty:{
          //flex:1,
          height:55,
          width:'100%',
          //backgroundColor:'#fff',
        },
        elements:{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
        },
        dropDown:{
          width:50,
          height:50,
          alignItems:'center',
          justifyContent:'center'
          },
          textTopPanel:{
            flex:1,
          },
          textNumberSection:{
            textAlign:'center',
            fontFamily:'Nunito-ExtraBold',
            fontSize: 26,
            color:'rgba(255,255,255,0.5)'
          },
        search:{
          alignItems:'center',
          justifyContent:'center',
          width:50,
          height:50,
        },
        triggerElement:{
          top:'50%',
          position:'absolute',
          zIndex:1,
          width:'100%',
          backgroundColor:'rgba(255,0,255,0.5)',
          height:100,
          
        },
        flatListContainer:{
         paddingVertical: WORK_SPACE/2-155, //itemlessonsize/2
        },
        centeringSpace:{
          height: 50,
        },
        textSection:{
          fontFamily:'Nunito-ExtraBold',
          fontSize: 22,
          color:'#fff',
          textAlign:'center',
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
        position:'relative',
        bottom:0,
        left:0,
        right:0,
        top:0,
        },
        })
