
'use strict'


var React=require('react-native');
var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    ListView,
    }=React;


var Drag=require('./animate/drag');
var Spring1=require('./animate/spring1');
var TodoList=require('./todolist/TodoListIndex');

class Demo1Index extends Component{

    render(){

        var data=[
            {
                title:'拖拽测试1',
                page:(<Drag />)
            },
            {
                title:'弹性测试1',
                page:(<Spring1 />)
            },
            {
                title:'todolist',
                page:(<TodoList />)
            },
        ];

        var ds=new ListView.DataSource({rowHasChanged:()=>true}).cloneWithRows(data);


        return (

            <View style={{backgroundColor:'white',flex:1}}>

                <ListView renderRow={this._renderRow.bind(this)}  dataSource={ds} />

            </View>
        );

    }


    _renderRow(d){

        return (
            <TouchableOpacity onPress={this._press.bind(this,d)}
                style={{padding:20,borderBottomWidth:1,borderBottomColor:'#eee'}} >

                <Text>{d.title}</Text>

            </TouchableOpacity>
        );

    }

    _press(d){

        this.props.nav.push(
            {
                title:d.title,
                page:d.page,
            }
        );

    }

}

module.exports=Demo1Index;
