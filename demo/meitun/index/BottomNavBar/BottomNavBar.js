

'use strict'

var React=require('react-native');
var css=require('./BottomNavBar.css');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    Platform,
    Image,
    TouchableWithoutFeedback,
    LayoutAnimation,
    }=React;



var BottomNavBar = React.createClass({
    getInitialState(){
        return {
            'selectedName':'mtmm',
        };
    },

    render(){
        return(
            <View style={css.wrapper} >
                <BottomNavBarCell caption='美囤妈妈' name='mtmm' navBar={this} index={this.props.index}/>
                <BottomNavBarCell caption='分类' name='classnav'  navBar={this} index={this.props.index}/>
                <BottomNavBarCell caption='免税店' name='msd' navBar={this} index={this.props.index}/>
                <BottomNavBarCell caption='购物车'  name='gwc' navBar={this}   index={this.props.index}/>
                <BottomNavBarCell caption='我的订单' name='wddd' navBar={this}  index={this.props.index}/>
            </View>
        );
    },
});


var BottomNavBarCell = React.createClass({

    render(){

        var navBar=this.props.navBar;
        var name=this.props.name;
        var selectedName=navBar.state.selectedName;
        var selectedCss='';
        var selectedCssText='';
        if(name==selectedName){
            selectedCss=css.cellView_actived;
            selectedCssText=css.cellText_actived;
        }

        return (
            <TouchableWithoutFeedback onPress={this._handelPress}>
                <View style={[css.cellView,selectedCss]}>
                    <Image style={css.cellImage} source={require('./img/window.png')} />
                    <Text style={[css.cellText,selectedCssText]}>{this.props.caption}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    },

    _handelPress(){
        var name=this.props.name;
        var navBar=this.props.navBar;
        var index=this.props.index;

        LayoutAnimation.spring();

        navBar.setState({selectedName:name});

        index.setState({selectedName:name});


    },

});

module.exports=BottomNavBar;

