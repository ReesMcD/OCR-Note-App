import Home from '../components/Home'
import Edit from '../components/Edit'
import Camera from '../components/Camera'
import CamRoll from '../components/ViewPhotos'
import {TabNavigator, StackNavigator, addNavigationHelpers} from 'react-navigation'

const Tabs = TabNavigator({
  Home: {
    screen: Home
  },
  Camera: {
    screen: Camera
  },
})

const Routes = {
  Home: {
    screen: Tabs
  },
  Edit: {
    screen: Edit
  },
  CamRoll: {
    screen: CamRoll
  }
}

export default Routes
