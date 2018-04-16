import React from "react";
const API = 'https://feed-challenge-api.herokuapp.com';
export default class Activities extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sharedActivities: [],
      postedActivities: [],
    }
  }
  render() {
    const { sharedActivities } = this.state;
    const { postedActivities } = this.state;

    return <div className="container">
      <div className="row">
        <div className="col-6">
          <h4>Shared Activities</h4>
          <ul class="list-group">
          {sharedActivities.map(share =>
            <li className="list-group-item" key={share.id}>
              <span>{share.id}. {share.url}</span>
            </li>
          )}
          </ul>
        </div>
        <div className="col-6">
          <h4>Posted Activities</h4>
          <ul class="list-group">
          {postedActivities.map(share =>
            <li className="list-group-item" key={share.id}>
              <span>{share.id}. {share.content}</span>
            </li>
          )}
          </ul>
        </div>
      </div>
    </div>;
  }
  componentDidMount(){
    fetch(API+'/activities')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      var postedStr = "";
      var sharedStr = "";
      data.map(function(item){
        if(item.verb === 'posted'){
          var lastChar = item.object.split(':', 3);
          postedStr += lastChar[1] + ','
        }else{
          var lastChar = item.object.split(':', 3);
          sharedStr += lastChar[1] + ','
        }
      });
      fetch(API+'/shares?ids='+sharedStr)
      .then(response => response.json())
      .then( shared => {
        console.log('share',shared);
        this.setState({ sharedActivities: shared })
      });
      fetch(API+'/posts?ids='+postedStr)
      .then(response => response.json())
      .then( posted => {
        console.log(posted);
        this.setState({ postedActivities: posted })
      });
    })
  }
}
