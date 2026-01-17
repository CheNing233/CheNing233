# Redux 模式

Redux 是一个用于管理 JavaScript 应用状态的容器，它帮助开发者以可预测的方式管理应用的状态，尤其适合像 React 这样依赖单向数据流动的框架。Redux 的核心概念围绕着 `Store`、`State`、`Action`、`Reducer`、`Dispatch` 等几个重要角色，下面会详细介绍每个角色的作用及其在状态管理中的责任。

Redux 是一个用于管理 JavaScript 应用状态的容器，它帮助开发者以可预测的方式管理应用的状态，尤其适合像 React 这样依赖单向数据流动的框架。Redux 的核心概念围绕着 `Store`、`State`、`Action`、`Reducer`、`Dispatch` 等几个重要角色，下面会详细介绍每个角色的作用及其在状态管理中的责任。

### 1. **Store (存储)**

**作用**：  
Redux 中的 `Store` 是整个应用的状态容器。它保存着整个应用的状态树，并提供了一些方法来访问状态、分发 action 以及订阅状态的变化。

**特点**：
- **唯一性**：整个应用只有一个 Store。
- **状态的持久化**：所有的状态数据都存储在 `Store` 中，并且状态是只读的，不能直接修改。

**主要 API**：
- `getState()`：获取当前的状态树。
- `dispatch(action)`：发出一个 action，触发状态变更。
- `subscribe(listener)`：注册监听器，每当状态发生变化时，调用注册的回调函数。

```javascript
import { createStore } from 'redux';
import rootReducer from './reducers';

// 创建 Store
const store = createStore(rootReducer);
```

### 2. **State (状态)**

**作用**：  
`State` 是存储在 `Store` 中的数据，它代表了应用的当前状态。在 Redux 中，`State` 是一个只读对象，不能直接修改它。唯一改变 `State` 的方式是通过分发 (`dispatch`) 一个 `Action` 来触发状态的更新。

**特点**：
- **不可直接修改**：你不能直接修改 `State`，而是通过 `Reducer` 来产生新的状态。
- **单一数据源**：整个应用的状态以树形结构保存在一个对象中。

```javascript
// 示例状态
const initialState = {
  todos: [],
  user: null,
};
```

### 3. **Action (动作)**

**作用**：  
`Action` 是描述状态变化的一个对象，它是 Redux 中唯一能改变状态的“指令”。`Action` 对象通常包含一个 `type` 字段来描述动作的类型，以及一个可选的 `payload` 字段来传递数据。`Action` 通过 `dispatch` 方法发出。

**特点**：
- **纯对象**：`Action` 是一个普通的 JavaScript 对象，必须包含一个 `type` 字段来说明状态变更的目的。
- **数据携带**：可以通过 `payload` 来传递与状态变更相关的数据。

**示例**：
```javascript
const ADD_TODO = 'ADD_TODO';

// Action 创建器
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: text,
});
```

### 4. **Reducer (处理器)**

**作用**：  
`Reducer` 是一个纯函数，它接收当前的状态 (`state`) 和 `action`，根据 `action` 的类型来返回新的状态。每当 `Store` 接收到一个 `Action` 时，`Reducer` 会被调用来计算更新后的状态。

**特点**：
- **纯函数**：`Reducer` 不会产生副作用，不依赖外部数据或修改传入的参数，它总是返回新状态。
- **不可变性**：`Reducer` 中不会直接修改 `state`，而是返回一个新的状态对象。

**示例**：
```javascript
const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
};
```

### 5. **Dispatch (分发)**

**作用**：  
`dispatch` 是 `Store` 上的一个方法，用于将 `Action` 分发给 `Reducer`。通过 `dispatch`，开发者可以触发状态的更新，并且整个应用的状态会按照 `Reducer` 的逻辑进行更新。

**特点**：
- **触发状态变更**：`dispatch` 方法通过发送 `action` 触发 `Reducer`，计算出新的状态。
- **全局通知**：当状态更新时，所有注册的监听器会收到通知，进而更新对应的组件。

**示例**：
```javascript
// 通过 dispatch 触发 action
store.dispatch(addTodo('Learn Redux'));
```

### 6. **Subscriber (订阅者)**

**作用**：  
订阅者是一个函数，当状态发生变化时会被调用。你可以通过 `store.subscribe` 方法注册一个监听器，每当状态更新时，监听器会被触发。通常在 React 应用中，`Subscriber` 由 `React-Redux` 库的 `connect` 或 `useSelector` 负责自动订阅。

**特点**：
- **订阅状态更新**：可以通过 `subscribe` 方法监听状态的变化，通常用来更新 UI。
- **监听状态变化**：每当 `dispatch` 触发 `Reducer` 更新状态时，订阅者会收到通知。

```javascript
// 订阅状态更新
store.subscribe(() => {
  console.log(store.getState());
});
```

---

### **Redux 数据流过程总结**

1. **用户操作触发 Action**：用户在界面上操作（如点击按钮、输入数据）时，会触发 `Action`。
2. **Dispatch Action**：开发者通过 `dispatch` 方法将 `Action` 发给 `Store`。
3. **Reducer 处理 Action**：`Store` 接收到 `Action` 后，会调用对应的 `Reducer` 来处理，并返回新的状态。
4. **State 更新**：根据 `Reducer` 的返回值，`Store` 更新状态。
5. **通知订阅者**：状态变化后，`Store` 会通知所有的订阅者，订阅者可以使用最新的状态更新视图。

---

### **Redux 适合的场景**

Redux 的状态管理方式非常适合像 React 这种单向数据流动的框架。由于 React 是通过组件层级自上而下传递数据的，当应用变得复杂时，跨组件传递数据可能会变得冗长且难以维护。Redux 将应用的状态集中管理，能够使数据流变得更加明确和可预测。

**Redux 优势**：
- **单向数据流**：Redux 强调的单向数据流与 React 的数据流动模式完全契合，状态只从 `Store` 向下传递，确保数据的流动清晰、可控。
- **集中式管理**：所有的状态都集中在 `Store` 中，便于调试和管理。
- **中间件扩展**：通过中间件（如 `redux-saga`、`redux-thunk`）可以灵活处理复杂的异步操作。

### **总结**

- `Store` 负责存储应用的状态。
- `State` 是应用的当前状态，只能通过 `Reducer` 更新。
- `Action` 是用于描述状态变更的对象，必须通过 `dispatch` 发送给 `Store`。
- `Reducer` 是纯函数，接收 `State` 和 `Action`，返回新的状态。
- `Dispatch` 用于触发 `Reducer`，进而更新状态。
- `Subscriber` 监听状态的变化并进行相应处理（如 UI 更新）。