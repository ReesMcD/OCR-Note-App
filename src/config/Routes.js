import Home from '../components/Home'
import Edit from '../components/Edit'
import Camera from '../components/Camera'
import CamRoll from '../components/ViewPhotos'
import {TabNavigator, StackNavigator, addNavigationHelpers} from 'react-navigation'

const Stack = StackNavigator({
  Camera: {
    screen: Camera,
  },
  Edit: {
    screen: Edit
  },
  CamRoll: {
    screen: CamRoll
  }
}, {
  //headerMode: 'screen' // if you dont want a top header
})

const Routes = {
  Home: {
    screen: Home
  },
  Camera: {
    screen: Stack
  }
}



export default Routes
