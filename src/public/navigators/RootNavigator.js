import { createStackNavigator, createAppContainer } from 'react-navigation';

// IMPORT SCREEN
import Login from '../../login/screens/Login'
import Register from '../../register/screens/Register';

import HomeScreen from '../../products/screens/HomeScreen';
import MyProducts from '../../products/screens/MyProducts';
import AddProduct from '../../products/screens/AddProduct';
import EditProduct from '../../products/screens/EditProduct';

const AppNavigator = createStackNavigator({
    Login: Login,
    Register, Register,
    Home: HomeScreen,
    MyProducts: MyProducts,
    Add: AddProduct,
    Edit: EditProduct
},
{
        headerMode: "none"
        // defaultNavigationOptions: {
        //     title: "Product List",
        // }
    }
)
export default createAppContainer(AppNavigator);