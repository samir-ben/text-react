import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteNote } from '../../store/actions/postActions';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.state);
      this.props.deleteNote(this.props.match.params.id);
    this.props.history.push('/');
  };

  renderDelete = () => {
    const { auth, post } = this.props;
    if (auth.uid === post.authorId){
      return <i className="material-icons delete-icon" onClick={this.handleSubmit}>delete</i>
    }
  }

  render() {
    const { post, auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />;
    if (this.state.redirect) return <Redirect to='/' />;
    if (post) {
      console.log('post', post, 'aut',auth);

      return <div className='container section post-details'>
        <div className='card z-depth-3'>
          {this.renderDelete()}
            <div className='card-content post-detail'>
            <h3 className=''><span className="black-text">Titre : {post.title}</span></h3>
              <h3>Passage selectionné :</h3>
              <p>«{post.quote}»</p>
              <h3>Commentaire:</h3>
              <p>{post.content}</p>
            </div>
            <div className='card-action grey lighten-4 grey-text'>
              <div>
                Posté par {post.authorFirstName} {post.authorLastName}
              </div>
              <div>{moment(post.createdAt.toDate()).calendar()}</div>
            </div>
          </div>
        </div>;
    } else {
      return (
        <div className='container center'>
          <p>Chargements des commentaires...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const posts = state.firestore.data.posts;
    const post = posts ? posts[id] : null;
    return {
        post: post,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteNote: (post) => dispatch(deleteNote(post))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts' }
    ])
)(PostDetails);