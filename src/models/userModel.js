import {
    genderEnum,
    typEnum,
    typHash,
    getPrivilege,
    getCreateFields,
    createUser,
    getUserList,
    getUserDetail,
    getEditUserInfo,
    editUser,
    delUser,
} from "@/server/user.js"

import {
    setReactComponentFlag
} from "@/widget/injectComponents"

import viewEnum from "@/components/common/views/viewEnum"

import {
    Message
} from "element-react"

setReactComponentFlag(viewEnum)

export default{
    fieldList:{
        name:{
            label:'用户名',
            editorComponent:{
                name:"FieldString",
                config:{
                    placeholder:'请输入用户名',
                },
                editConfig:{
                    placeholder:"测试editconfig"
                },
                default:'3',
            },
            view:{
                handler(data,config,record){
                    return config.prefix + data;
                },
                config:{
                    prefix:"用户名"
                }
            },
            validator:[
                {
                    validator:function(rule,value,cb){
                        if(value.length<2){
                            cb([new Error("姓名最少两个字符")])
                        }else{
                            cb()
                        }
                    }
                }
            ],
        },
        password:{
            label:'密码',
            editorComponent:{
                name:"FieldPwd",
                config:{
                    placeholder:'请输入密码',
                },
                default:'',
            },
            validator:[
                {
                    validator(rule,value,cb){
                        if(value.length>15){
                            cb([new Error('密码位数最多为15位')])
                        }else{
                            cb();
                        }
                    }
                }

            ],
        },
        gender:{
            label:'性别',
            editorComponent:{
                // TODO fieldsex
                name:"FieldString",
                default:0,
            },
            view:{
                component:()=>import("@/components/common/views/viewEnum").then((rst)=>rst.default),
                config:{
                    enums:genderEnum,
                },
            },
            tip:"暂不支持LGBT",
            tableColumnConfig:{
                align:"center"
            },
        },
        typ:{
            label:'类型',
            editorComponent:{
                name:"FieldEnumSelect",
                config:{
                    candidate:typEnum,
                    valuefield:'value',
                    labelfield:'label',
                },
                default:0,
            },
            view:{
                component:viewEnum,
                // component:()=>import("@/components/common/views/view_enum").then((rst)=>rst.default),
                config:{
                    enums:typHash
                },
            },
            labelComponent:{
                default:{
                    component:()=>import("@/components/user/labels/LabelRedStar").then(rst=>rst.default),
                },
                info:{
                    component:()=>import("@/components/user/labels/LabelRedStar").then(rst=>rst.default),
                }
                
            },
        },
        privilege:{
            label:'权限',
            editorComponent:{
                name:"FieldString",
                // TODO fieldRelatesTag
                // name:"field_relates_tag",
                // config:{
                //     httpRequest:getPrivilege,
                //     labelfield:'name',
                //     valuefield:'id',
                //     relates:[
                //         {
                //             invalidValue:0,
                //             relateField:'typ',
                //             requestField:'req_typ',
                //         }
                //     ],
                // },
                default(){
                    return [];
                },
            },
            colspan:{
                create:3,
                edit:3,
            }
        },
        desc:{
            label:"备注",
            editorComponent:{
                // TDOD 
                name:"FieldTextRich",
                default:"这是富文本编辑器蛤",
            },
            view:{
                component:()=>import("@/components/common/views/viewHTML").then(rst=>rst.default)
            },
            colspan:{
                create:3,
                edit:3,
                info:3,
            }
        }
    },
    staticOperators:[
        {
            name:"create",
            component:()=>import("@/components/common/staticOpetators/Create").then((rst)=>rst.default),
            config:{
                getCreateFields:getCreateFields,
                doCreateRequest:createUser,
                triggerConfig:{
                    text:"新建用户",
                    type:"primary",   
                },
                dialogConfig:{
                    size:"large",
                    title:"新建用户",
                },
                createBtnConfig:{
                    text:"确认创建",
                    type:"success",
                },
                cancelBtnConfig:{
                    text:"取消",
                },


            }
        },

    ],
    filters:[
        {
            label:"姓名",
            field:"username",
            editorComponent:{
                name:"FieldString",
                config:{
                    placeholder:"请输入用户姓名",
                },
                default:"",
            },
        },
        // {
        //     label:"类型",
        //     field:"typ",
        //     editorComponent:{
        //         name:"filter_enum",
        //         config:{
        //             candidate:typEnum,
        //             allvalue:-1,
        //             alllabel:"全部",
        //         },
        //         default:-1,
        //     },
        // },
        // {
        //     label:"权限",
        //     field:"privilege",
        //     editorComponent:{
        //         name:"filter_relates_enum",
        //         config:{
        //             httpRequest:getPrivilege,
        //             valuefield:"id",
        //             labelfield:"name",
        //             placeholder:"请选择权限",
        //             allvalue:"all",
        //             alllabel:"不限",
        //             relates:[
        //                 {
        //                     invalidValue:-1,
        //                     relateField:'typ',
        //                     requestField:'req_typ',
        //                 }
        //             ],
        //             handleInvalidRelateIds(){
        //                 this.$emit("input","all");
        //             },

        //         },
        //         default:"all",
        //     },
        // },
        {
            label:"自定义filter",
            field:"test",
            editorComponent:{
                config:{
                    msg:"测试自定义filter",
                    relates:[
                        {
                            relateField:"username",
                            handler(newVal){
                                if(newVal === 'lelouch'){
                                    this.props.onChange("naive")
                                }
                            }
                        },
                    ],
                },
                component:()=>import("@/components/user/editor/TestCustomFilter").then((rst)=>rst.default),
                default:"test",
            },
            watch:true,
        }
    ],
    filterOperators:[
        {
            name:"reset",
            component:()=>import("@/components/common/filterOperators/Reset").then((rst)=>rst.default),
        },
    ],
    listConfig:{
        listRequest:getUserList,
        sortFields:['typ'],
        paginationConfig:{
            layout:"total, sizes, prev, pager, next, jumper",
            pageSizes:[2,10,20,50],
        },
        selection:true,

        pageSizes:[10,20,30,50],
    },
    operators:[
        {
            name:"Info",
            component:()=>import("@/components/common/operators/Info").then((rst)=>rst.default),
            config:{
                getDetailInfo:getUserDetail,
                triggerConfig:{
                    text:"查看详情",
                    size:"small",
                    type:"primary",
                },
                dialogConfig:{
                    title:"用户详情",
                },
            },
        },
        {
            name:"edit",
            component:()=>import("@/components/common/operators/Edit").then((rst)=>rst.default),
            config:{
                getEditInfo:getEditUserInfo,
                doEditRequest:editUser,
                autoValidate:false,
                reserveFields:['id'],
                triggerConfig:{
                    text:"编辑",
                    size:"small",
                    type:"primary",
                },
                dialogConfig:{
                    size:"large",
                    title:"编辑用户",
                },
                editBtnConfig:{
                    type:"primary",
                    text:"确定编辑",
                },
                cancelBtnConfig:{
                    text:"取消",
                },
            }
        },
        {
            handler(resolve,data){
                Message({
                    message:`${data.name}不要总想着搞个大新闻`,
                    type:"success",
                    duration:2000,
                })

                setTimeout(()=>{
                    resolve();
                },1000)
            },
            triggerConfig:{
                text:"搞个大新闻",
                type:"warning",
                size:"small",
            },
        },
        {
            name:"delete",
            component:()=>import("@/components/common/operators/Delete").then((rst)=>rst.default),
            config:{
                doDeleteRequest:delUser,
                triggerConfig:{
                    text:"删除用户",
                    type:"danger",
                    size:"small",
                },
            }
        },
        {
            name:"toggle",
            // component:()=>import("@/components/common/operators/toggle").then((rst)=>rst.default),
            config:{
                descriptor:[
                    {value:0,text:"更改性别为女",type:"warning"},
                    {value:1,text:"更改性别为男",type:"danger"},
                ],
                field:"gender",
                handleToggle(resolve,data){
                    console.log(data);
                    resolve();
                },
                reserveFields:['id'],
                triggerConfig:{
                    size:"small"
                },
            }
        }

    ],
}