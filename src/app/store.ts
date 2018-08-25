import { ITodo } from './todo';

// importing the action types
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, REMOVE_ALL_TODOS } from './actions';

// determines the state of the store, but with Object.assign we can break this and using "tassign" and add new properties on the fly
export interface IAppState {
    // will determine what properties we are going to have in our store
    todos: ITodo[];
    lastUpdate: Date;
}

export const INITIAL_STATE: IAppState = {
    todos: [],
    lastUpdate: null
};

/*
The state is the previous state of the application and action is an object describing the change which has been dispatched.
*/
function addToDo(state, action) {
    action.todo.id = state.todos.length + 1;

    // Object.assign combines multiple objects into one object
    // target object: {}
    // source object: {}
    return Object.assign({}, state, {
        todos: state.todos.concat(Object.assign({}, action.todo)),
        lastUpdate: new Date()
    });
}

function toggleToDo(state, action) {
    const todo = state.todos.find(t => t.id === action.id);
        console.log('Item to be deleted' + JSON.stringify(todo));
        const index = state.todos.indexOf(todo);
        console.log('Index of completed item:' + index);
        // https://codeburst.io/javascript-es6-the-spread-syntax-f5c35525f754
        return Object.assign({}, state, {
            todos: [
                ...state.todos.slice(0, index), // will give a new array from index 0to 1 before the completed element
                Object.assign({}, todo, {isCompleted: !todo.isCompleted}),
                ...state.todos.slice(index + 1) // will give the rest of theremaining array
            ],
            lastUpdate: new Date()
        });
    }

function removeToDo(state, action) {
    return Object.assign({}, state, {
        todos: state.todos.filter(t => t.id !== action.id),
        lastUpdate: new Date()
    });
}

function removeAllToDo(state, action) {
    return Object.assign({}, state, {
        todos: [],
        lastUpdate: new Date()
    });
}

// used EXTRACT FUNCTION REFACTORING to reduce the size of rootReducer - refactor fat-case statements
export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case ADD_TODO: return addToDo(state, action);
        case TOGGLE_TODO: return toggleToDo(state, action);
        case REMOVE_TODO: return removeToDo(state, action);
        case REMOVE_ALL_TODOS: return removeAllToDo(state, action);
    }
    return state;
}
