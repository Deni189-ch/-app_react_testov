import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
};

it('new post should be added', () => {
    //готовит тестовые данные
    let action = addPostActionCreator('mi first test');

    //2.action
    let newState = profileReducer(state, action);
    //3. проверка
    expect(newState.posts.length).toBe(5)
});

it('message of new post should be -mi first test-', () => {
    //готовит тестовые данные
    let action = addPostActionCreator('mi first test');

    //2.action
    let newState = profileReducer(state, action);
    //3. проверка
    expect(newState.posts[4].length).toBe(5)
});

it('after deleting length of messages should be decrement', () => {
    //готовит тестовые данные
    let action = deletePost(1);

    //2.action
    let newState = profileReducer(state, action);
    //3. проверка
    expect(newState.posts.length).toBe(3)
});
