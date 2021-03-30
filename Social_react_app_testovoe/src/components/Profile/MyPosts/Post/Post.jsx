import React from 'react';
import logo from '../../../../assets/images/user.png';

import css from './Post.module.css';

const Post = ({message, likesCount}) => {
  return (
    <div className={css.item}>
        <img alt="img Loading..." src={logo} />
        { message }
      <div>
          <span>like</span> { likesCount }
      </div>
    </div>
  )
}

export default Post;