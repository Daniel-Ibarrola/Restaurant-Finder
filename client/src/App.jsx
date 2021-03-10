import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { RestaurantsContextProvider } from './context/RestaurantContext';
import Header from './components/Header';
import Home from './routes/Home';
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import UpdatePage from './routes/UpdatePage';
import Footer from './components/Footer';
import './App.css';

const App = () => {
    return (
        <RestaurantsContextProvider>  
            <Router>
                <Header />
                <div className="App Site">
                    <div className="Site-content">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/restaurants/:id/update" component={UpdatePage}/>
                            <Route exact path="/restaurants/:id" component={RestaurantdetailPage}/>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>        
        </RestaurantsContextProvider>
    
    )};

export default App;

