import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TodoServices from './Services/TodoServices';
import ToDoStore from './Services/ToDoStore';

interface ListProps {
  isLoading: boolean;
  dataSource: any;
  navigation: any;
}
interface ListState {
  isLoading: boolean;
  dataSource: any;
 
}

export default class ToDoList extends Component<ListState, ListProps> {
  constructor(listProps: ListProps) {
    super(listProps);
    this.state = {
      isLoading: true,
      dataSource: [],
      navigation: this.props,
    };
  }

  private fetchToDos() {
    const service = new TodoServices();
    service
      .fetchRemoteToDos()
      .then(() => {
        const toDos = ToDoStore.getToDos();
        this.setState({
          isLoading: false,
          dataSource: toDos,
        });
      })
      .catch((error: any) => {
        console.log(`List error => ${error}`);
      });
  }

  componentDidMount() {
    this.fetchToDos();
  }


  private renderUserRow = (rowItem: {item: any}) => {
    const {item} = rowItem;
    return (
      <TouchableOpacity
        style={{flex: 1, marginBottom: 7, flexDirection: 'row'}}>
      
         <Image source={{uri: item.image}} style={{height:104, width:104}} />
            
        <Text style={styles.textView}>{item.name}</Text>
    
        
      </TouchableOpacity>
    );
  };
  private itemSeparator = () => {
    return (
      <View
        style={{
          height: 3.5,
          width: '100%',
         
        }}
      />
    );
  };
  render() {
    let {dataSource} = this.state;
    
    return (
      <View style={styles.MainContainer}>
       
        <FlatList
          data={dataSource}
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={this.renderUserRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer :{
     justifyContent: 'center',
     flex:1,
     margin: 5,
     marginTop: (Platform.OS === 'ios') ? 20 : 0,
 },
 textView: {
     textAlignVertical:'center',
     padding:10,
     color: '#000'
 },



  
 });