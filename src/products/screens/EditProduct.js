import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Header, Button, Text, Body, Card, Title, Content, Spinner, Input, Form, Item, Label, Icon, Left } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'

// import actions
import { editProduct } from '../../public/redux/actions/products';

// import component for redux form
import TextInput from '../../public/components/TextInput';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        const { data } = this.props.navigation.state.params
        this.state = {
            id: data._id,
            name: data.name,
            price: data.price,
            productImage: data.productImage,
            submitBy: data.submitBy,
            token: this.props.auth.token[0]['token']
        };
    }

    // Back
    onBackPress = _ => {
        const { dispatch } = this.props;
        dispatch(NavigationActions.back());
    }

    // Submit Edit
    handleSave = () => {
        // const value = { }
        // console.log('VALUE');
        // console.log(value);

        const newValue = { name: this.state.name, price: this.state.price, submitBy: this.props.auth.user[0].userId };
        console.log('NEW')
        console.log(newValue)

        const token = this.props.auth.token[0];
        // console.log('TOKEN')
        // console.log(token)

        this.props.dispatch(editProduct(this.state.id, newValue, token))
            .then((res) => {
                this.handlePress('Home');
                console.log(res)
            })
            .catch(err => alert(err));
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
                    <Left>
                        <Icon name="arrow-back" style={{ fontSize: 25, color: "#FFF" }}
                            onPress={() => this.onBackPress()}
                        />
                    </Left>
                    <Body>
                        <Title>Edit Product</Title>
                    </Body>
                </Header>
                <Content>
                    {
                        (this.props.products.isLoading == true) ?
                            <Spinner />
                            : null
                    }
                    <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input
                                value={this.state.name}
                                onChangeText={
                                    (text) => this.setState({
                                        name: text
                                    })
                                }
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Price</Label>
                            <Input
                                keyboardType='numeric'
                                value={this.state.price.toString()}
                                onChangeText={
                                    (text) => this.setState({
                                        price: text
                                    })
                                }
                            />
                        </Item>
                    </Form>

                    <View style={{ justifyContent: 'center', marginTop: 10 }}>
                        <Button full primary
                            style={{ marginBottom: 1 }}
                            // onPress={this.props.handleSubmit(this.handleSave)}>
                            onPress={() => this.handleSave()}>
                            <Text> Submit </Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapsStateToProps = (state) => ({
    products: state.products,
    auth: state.auth
})

const mapDispatchToProps = dispatch => {
    return {
        editProduct: (id, data, token) => dispatch(editProduct(id, data, token))
    }
}

Edit = connect(mapsStateToProps, mapDispatchToProps)(EditProduct)

export default reduxForm({
    form: 'edit'
})(Edit);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const inputStyle = {
    width: 330,
    height: 44,
    borderRadius: 2,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 0.3,
    borderColor: '#000',
    color: '#000'
}