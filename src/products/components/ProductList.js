import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Body, Icon, Right, Left, Thumbnail, Text } from 'native-base'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux';

// import actions
import { removeProduct } from '../../public/redux/actions/products';

class ProductList extends Component {
    deleteSingle = id => {
        const token = this.props.auth.token[0];
        // alert(token);
        this.props.removeProduct(id, token);
    }

    render() {
        const data = this.props.data
        return (
            <ListItem thumbnail onPress={() => this.props.navigation.navigate('Edit', { data })}>
                <Left>
                    <Thumbnail square source={{ uri: `${data.productImage}` }} />
                </Left>
                <Body>
                    <Text style={{ color: "#000", fontSize: 16 }}>{data.name}</Text>
                    <Text note>Rp. {data.price}</Text>
                    <Text note>{data.submitBy}</Text>
                </Body>
                <Right>
                    <TouchableOpacity onPress={() => this.deleteSingle(data._id)}>
                        <Icon name="trash" style={{ color: "red", fontWeight: "bold", fontSize: 25 }} />
                    </TouchableOpacity>
                </Right>
            </ListItem>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => {
    return {
        removeProduct: (id, token) => dispatch(removeProduct(id, token))
    }
}

Product = connect(mapStateToProps, mapDispatchToProps)(ProductList);

export default withNavigation(Product);