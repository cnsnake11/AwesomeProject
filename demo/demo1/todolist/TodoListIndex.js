
'use strict'


var React=require('react-native');
var Immutable = require('immutable');
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



var  TodoListIndex =React.createClass({

    //尽量不要有数据组，一切都要用对象，这样方便update操作，
    data:[{
        name:'aaaaa',
        completed:true,
    },{
        name:'bbbbb',
        completed:false,
    },{
        name:'ccccc',
        completed:false,
    }
    ,{
        name:'ddddd',
        completed:true,
    }],

    getInitialState(){
      return {
        data:Immutable.List.of(...this.data),
      }
    },

    render(){
        return (
            <View>

                <TodoList todos={this.state.data} onTodoPress={this._pressTodo} />

            </View>
        );
    },

    //这里可以使用OO的设计方式拆成多个对象
    _pressTodo(todo){
        let name=todo.name;
        let data=this.state.data;
        let i=data.indexOf(todo);
        todo.completed=!todo.completed;

        data.set(i,todo);
        this.setState({data:data});
    },

});


var Todo=React.createClass({

    render(){
        var todo=this.props.todo;
        return (
            <TouchableOpacity  onPress={()=>this.props.onTodoPress(todo)}
                style={{padding:10,borderBottomWidth:1,borderBottomColor:'#e5e5e5'}}>
                <Text style={[todo.completed==true?null:{textDecorationLine:'line-through',color:'#999'}]} >
                    {todo.name}
                </Text>
            </TouchableOpacity>
        );
    },


});


var TodoList=React.createClass({
    render(){
        return (
            <View>
                {this.props.todos.map((todo, index) => <Todo todo={todo} key={index} {...this.props} />)}
            </View>
        );
    },
});




module.exports=TodoListIndex;
