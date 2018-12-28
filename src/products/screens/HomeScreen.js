import React, { Component } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Container, Header, Button, Text, Body, Right, Title, Content, Footer, FooterTab, Left, Spinner } from 'native-base';
import { connect } from 'react-redux';

// import actions
import { fetch } from '../../public/redux/actions/products';

// import component
import ProductList from '../components/ProductList';

class HomeScreen extends Component {
    componentDidMount() {
        this.props.dispatch(fetch())
    }

    // Route
    handlePress = (Screen) => {
        this.props.dispatch({
            type: 'Navigation/NAVIGATE',
            routeName: Screen
        })
    }


    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Product List</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ color: "#FFF" }}>Logout</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <Content>
                    {
                        (this.props.products.isLoading == true) ?
                            <Spinner />
                            : null
                    }
                    <FlatList style={{ alignItems: 'center', marginLeft: 10, marginRight: 10 }}
                        data={this.props.products.products}
                        style={{ flex: 1, marginVertical: 10 }}
                        renderItem={({ item, index }) => (
                            <ProductList data={item} />
                        )}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Content>
                <Footer>
                    <FooterTab>
                        <Left>
                            <Button
                                transparent light
                                onPress={() => this.props.navigation.navigate('MyProducts')}
                            >
                                <Text>My Products</Text>
                            </Button>
                        </Left>

                        <Body />

                        <Right>
                            <Button
                                transparent light
                                onPress={() => this.props.navigation.navigate('Add')}
                            >
                                <Text>Add</Text>
                            </Button>
                        </Right>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products,
    auth: state.auth
})

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});