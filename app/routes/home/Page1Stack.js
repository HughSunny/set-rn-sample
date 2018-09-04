import {createStackNavigator} from "react-navigation";
import page1 from './homepage1'

const Page1Stack = createStackNavigator(
    {
      page1
      // page1:{
      //   screen:page1,
      //   navigationOptions: {
      //     header:null,
      //   }
      // } ,
    },
    {
      navigationOptions: {
        headerTitle:'homepage1',
        headerTitleStyle:{flex: 1,textAlign: 'center',},
      },
    }
)
export default Page1Stack;
