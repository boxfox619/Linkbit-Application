import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions, Image} from 'react-native';
import {PagerDotIndicator, IndicatorViewPager} from '../../components/ViewPager';

export default class GuideView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLabel: '다음',
            currentPage: 0
        }
    }

    render() {
        let {height, width} = Dimensions.get("window");
        return (
            <View style={styles.container}>
                <IndicatorViewPager
                    style={{flex:1}}
                    indicator={this._renderDotIndicator()}
                    goToNext={next => this.goToNext = next}
                    onPageSelected={this.onPageSelected}>
                    <View style={styles.page}>
                        <View style={styles.card}>
                            <Image
                                style={styles.image}
                                source={require('./img/ic_public.png')}
                            />
                            <Text style={styles.titleLabel}>쉽고 간편하게</Text>
                            <Text style={styles.subLabel}>누구나 쉽고 간편하게{'\n'} 서비스를 이용할 수 있습니다.</Text>
                        </View>
                    </View>
                    <View style={styles.page}>
                        <View style={styles.card}>
                            <Image
                                style={styles.image}
                                source={require('./img/ic_security.png')}
                            />
                            <Text style={styles.titleLabel}>더 안전하게</Text>
                            <Text style={styles.subLabel}>자신의 자산을{'\n'} 더 안전하게 보관할 수 있습니다.</Text>
                        </View>
                    </View>
                    <View style={styles.page}>
                        <View style={styles.card}>
                            <Image
                                style={styles.image}
                                source={require('./img/ic_local_atm.png')}
                            />
                            <Text style={styles.titleLabel}>쉽고 간편하게</Text>
                            <Text style={styles.subLabel}>누구나 쉽고 간편하게{'\n'} 서비스를 이용할 수 있습니다.</Text>
                        </View>
                    </View>
                    <View style={styles.page}>
                        <View style={styles.card}>
                            <Image
                                style={styles.image}
                                source={require('./img/ic_linkbit.png')}
                            />
                            <Text style={styles.titleLabel}>새로운 시작</Text>
                            <Text style={styles.subLabel}>새로운 실생활 암호화폐{'\n'} Linkbit과 함께 해봐요!</Text>
                        </View>
                    </View>
                </IndicatorViewPager>
                <Button
                    onPress={this.onPressNext}
                    title={this.state.buttonLabel}
                    color="#594343"
                    overrides={{backgroundColor: "#594343"}}
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }

    onPageSelected = (page) =>{
        if(page == 3){
            this.setState({buttonLabel: '시작하기', currentPage: page});
        }else{
            this.setState({buttonLabel: '다음', currentPage: page});
        }
    }

    onPressNext = () =>{
        if(this.state.currentPage < 3){
            this.goToNext();
        }else{

        }
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={4}/>;
    }
}

const getCardWidth = () => {
    let {height, width} = Dimensions.get("window");
    return width / 100 * 80;
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 50,
        paddingBottom: 20
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: getCardWidth(),
        marginBottom: 80,
        borderRadius: 10,
        backgroundColor: '#e8a93a'
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 50
    },
    titleLabel: {
        fontSize: 20,
        marginBottom: 10,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    subLabel :{
        lineHeight: 20,
        color: '#ffffff',
        textAlign: 'center',
    }
});