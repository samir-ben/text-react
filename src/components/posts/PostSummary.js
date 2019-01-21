import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

const PostSummary = ({ post }) => {
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{post.title}</span>
                <p className="post-list-citation truncate">Citation: «{post.quote}»</p>
                <p>Posté par {post.authorFirstName} {post.authorLastName}</p>
                <p className="grey-text">{moment(post.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    )
}

export default PostSummary;