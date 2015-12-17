
'use strict'


let React=require('react-native');
let Immutable = require('immutable');
var BbtRN=require('../../../bbt-react-native');


var {
    BaseLogicObj,
    }=BbtRN;


let {
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
    TextInput,
    ScrollView,
    }=React;

//root组件开始-----------------

let  Root =React.createClass({

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
        this.filterObj=new FilterObj(this);
    },


    getInitialState(){
      return {
          data:Immutable.fromJS(this.data),//模拟的初始化数据
          todoName:'',//新任务的text
          curFilter:'all',//过滤条件 all no ok
      }
    },



    render(){
        return (
            <View style={{marginTop:40,flex:1}}>

                <AddTodo todoName={this.state.todoName}
                        changeText={this.addTodoObj.change.bind(this.addTodoObj)}
                         pressAdd={this.addTodoObj.press.bind(this.addTodoObj)} />

                <TodoList todos={this.state.data}
                          onTodoPress={this.todoListObj.pressTodo.bind(this.todoListObj)} />

                <Footer curFilter={this.state.curFilter}
                    onFilterPress={this.filterObj.filter.bind(this.filterObj)} />

            </View>
        );
    },



});






//业务逻辑对象开始-------------------------可以使用OO的设计方式设计成多个对象


class AddTodoObj extends BaseLogicObj{

    press(){
        if(!this.getState().todoName)return;
        let list=this.getState().data;
        let todo=Immutable.fromJS({name:this.getState().todoName,completed:false,});
        this.setState({data:list.push(todo),todoName:''});
    }

    change(e){
        this.setState({todoName:e.nativeEvent.text});
    }

}


class TodoListObj extends BaseLogicObj {




    pressTodo(todo){

        let data=this.getState().data;

        let i=data.indexOf(todo);

        let todo2=todo.set('completed',!todo.get('completed'));

        this.setState({data:data.set(i,todo2)});
    }
}


class FilterObj extends BaseLogicObj {


    filter(type){

        let data=this.getState().data.toJS();
        if(type=='all'){
            data.map((todo)=>{
                todo.show=true;
            });
        }else if(type=='no'){
            data.map((todo)=>{
                if(todo.completed)todo.show=false;
                else todo.show=true;
             });
        }else if(type=='ok'){
            data.map((todo)=>{
                if(todo.completed)todo.show=true;
                else todo.show=false;
            });
        }


        this.setState({curFilter:type,data:Immutable.fromJS(data)});
    }



}


//view子组件开始---------------------------


let Footer=React.createClass({

    render(){

        return (


            <View style={{flexDirection:'row', justifyContent:'flex-end',marginBottom:10,}}>

                <FooterBtn {...this.props} title='全部' name='all'  cur={this.props.curFilter=='all'?true:false} />
                <FooterBtn {...this.props} title='未完成' name='no' cur={this.props.curFilter=='no'?true:false} />
                <FooterBtn {...this.props} title='已完成' name='ok' cur={this.props.curFilter=='ok'?true:false} />

            </View>



        );
    },


});


let FooterBtn=React.createClass({

    render(){

        return (

            <TouchableOpacity onPress={()=>this.props.onFilterPress(this.props.name)}
                              style={[{padding:10,marginRight:10},this.props.cur?{backgroundColor:'green'}:null]} >
                <Text style={[this.props.cur?{color:'fff'}:null]}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>

        );
    },


});


let AddTodo=React.createClass({

    render(){

        return (


            <View style={{flexDirection:'row', alignItems:'center'}}>


                <TextInput value={this.props.todoName}
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



let Todo=React.createClass({

    render(){
        let todo=this.props.todo;
        return (
            todo.get("show")!=false?
            <TouchableOpacity  onPress={()=>this.props.onTodoPress(todo)}
                style={{padding:10,borderBottomWidth:1,borderBottomColor:'#e5e5e5'}}>
                <Text style={[todo.get('completed')==true?{textDecorationLine:'line-through',color:'#999'}:null]} >
                    {todo.get('completed')==true?'已完成   ':'未完成   '} {todo.get('name')}
                </Text>
            </TouchableOpacity>
             :null
        );
    },


});


let TodoList=React.createClass({
    render(){
        return (
            <ScrollView style={{flex:1}}>
                {this.props.todos.reverse().map((todo, index) => <Todo {...this.props} todo={todo} key={index}  />)}
            </ScrollView>
        );
    },
});




module.exports=Root;
