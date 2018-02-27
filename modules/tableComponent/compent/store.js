
import Iflux, {msg, Store, connectToStore} from 'iflux';
import Immutable from 'immutable';
let appStore = Store({
    name:"",
    password:"",
    school:"",

});
export default appStore;

     /*修改操作*/
      msg.on('Addtable:modifyTable',(name ,value)=>{
          appStore.cursor().set(name,Immutable.fromJS(value));
    });



