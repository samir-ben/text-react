import React, { Component } from 'react';
import PostList from '../posts/PostList';
import Quote from '../layout/Quote'
import AddPost from '../posts/AddPost'
import VerseItem from '../layout/Verse-item';
import { Modal, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedText: null
    };
  }
  // Récupérer la valeur sélectionnée
  handleSelection() {
    this.initializeSelectedText.bind(this);
    let selection = window.getSelection().toString();
    this.setState({
      selectedText: selection
    });
  }
  // Initialise le state avant sélection
  initializeSelectedText() {
    this.setState({
      selectedText: null
    });
  }
  reiceiveCallback(e) {
    e = null;
    this.setState({
      selectedText: e
    });
  }
  renderButtonModal = () => {
    if (!this.state.selectedText) {
      return (
        <div className='fixed-action-btn'>
          <Button className='btn-floating btn-large disabled'>
            <i className='material-icons'>create</i>
          </Button>
        </div>
      );
    } else {
      return (
        <div className='fixed-action-btn'>
          <Button className='btn-floating btn-large blue pulse'>
            <i className='material-icons'>create</i>
          </Button>
        </div>
      );
    }
  };
  renderVerseList = () => {
    const { verses } = this.props.verses;
    if (verses) {
      return verses.map(verse => {
        return <VerseItem key={verse.id} verses={verse.verse} />;
      });
    }
  };

    renderPostList = () => {
        const { auth, posts } = this.props;
        let arrayPost = {};
        if (this.props.posts) {
            const postFiltered = posts.filter(post => {
                return post.authorId === auth.uid;
            });
            postFiltered[arrayPost] = postFiltered;
            return <div className='col s5 offset-s1'>
                <p className='postlist-title'>Commentaires:</p>
                <PostList posts={postFiltered} />
              </div>;
        }
    };

  selectionHighLight() {
    var arrayText = [];
    var text = this.props.verses.verses.map(verse => {
      return `${verse.verse}`;
    });
    arrayText.push(text);
    let arrayComment = [];
    if (this.state.posts) {
      const comment = this.props.posts.map(post => {
        return `${post.quote}`;
      });
      arrayComment.push(comment);
      comment.map(com => {
        return (document.getElementById(
          'text'
        ).innerHTML = document
          .getElementById('text')
          .innerHTML.replace(
            com,
            `<span class="highligth tooltipped" data-position="top" data-tooltip="Passage commenté">${com}</span>`
          ));
      });
    }
  }
  render() {
    if (this.props.posts) {
      this.selectionHighLight();
    }
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />;
    return (
      <div className='dashboard'>
        <Quote
          quote={this.state.selectedText}
          callback={this.reiceiveCallback.bind(this)}
        />
        <div className='dashboard container'>
          <div className='row'>
            <div
              id='text'
              className='col s6 main-card card-panel z-depth-2'
              onClickCapture={this.handleSelection.bind(this)}
            >
              {this.renderVerseList()}
            </div>

            {this.renderPostList()}
          </div>
          <Modal
            className='modal'
            fixedFooter
            trigger={this.renderButtonModal()}
          >
            <div className='selection-form'>
              <h5>Passage selectionné</h5>
              <p>«{this.state.selectedText}»</p>
            </div>
            <AddPost
              quote={this.state.selectedText}
              callback={this.reiceiveCallback.bind(this)}
            />
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        verses: state.verses,
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts', orderBy: ['createdAt', 'desc'] }
    ])
)(Dashboard);