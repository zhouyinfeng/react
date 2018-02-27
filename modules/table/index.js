import React, {Component} from "react";
import appStore from "./store";
import {msg, Store, connectToStore} from 'iflux';
class Table extends Component {
    render() {
        let that = this;
        let tableList = appStore.data().get('tableList');
        let tableTitle = appStore.data().get('thead');
        return (
            <div className="table">
                <table>
                    <thead>
                    <tr>{tableTitle.map(function (name, index) {
                        {
                            return (
                                <td key={index}>{name}</td>
                            )
                        }
                    })}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tableList.map(function (name, index) {
                            return (
                                <tr key={index}>
                                    <td>
                                        {
                                            name.get("isModify") ? <input key={index} value={name.get("tempName")} onChange={that._operateModifyName} name={index}/> : name.get("name")
                                        }
                                    </td>
                                    <td>
                                        {name.get("isModify") ? <input key={index} value={name.get("tempName")} onChange={that._operateModifyPassword} name={index}/> : name.get("password")}
                                        {/* <input readOnly key={index} value={name.get("password")}/>*/}
                                    </td>
                                    <td>
                                        <input readOnly="true" key={index} id="school" value={name.get("school")} style={{"border":"0"}}/>
                                    </td>
                                    <td>
                                        {
                                            name.get("isModify") ?  <a href="JavaScript:void(0)"  onClick={that._changeIsModify.bind(that, index)}>保存</a> :
                                                <a href="JavaScript:void(0)"  onClick={that._changeIsModify.bind(that, index)}>{name.get("operate_modify")}</a>
                                        }&nbsp;
                                        {
                                            name.get("isModify") ? <a href="JavaScript:void(0)" onClick={that._cancleChangeIsModify.bind(that, index)}>取消</a> : null
                                        }
                                        <a href="JavaScript:void(0)"  onClick={that._operateDelete.bind(that, index)}>{name.get("operate_delete")}</a>&nbsp;
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
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
            </div>
        )
    }
    _operateDelete(index) {
        msg.emit('Table:deleteTable', index);
    }
    /*修改姓名*/
    _operateModifyName(e) {
        let tableList = appStore.data().get('tableList').toJS();
        tableList[e.target.name].tempName = e.target.value;
        msg.emit('Table:modifyTable', "tableList", tableList);
    }

    _changeIsModify(index) {
        let tableList = appStore.data().get('tableList').toJS();
        if (tableList[index].isModify) {
            tableList[index].name = tableList[index].tempName;
            tableList[index].tempName = "";
            tableList[index].isModify = false;
        } else {
            tableList[index].tempName = tableList[index].name;
            tableList[index].isModify = true;
        }
        msg.emit('Table:modifyTable', "tableList", tableList);
    }

    _cancleChangeIsModify(index) {
        let tableList = appStore.data().get('tableList').toJS();
        tableList[index].tempName = "";
        tableList[index].isModify = false;
        msg.emit('Table:modifyTable', "tableList", tableList);
    }

    /*修改密码*/
    _operateModifyPassword(e){
     let tableList=appStore.data().get("tableList").toJS();
        tableList[e.target.name].tempName = e.target.value;
        msg.emit('Table:modifyTable', "tableList", tableList);
    }



   //增
    _changeData(e){
        msg.emit('Table:modifyTable', e.target.name, e.target.value);
    }

    handlerAddClick(){
        let tableList = appStore.data().get('tableList').toJS();
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
        msg.emit('Table:modifyTable', "tableList", tableList);
    }
}
export default connectToStore(appStore, true)(Table)