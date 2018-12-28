import React, { Component } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Container, Header, Button, Text, Body, Right, Title, Content, Spinner, Footer, FooterTab, Left } from 'native-base';
import { connect } from 'react-redux';

// import actions
import { fetchMyProducts } from '../../public/redux/actions/products';

// import component
import ProductList from '../components/ProductList';

class MyProducts extends Component {
    componentDidMount() {
        // alert(this.props.auth.user[0]);
        console.log(this.props.auth.user[0].userId);
        this.props.dispatch(fetchMyProducts(this.props.auth.user[0].userId));
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
                        <Title>My Products</Title>
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
                        data={this.props.products.myProducts}
                        style={{ flex: 1, marginVertical: 20 }}
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
                                onPress={() => this.props.navigation.navigate('Home')}
                                transparent light
                            >
                                <Text>All Products</Text>
                            </Button>
                        </Left>

                        <Body />

                        <Right>
                            <Button
                                onPress={() => this.props.navigation.navigate('Add')}
                                transparent light
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

export default connect(mapStateToProps)(MyProducts);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});