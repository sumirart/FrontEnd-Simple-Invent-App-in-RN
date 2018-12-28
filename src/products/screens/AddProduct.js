import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Header, Button, Text, Body, Card, Title, Content, Left, Icon } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'

// import actions
import { addProduct } from '../../public/redux/actions/products';

// import component for redux form
import TextInput from '../../public/components/TextInput';

class AddProduct extends Component {

    // Back
    onBackPress = _ => {
        const { dispatch } = this.props;
        dispatch(NavigationActions.back());
    }

    // Submit/Add
    handleSave = (value) => {
        const newValue = { ...value, submitBy: this.props.auth.user[0].userId };
        const token = this.props.auth.token[0];
        this.props.dispatch(addProduct(newValue, token))
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
                            onPress={() => this.onBackPress() }
                        />
                    </Left>
                    <Body>
                        <Title>Add Product</Title>
                    </Body>
                    {/* <Right>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ color: "#FFF" }}>Logout</Text>
                        </TouchableOpacity>
                    </Right> */}
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Card transparent>
                            <Field
                                name="name"
                                component={TextInput}
                                placeholder="Name"
                                style={inputStyle}
                                placeholderColor={"#808080"}
                                keyboardType='default'
                            />
                            <Field
                                name="price"
                                component={TextInput}
                                placeholder="Price"
                                style={inputStyle}
                                placeholderColor={"#808080"}
                                keyboardType='numeric'
                            />

                            <View style={{ justifyContent: 'center', marginTop: 10 }}>
                                <Button full primary
                                    style={{ marginBottom: 1 }}
                                    onPress={this.props.handleSubmit(this.handleSave)}>
                                    <Text> Submit </Text>
                                </Button>
                            </View>
                        </Card>
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

Add = connect(mapsStateToProps)(AddProduct);

export default reduxForm({
    form: 'add'
})(Add);

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
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