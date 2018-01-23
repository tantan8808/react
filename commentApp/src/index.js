import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import styles from './index.scss';

import CommentList from './CommentList';
import CommentInput from './CommentInput';

import registerServiceWorker from './registerServiceWorker';
class App extends Component{
  constructor(){
    super();
    this.state = {
      comments: []
    }
  }
  componentWillMount() {
    this._loadComments();  
  }

  _loadComments(){
    if(localStorage.comments){
      this.setState({
        comments: JSON.parse(localStorage.comments)
      });
    }
  }

  handleSubmitDel(commentIndex){
    this.insertComments(commentIndex,1);
  }

  insertComments(startIndex,count,comment){
    var comments = this.state.comments;
    if(count===0 && comment)comments.splice(startIndex,count,comment);
    else comments.splice(startIndex,count);

    this.setState({
      comments
    });

    localStorage.comments = JSON.stringify(comments);
  }

  onSubmit(comment){
    this.insertComments(0,0,comment);
  }

  render(){
    var commentWrapStyle = {
      width: '60%',
      margin: '0 auto',
      backgroundColor: '#FFF'
    };

    return(
      <div style={commentWrapStyle}>
        <CommentInput onSubmit={this.onSubmit.bind(this)} />
        <div style={{padding: '20px 0',backgroundColor: styles.backgroundColor}}></div>
        <CommentList handleSubmitDel={this.handleSubmitDel.bind(this)} comments={this.state.comments} />
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
