import React,{Component} from 'react';
import Comment from './Comment';

class CommentList extends Component{
  static defaultProps = {
    comments: []
  }

  handleSubmitDel(commentIndex){
    if(this.props.handleSubmitDel){
      this.props.handleSubmitDel(commentIndex);
    }
  }

  render(){
    return(
      <div className='box-padding'>
        {
          this.props.comments.map((val,index)=>{            
            return(
              <Comment handleSubmitDel={this.handleSubmitDel.bind(this)} key={val.createTime} comment={val} commentIndex={index}/>
            )
          })
        }
      </div>
    )
  }
}


export default CommentList;