import './App.css';
import {Route,Routes} from 'react-router-dom';
import Searchpage from './components/Searchpage';
import Restpage from './components/Restpage';
import Homepage from './components/Homepage';
import Itemspage from './components/Itemspage';
import Cartpage from './components/Cartpage';
import Checkouts from './components/Checkouts';
import RestaurantPort from './components/RestaurantPort';
import GeoLoc from './components/GeoLoc';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/restaurants/:restID' element={<Restpage/>}/>
        <Route path='/search' element={ <Searchpage/>}/>
        <Route path='/items' element={<Itemspage/>}/>
        <Route path='/cart' element={<Cartpage/>}/>
        <Route path='/checkouts' element={<Checkouts/>}/>
        <Route path='/restaurants/:restID/restaurantport/:restaurantID' element={<RestaurantPort/>}/>
        <Route path='/geoloc' element={<GeoLoc/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App;
