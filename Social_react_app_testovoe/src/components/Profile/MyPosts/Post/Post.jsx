import React from 'react';
import css from './Post.module.css';
import logo from '../../../../assets/images/user.png'

const Post = (props) => {
  return (
    <div className={css.item}>
        <img alt="img Loading..." src={logo} />
        { props.message }
      <div>
          <span>like</span> { props.likesCount }
      </div>
    </div>
  )
}

export default Post;