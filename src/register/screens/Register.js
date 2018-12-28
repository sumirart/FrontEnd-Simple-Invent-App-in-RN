import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';
import { Container, Header, Button, Text, Body, Card, Title, Content, Spinner } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

// import actions
import { login, register } from '../../public/redux/actions/auth';

// import component for redux form
import TextInput from '../../public/components/TextInput';
import Password from '../../public/components/Password';

class Register extends Component {

    // Register
    handleSave = (value) => {
        this.props.dispatch(register(value))
        .then((res) => {
            this.props.dispatch(login(value))
            .then(() => {
                this.handlePress('Home')
            })
        })
        .catch(err => {
            alert(err)
        });
    }

    // Move to other screen
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
                        <Title>Register</Title>
                    </Body>
                </Header>
                <Content>
                    {
                        (this.props.auth.isLoading == true) ?
                            <Spinner />
                            : null
                    }
                    <View style={styles.container}>
                        <Card transparent>
                            <Field
                                name="email"
                                component={TextInput}
                                placeholder="Email address"
                                style={inputStyle}
                                placeholderColor={"#808080"}
                                keyboardType='email-address'
                            />
                            <Field
                                name="password"
                                component={Password}
                                placeholder="Password"
                                style={inputStyle}
                                placeholderColor={"#808080"}
                            />
                            <View style={{ justifyContent: 'center', marginTop: 10 }}>
                                <Button full primary style={{ marginBottom: 1 }}
                                    onPress={this.props.handleSubmit(this.handleSave)}
                                    >
                                    <Text> Register </Text>
                                </Button>
                                <Text style={{ color: 'black', textAlign: 'center' }}> Or </Text>
                                <Button full primary style={{ marginBottom: 10 }} onPress={() => this.handlePress('Login')}>
                                    <Text> Login </Text>
                                </Button>
                            </View>
                        </Card>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapsStateToProps =(state) => ({
    auth : state.auth
})

export default reduxForm({
    form: 'register'
})(connect(mapsStateToProps)(Register));

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    textCounter: {
        fontSize: 100
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