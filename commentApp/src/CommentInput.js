import React,{Component} from 'react';
import {Button} from 'antd';

const fullWidth = {
  width: '100%'
}
const verticalTop = {
  verticalAlign: 'top'
}

class CommentInput extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      comment: ''
    }
  }
  componentWillMount(){
    this._loadUserName();
  }
  componentDidMount(){
    this.textAreaInput.focus();
  }
  
  handleUserNameChange(event){
    this.setState({
      username: event.target.value
    })
  }
  handleSubmit(event){
    if(this.props.onSubmit){
      const {username,comment} = this.state;
      this.props.onSubmit({
        username,
        comment,
        createTime:Date.now()
      })
    }
    this.setState({
      comment: ''
    });
  }
  
  handleCommentChange(event){
    this.setState({
      comment: event.target.value
    })
  }

  _loadUserName(){
    if(localStorage.username){
      this.setState({
        username: localStorage.username
      })
    }
  }
  _saveUserName(event){
    localStorage.username = this.state.username;
  }

  render(){
    return(
      <div className='box-padding'>
        <table className='comment-input-wrap' style={{...fullWidth}}>
          <tbody>
            <tr>
              <td>用户名</td>
              <td><input value={this.state.username} onChange={this.handleUserNameChange.bind(this)} onBlur={this._saveUserName.bind(this)} type="text" style={{...fullWidth}}/></td>
            </tr>
            <tr style={{...verticalTop}}>
              <td>评论内容</td>
              <td><textarea value={this.state.comment} onChange={this.handleCommentChange.bind(this)} ref={(input)=>this.textAreaInput=input} cols="30" rows="10" style={{...fullWidth}}></textarea></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <p style={{textAlign: 'right'}}>
                  <Button type='primary' onClick={this.handleSubmit.bind(this)}>提交</Button>
                  {/* <span className='btn btn-primary' onClick={this.handleSubmit.bind(this)}>提交</span> */}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}


export default CommentInput;