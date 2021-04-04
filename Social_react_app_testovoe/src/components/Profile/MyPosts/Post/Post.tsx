import React from 'react';
import logo from '../../../../assets/images/user.png';

import css from './Post.module.css';

type PostType = {
  message: string
  likesCount: number
}

const Post: React.FC<PostType> = ({message, likesCount}) => {
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