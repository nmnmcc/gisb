import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Router, Route } from "wouter";
import { Home } from "./page/Home";
import { Main } from "./layout/Main";
import { ArticleContainer } from "./component/Article";

import "./init";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HelmetProvider>
            <Main>
                <Router>
                    <Route path="/article/:id">
                        {({ id }) => <ArticleContainer id={id}></ArticleContainer>}
                    </Route>
                    <Route path="/" component={Home}></Route>
                </Router>
            </Main>
        </HelmetProvider>
    </StrictMode>,
);
