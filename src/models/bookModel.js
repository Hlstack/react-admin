import {
    getStore,
    getSaler,
    getCreateFields,
    createBook,
    getBookList,
} from "@/server/book.js"

// import {download} from "@/widget/utility.js"

export default{
    fieldList:{
        customername:{
            label:'客户名',
            editorComponent:{
                name:"field_string",
                config:{
                    placeholder:'请输入客户名',
                },
                createConfig:{
                    placeholder:"测试createconfig"
                },
                default:'',
            },
            view:{
                join:['id'],
                function(record){
                    return `${record.customername}(${record.id})`
                },
            },
        },
        totalprice:{
            label:'金额',
            editorComponent:{
                name:"field_number",
                config:{
                    relates:[
                        {
                            relateField:["customername",'address'],
                            handler(info){
                                console.log(info)
                                if(info.customername === 'lelouch' && info.address === 'area11'){
                                    this.$emit('input',0);
                                }
                            },
                            config:{
                                immediate:true,
                            },
                        }
                    ],
                },
                default:0,
            },
            view:{
                name:"view_transform",
                // component:()=>import("@/components/common/views/view_transform").then((rst)=>rst.default),
                config:{
                    transform:function(data){
                        return "¥" + data;
                    },
                }
            },
        },
        address:{
            label:"收货地址",
            editorComponent:{
                name:"field_text",
                default:"",
            },
        },
        store:{
            label:"店铺",
            editorComponent:{
                name:"field_async_enum_select",
                config:{
                    httpRequest:getStore,
                    labelfield:"storename",
                    valuefield:"_id",
                },
                default:"",
            },
        },
        saler:{
            label:"销售",
            editorComponent:{
                name:"field_relates_enum_select",
                config:{
                    relates:[
                        {
                            invalidValue:"",
                            relateField:"store",
                        }
                    ],
                    httpRequest:getSaler,
                },
                default:"",
            },
        },
        nameAddress:{
            label:"用户名&收货地址",
            view:{
                join:{
                    customername:"name",
                    address:"position"
                },
                name:"test_view_join",
                // component:()=>import("@/components/book/views/test_view_join").then((rst)=>rst.default),
                config:{
                    glue:" 的收货地址是 ",
                },
            },
        }
    },
    staticOperators:[
        {
            name:"create",
            // component:()=>import("@/components/common/staticOperators/create").then((rst)=>rst.default),
            config:{
                getCreateFields:getCreateFields,
                doCreateRequest:createBook,
                triggerConfig:{
                    text:"新建订单",
                    type:"primary",
                },
                dialogConfig:{
                    size:"large",
                    title:"新建订单",
                },
                createBtnConfig:{
                    text:"确认创建",
                    type:"success",
                },
                cancelBtnConfig:{
                    text:"取消",
                },
            },
        },
        {
            handler(resolve){
                console.log(this.$attrs.formData);
                console.log(this.$attrs.selectedData)
                console.log(this.data)
                this.$message({
                    type:"warning",
                    message:"就把选中的取消选中"
                })
                resolve();
            },
            triggerConfig:{
                type:"danger",
                text:"删除多项",
            }
        },
        {
            name:"csv",
            // component:()=>import("@/components/common/staticOperators/csv").then((rst)=>rst.default),
            config:{
                triggerConfig:{
                    text:"导入csv数据",
                    type:"warning",
                },
                handleData:function(resolve,data){
                    console.log(data);
                    resolve();
                }
            }
        },
        {
            handler(resolve,data){
                // const keys = ['customername','totalprice','address'];
                // let rst = data.map((item)=>{
                //     return keys.map((key)=>{
                //         return item[key];
                //     }).join(",");
                // }).join("\r\n");
                
                // download(rst,"template.csv");
            },
            triggerConfig:{
                text:"下载CSV",
                type:"primary",
            },

        }
    ],
    listConfig:{
        selection:true,
        listRequest:getBookList,
        paginated:false,
    },
    filters:[
        {
            label:"客户名",
            field:"customername",
            editorComponent:{
                name:"field_string",
                config:{
                    placeholder:"请输入客户名"
                },
                default:"",
            }
        },
        {
            label:"金额",
            field:"totalprice",
            editorComponent:{
                name:"field_number",
                default:500,
            }
        },
    ],
    operators:[
        {
            handler(data,index,resolve){
                this.$message({
                    message:`${data.customername}再来一单`,
                    type:"success",
                    duration:2000
                });
                setTimeout(()=>{
                    resolve();
                },1000)
            },
            triggerConfig:{
                text:"再来一单",
                type:"success",
                size:"small"
            },
        },
    ],
}