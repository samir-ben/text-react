import React, { Component } from 'react';
import PostList from '../posts/PostList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        const { posts, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return <div className='dashboard container'>
            <div className='row'>
              <div className='para col s6'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in metus et erat iaculis iaculis eu non tellus. Nam eu diam placerat nulla lobortis congue vel in urna. Vivamus auctor interdum lectus ac fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas non lobortis neque. Sed at erat metus. Morbi vel ligula in dui bibendum lacinia non vitae elit. Sed lacus dolor, iaculis in lobortis eu, sodales vel turpis. Vivamus sed tellus vel quam ultrices vestibulum. Phasellus id arcu tellus. Curabitur quis ante quis lectus viverra eleifend.</p>
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