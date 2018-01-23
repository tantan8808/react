import React,{Component} from 'react';

class Comment extends Component{
  static defaultProps = {
    comment:{
      username: '',
      comment: '',
      createTime: ''
    },
    commentIndex: 0
  }

  constructor(){
    super();
    this.state = {
      createTimeStr: '',
      timer: null,
      showDel: false
    }
  }
  
  _dateToTime(date){
    var newDate = new Date(date);
    return newDate.toLocaleString();
  }

  _updateCreateTimer(){
    var nDate = new Date(this.props.comment.createTime);
    var durationTime = Math.floor((Date.now() - nDate)/1000);
    var createTimeStr = '';
    console.log(nDate.toLocaleString(),durationTime)
    if(durationTime<60)createTimeStr = '刚刚';
    else if(durationTime<3600)createTimeStr = Math.ceil(durationTime/60) + '分钟之前';
    else if(durationTime<86400)createTimeStr = Math.ceil(durationTime/3600) + '小时之前';
    else if(durationTime<2592000)createTimeStr = Math.ceil(durationTime/86400) + '天之前';
    else createTimeStr = this._dateToTime(this.state.createTime);
    
    this.setState({
      createTimeStr
    })
  }

  componentWillMount(){
    this._updateCreateTimer();
  }

  componentDidMount() {
      this.setState({
        timer: setInterval(()=>{
          this._updateCreateTimer()
        },10000)
      })
  }
  componentWillUnmount() {
    if(this.state.timer){
      clearInterval(this.state.timer);
      this.setState({
        timer: null
      });
    }
  }
  handleMouseOver(event){
    this.setState({
      showDel: true
    })
  }
  handleMouseOut(event){
    this.setState({
      showDel: false
    })
  }
  handleSubmitDel(){
    if(this.props.handleSubmitDel){
      this.props.handleSubmitDel(this.props.commentIndex);
    }
  }

  render(){
    return(
      <div style={{clear: 'both',overflow: 'hidden',borderBottom: '1px solid #e5e5e5',marginTop: '20px'}} onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
        <p className='float-left'>
          <span style={{color: 'darkblue'}}>{this.props.comment.username}:</span>
          <span style={{marginLeft: '20px'}}>{this.props.comment.comment}</span>
        </p>
        <p className='float-right'>
          <span>{this.state.createTimeStr}</span>
          <span onClick={this.handleSubmitDel.bind(this)} style={{color: '#FF0000',cursor: 'pointer',marginLeft: '10px',display: (this.state.showDel?'inline-block':'none')}}>删除</span>
        </p>
      </div>
    )
  }
}


export default Comment;