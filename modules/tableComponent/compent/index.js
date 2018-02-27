import React, {Component} from "react";
import appStore from "./store";
import {msg, Store, connectToStore} from 'iflux';


class Addtable extends Component {
    /*初始化信息 componentDidMount*/
    componentDidMount() {

    }
    render() {
        let that = this;
        return (
            <table>
                <thead>
                <tr>
                    <td>姓名</td>
                    <td>密码</td>
                    <td>学校</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type="text" className="name" placeholder="输入姓名" value={appStore.data().get('name')} onChange={that._changeData} name="name"/></td>
                    <td><input type="text" className="password"  placeholder="输入密码" value={appStore.data().get('password')} onChange={that._changeData} name="password"/></td>
                    <td><input type="text" className="school" placeholder="输入学校" value={appStore.data().get('school')} onChange={that._changeData} name="school"/></td>
                </tr>
                <tr><td cols="3"><button onClick={this.handlerAddClick.bind(this)} value="add">添加</button></td></tr>
                </tbody>
            </table>
        )
    }
   //增
    _changeData(e){
        msg.emit('Addtable:modifyTable', e.target.name, e.target.value);
    }
    handlerAddClick(){
        let tableList = this.props.tableList.toJS();
        tableList.push({
            name: appStore.data().get("name"),
            tempName:"",
            password: appStore.data().get("password"),
            school:appStore.data().get("school"),
            operate_add: "增加",
            operate_modify: "修改",
            operate_delete: "删除",
            isModify:false
        });
        this.props.handlerAddClick(tableList);
    }
}
export default connectToStore(appStore, true)(Addtable)