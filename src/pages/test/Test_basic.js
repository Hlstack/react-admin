import React from 'react';

import FieldString from "@/components/common/editor/FieldString"
import FieldText from "@/components/common/editor/FieldText"
import FieldPwd from "@/components/common/editor/FieldPwd"

export default class Test_basic extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            FieldString:"",
            FieldText:"",
            FieldPwd:"",
        };
        this.handleFieldStringChange = this.handleChange.bind(this,'FieldString');
        this.handleFieldTextChange = this.handleChange.bind(this,'FieldText');
        this.handleFieldPwdChange = this.handleChange.bind(this,'FieldPwd');
    }

    handleChange(field,value){
        // console.log(value);
        this.setState({
            [field]:value,
        })
    }

    renderFieldString(){
        return (
            <tr>
                <td>FieldString</td>
                <td>{this.state.FieldString}</td>
                <td>
                    <FieldString
                        value={this.state.FieldString}
                        onChange={this.handleFieldStringChange}
                        placeholder="请输入"
                    ></FieldString>
                </td>
            </tr>
        )
    }

    renderFieldText(){
        return (
            <tr>
                <td>FieldText</td>
                <td>{this.state.FieldText}</td>
                <td>
                    <FieldText
                        value={this.state.FieldText}
                        onChange={this.handleFieldTextChange}
                        placeholder="测试textarea"
                    ></FieldText>
                </td>
            </tr>            
        )
    }

    renderFieldPwd(){
        return (
            <tr>
                <td>FieldPwd</td>
                <td>{this.state.FieldPwd}</td>
                <td>
                    <FieldPwd
                        value={this.state.FieldPwd}
                        onChange={this.handleFieldPwdChange}
                        placeholder="测试FieldPwd"
                    ></FieldPwd>
                </td>
            </tr>            
        )
    }

    render(){
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>组件名</th>
                        <th>组件值</th>
                        <th>组件实例</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderFieldString()}
                    {this.renderFieldText()}
                    {this.renderFieldPwd()}
                </tbody>
            </table>
        )
    }
}