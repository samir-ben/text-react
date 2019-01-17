import React, { Component } from 'react';
import PostList from '../posts/PostList';
import Quote from '../layout/Quote'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedText: null,
        };
    }
    componentDidMount() {
    
    }
    // Récupérer la valeur sélectionnée
    handleSelection() {
        this.initializeSelectedText.bind(this);
        let selection = window.getSelection().toString()
        this.setState({
            selectedText: selection,
        })
    }
    // Initialise le state avant sélection
    initializeSelectedText() {
        this.setState({
            selectedText: null,
        })
    }
    reiceiveCallback(e) {
        e = null;
        this.setState({
            selectedText: e
        })
    }

    render() {
        if (this.state.selectedText) {
            console.log(this.state.selectedText)
        }
        const { posts, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return <div className='dashboard container'>
            <Quote quote={this.state.selectedText} callback={this.reiceiveCallback.bind(this)} />
            <div className='row'>
              <div className='para col s6' onClickCapture={this.handleSelection.bind(this)}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Duis in metus et erat iaculis iaculis eu non
                  tellus. Nam eu diam placerat nulla lobortis congue vel
                  in urna. Vivamus auctor interdum lectus ac fringilla.
                  Orci varius natoque penatibus et magnis dis parturient
                  montes, nascetur ridiculus mus. Maecenas non lobortis
                  neque. Sed at erat metus. Morbi vel ligula in dui
                  bibendum lacinia non vitae elit. Sed lacus dolor,
                  iaculis in lobortis eu, sodales vel turpis. Vivamus
                  sed tellus vel quam ultrices vestibulum. Phasellus id
                  arcu tellus. Curabitur quis ante quis lectus viverra
                  eleifend.
                </p>
              </div>
              <div className='col s4 offset-s2'>
                <PostList posts={posts} />
              </div>
            </div>
          </div>;
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts', orderBy: ['createdAt', 'desc'] }
    ])
)(Dashboard);