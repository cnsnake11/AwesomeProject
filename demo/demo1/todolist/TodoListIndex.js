
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
    TextInput
    }=React;

//root组件开始-----------------

var  TodoListIndex =React.createClass({

    //初始化模拟数据，
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


    componentWillMount(){
        this.addTodoObj=new AddTodoObj(this);
        this.todoListObj=new TodoListObj(this);
    },


    getInitialState(){
      return {
          data:Immutable.fromJS(this.data),
          //addText:'',//新任务的text
      }
    },



    render(){
        return (
            <View style={{marginTop:40}}>

                <AddTodo addText={this.addTodoObj.addText}
                        changeText={this.addTodoObj.change.bind(this.addTodoObj)}
                         pressAdd={this.addTodoObj.press.bind(this.addTodoObj)} />

                <TodoList todos={this.state.data}
                          onTodoPress={this.todoListObj.pressTodo.bind(this.todoListObj)} />

            </View>
        );
    },



});






//modal对象开始-------------------------可以使用OO的设计方式拆成多个对象


class AddTodoObj{

    constructor(root){
        this.root=root;
        this.addText='111111'
    }


    press(){
        var list=this.root.state.data;
        var todo=Immutable.fromJS({name:this.addText,completed:false,});
        this.addText='';
        this.root.setState({data:list.push(todo)});
    }

    change(e){
        this.addText=e.nativeEvent.text;
        //this.setState({addText:e.nativeEvent.text});
    }

}


class TodoListObj{

    constructor(root){
        this.root=root;
    }


    pressTodo(todo){

        let data=this.root.state.data;

        let i=data.indexOf(todo);

        var todo2=todo.set('completed',!todo.get('completed'));

        this.root.setState({data:data.set(i,todo2)});
    }
}





//view组件开始---------------------------

var AddTodo=React.createClass({

    render(){

        return (


            <View style={{flexDirection:'row', alignItems:'center'}}>


                <TextInput value={this.props.addText}
                    onChange={this.props.changeText}
                    style={{width:200,height:40,borderWidth:1,borderColor:'e5e5e5',margin:10,}}></TextInput>


                <TouchableOpacity onPress={this.props.pressAdd}
                    style={{backgroundColor:'green',padding:10}} >
                    <Text style={{color:'fff'}} >
                        添加任务
                    </Text>
                </TouchableOpacity>

            </View>



        );
    },


});



var Todo=React.createClass({

    render(){
        var todo=this.props.todo;
        return (
            <TouchableOpacity  onPress={()=>this.props.onTodoPress(todo)}
                style={{padding:10,borderBottomWidth:1,borderBottomColor:'#e5e5e5'}}>
                <Text style={[todo.get('completed')==true?{textDecorationLine:'line-through',color:'#999'}:null]} >
                    {todo.get('completed')==true?'已完成   ':'未完成   '} {todo.get('name')}
                </Text>
            </TouchableOpacity>
        );
    },


});


var TodoList=React.createClass({
    render(){
        return (
            <View>
                {this.props.todos.map((todo, index) => <Todo {...this.props} todo={todo} key={index}  />)}
            </View>
        );
    },
});




module.exports=TodoListIndex;
