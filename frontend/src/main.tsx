import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./routes/home";
import ErrorPage from "./routes/error-page";
import Navbar from "./routes/navbar";
import TodoComponent from "./routes/todo-board";
import Sidebar from "./routes/todo-board-sidebar";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="todo-boards/" element={<Sidebar />}>
              <Route path="list" element={<TodoComponent type="List" />} />
              <Route path="board" element={<TodoComponent type="Board" />} />
              <Route
                path="calendar"
                element={<TodoComponent type="Calendar" />}
              />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
