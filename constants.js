import { Dimensions, Modal, StatusBar, Text, TouchableOpacity } from "react-native";
import CloseIcon from './assets/images/closeIcon'
import React, { useState } from "react"; 
import { View } from "react-native";

export const HEADER_HEIGHT = 120;
export const TABBAR_HEIGHT = 70;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const statusBarH = StatusBar.currentHeight;
export const Error = ({error,onClose})=>{
    const [modalVisible, setModalVisible] = useState(true);

  const closeModal = () => {
    setModalVisible(false);
    onClose();
  };
    return (
          <Modal visible={modalVisible} 
               onRequestClose={closeModal}
               animationType="fade"
               transparent={true}>
                <View style={{width:'80%', borderRadius:20, height:100,
                            alignItems:'center', alignSelf:'center', 
                          top:50,justifyContent:'center', backgroundColor:'#fff', borderColor:'#AAAAAA', borderWidth:4
                              }}>
                <TouchableOpacity onPress={closeModal}  style={{ position:'absolute', top:10,left:10}}>
                <CloseIcon/>
            </TouchableOpacity>
            <Text>{error}</Text>
                </View>           
        </Modal>
    );
};