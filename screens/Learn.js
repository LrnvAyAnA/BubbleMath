import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet,TouchableOpacity,FlatList} from 'react-native';
import Home from "../assets/images/HomeIcon.svg"
import ListIcon from "../assets/images/listClass.svg"
import Sep from "../assets/images/Sep.svg"
import { useHide } from '../components/hideTabBarHelper';
import { useNavigation } from '@react-navigation/native';

export default function Learn(){  

  const [isFlatListVisible, setFlatListVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  // const parentNavigation = navigation.getParent();
  // parentNavigation?.setOptions({
  //   tabBarStyle:{
    
  //   }
  // });
  // useEffect(() => {
  //   const parentNavigation = navigation.getParent();
  //   if (isFlatListVisible) {
  //     parentNavigation?.setOptions({
  //       tabBarStyle: {
  //         display: 'none',
  //       },
  //     });
  //   } else {
  //     parentNavigation?.setOptions({
  //       tabBarStyle: undefined
  //     });
  //   }

  //   return () => {
  //     parentNavigation?.setOptions({
  //       tabBarStyle: undefined
  //     });
  //   };
  // }, [isFlatListVisible, navigation]);

  const changeClass = () => {
    setFlatListVisible(!isFlatListVisible);
    navigation.navigate('ChangeClass');
  };
  const selectItem = (item) => {
    setSelectedItem(item);
    setFlatListVisible(false);
  };
    const data = [
      { key: '1', label: '1 класс' },
      { key: '2', label: '2 класс' },
      // { key: '3', label: '3 класс' },
      // { key: '4', label: '4 класс' },
      // { key: '5', label: '5 класс' },
      // { key: '6', label: '6 класс' },
    ]; 
    return(
        <View style={styles.background}>
            <View>
                <TouchableOpacity style={styles.dropDown} onPress={changeClass}>
                    <View style={styles.containerClass}>
                    <ListIcon/>
                    <Text style={styles.textTouchableOpacity}>{selectedItem ? selectedItem.label : '1 класс'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[styles.flatList,{opacity: isFlatListVisible ? 1:0}]}>
              <Text style={styles.flatListText}>Выбери класс</Text>
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
      )
      }
      const styles = StyleSheet.create({
        flatListText:{
        marginBottom:24,
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
        backgroundColor:'#1C043D',
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
        color:'#fff',
        fontFamily:'Nunito-Black',
        },
        background:{
        backgroundColor:'#24044F',
        flex:1,
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        top:0,
        },
        })
