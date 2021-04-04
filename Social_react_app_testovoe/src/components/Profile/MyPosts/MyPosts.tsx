import React from 'react';
import {Field, reduxForm} from "redux-form";

import {MaxLengthCreator, required} from "../../../utils/validator/Validarors";
import {Textarea} from "../../common/FormsControls/FormsControls";
import Post from './Post/Post';

import css from './MyPosts.module.css';

type MyPostsType = {
    posts: any
    addPost: any
}
const MyPosts: React.FC<MyPostsType> = React.memo(({ posts, addPost }) => {
    let pro  =[...posts]
    let postsElements =
        pro.reverse().map(({id, message, likesCount}) => <Post key={id} message={message} likesCount={likesCount}/>);

    let onAddPost = (formaData: any) => {
        addPost(formaData.newPostText);
    }

    return (
        <div className={css.postsBlock}>
            <h3>My posts</h3>

            <AddPostFormRedux onSubmit={onAddPost}/>

            <div className={css.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const maxLength = MaxLengthCreator(10)

type AddPostFormType = {
    handleSubmit: any
}
const AddPostForm: React.FC<AddPostFormType> = ({ handleSubmit }) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={Textarea} name='newPostText' placeholder={'Post message'}
                    validate={[ required, maxLength ]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const AddPostFormRedux = reduxForm({form: 'AddPostFromState'})(AddPostForm);

export default MyPosts;