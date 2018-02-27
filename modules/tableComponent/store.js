
import Iflux, {msg, Store, connectToStore} from 'iflux';
import Immutable from 'immutable';
let appStore = Store({
    thead: ["姓名", "密码", "毕业学校", "操作"],
    tableList: [{
        name: "zyf",
        tempName:"",
        password: "123321",
        school: "南京晓庄学院",
        operate_add: "增加",
        operate_modify: "修改",
        operate_delete: "删除",
        isModify:false
    },
        {
            name: "zx",
            tempName:"",
            password: "111111",
            school: "常熟理工学院",
            operate_add: "增加",
            operate_modify: "修改",
            operate_delete: "删除",
            isModify:false
        },
        {
            name: "zjl",
            tempName:"",
            password: "123321",
            school: "中国农科院",
            operate_add: "增加",
            operate_modify: "修改",
            operate_delete: "删除",
            isModify:false
        },
        {
            name: "zd",
            tempName:"",
            password: "123321",
            school: "江南大学",
            operate_add: "增加",
            operate_modify: "修改",
            operate_delete: "删除",
            isModify:false
        }],
});
export default appStore;

    /*删除操作*/
     msg.on('Table:deleteTable',(index)=>{
         let tablist=appStore.data().get('tableList').toJS();
         tablist.splice(index,1);
         appStore.cursor().set("tableList",Immutable.fromJS(tablist));
     });

     /*修改操作*/
      msg.on('Table:modifyTable',(name ,value)=>{
          appStore.cursor().set(name,Immutable.fromJS(value));
    });



