import React, { Component } from 'react'
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import RecipeList from './Components/RecipeList';
import FormRecipe from './Components/FormRecipe';
import './CSS/Main.css'

export default class Main extends Component {
    render() {
        const activeNavStyle = {
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            height: '100%',
            width: '100 %',
            textDecoration: 'underline',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
        }
        return (
            <BrowserRouter >
                <h1 id="header-title">Cook Book</h1>

                <nav>
                    <ul className="nav-links">
                        <li><NavLink activeStyle={activeNavStyle} exact to='/' activeClassName="selectedLink">Recipes</NavLink></li>
                        <li><NavLink activeStyle={activeNavStyle} to='/new' >Add New Recipe</NavLink></li>
                        {/* <li><NavLink to='/random'>Random Suggestion</NavLink></li> */}
                    </ul>
                </nav>

                <div id="content">
                    <Route exact path="/" component={RecipeList} />
                    <Route path="/new" component={FormRecipe} />
                    {/* <Route path="/random" component={<>To be built</>} /> */}
                </div>
            </BrowserRouter >

        )
    }
}
