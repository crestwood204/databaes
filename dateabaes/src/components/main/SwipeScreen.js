'use strict';
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import style from '../../../public/css/styles.js';
import { connect } from 'react-redux';

import SwipeCards from 'react-native-swipe-cards';
import { swipeYes, swipeNo, findMatches } from '../../actions/MainActions';

let Card = React.createClass({
  render() {
    // let image = ;
    // if (this.props.gender === 'male' || this.props.gender === 'Male') {
    //   image = require(`../../../public/assets/jake.png`);
    // }
    return (
      <View style={[styles.card]}>
        <Image
          source={(this.props.gender === 'gal')?(require(`../../../public/assets/jakeG.png`)):(require(`../../../public/assets/jake.png`))}
          style={[styles.image]}

        />
        <View style={{flexDirection: 'row', marginLeft: 15, alignItems: 'center'}}>
          <Text style={[styles.name]}>{this.props.fname}</Text>
          <Text style={[styles.name]}>{this.props.lname}</Text>
          {/* <Text style={[styles.score]}>{this.props.skillScore}</Text> */}
        </View>
        <Text style={[styles.username]}>@{this.props.username}</Text>
        <Text style={[styles.userInfo, {marginTop: 15}]}>{this.props.language} type of {this.props.gender}</Text>
        <Text style={[styles.userInfo]}>{this.props.years} years of experience</Text>
        <Text style={[styles.userInfo]}>Prefers the {this.props.end}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
          <Text style={[styles.userInfo]}>Nerd Level: </Text>
          <Text style={[styles.score]}>{this.props.nerdyScore}</Text>
          <Text style={[styles.userInfo]}>Skill Level: </Text>
          <Text style={[styles.score]}>{this.props.skillScore}</Text>
        </View>
      </View>
    )
  }
})

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

 render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{margin: 50}}
          source={require('../../../public/assets/mario.png')}
        />
      </View>
    )
  }
}
// YOU'LL NEED TO LOAD IN CARDS FROM THE DATABASE
// const Cards = [
//   {username: 'crestwood204', fname: 'Andrew', lname: 'Ong', language: 'JavaScript', gender: 'guy', years: '7', nerdyScore: '15', skillScore: '9', end: 'frontend'},
//   {username: 'carokun', fname: 'Caroline', lname: 'Okun', language: 'C++', gender: 'gal', years: '3', nerdyScore: '17', skillScore: '15', end: 'backend'},
//   {username: 'tifchang', fname: 'Tiffany', lname: 'Chang', language: 'OCaml', gender: 'gal', years: '2', nerdyScore: '9', skillScore: '2', end: 'frontend'}
// ]

class SwipeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    }
  }


  componentWillMount() {
    const prospects = [];
    for (var key in this.props.prospects) {
      prospects.push(Object.assign({}, this.props.prospects[key], {username: key}))
    }
    this.setState({cards: prospects})
  }

  handleYup (card) {
    this.props.swipeYes(card.username, this.props.username, this.props.prospects)
    console.log(`Yup for ${card.username}`)
  }
  handleNope (card) {
    this.props.swipeNo(card.username, this.props.username, this.props.prospects)
    console.log(`Nope for ${card.username}`)
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <View style={{flex: 1,backgroundColor: '#1F1F1F',justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this.props.findMatches(this.props.username, this.props.likes, this.props.matches, this.props.users, this.props.navigation)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.baeList]}>my baeList</Text>
              <Image
                style={[styles.heart]}
                source={require('../../../public/assets/heart.png')}
              />
            </View>
          </TouchableOpacity>
        <SwipeCards
          cards={this.state.cards}
          // stack={true}
          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}

          handleYup={(card) => this.handleYup(card)}
          handleNope={(card) => this.handleNope(card)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    // alignItems: 'center',
    width: 280,
    height: 450,
    borderRadius: 3,
    backgroundColor: '#EEEEEE'
  },
  name: {
    fontFamily: 'Courier',
    fontSize: 15,
    marginRight: 5,
    color: '#246FFF'
  },
  username: {
    fontFamily: 'Courier',
    color: '#5c88db',
    fontSize: 13,
    marginLeft: 15,
    marginTop: 5
  },
  noMoreCardsText: {
    fontSize: 22,
  },
  userInfo: {
    fontFamily: 'Courier',
    color: '#4A4A4A',
    fontSize: 13,
    marginLeft: 15,
    marginTop: 5
  },
  image: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    width: 280,
    backgroundColor: 'red',
    height: 250,
    marginBottom: 20
  },
  score: {
    marginTop: 5,
    fontFamily: 'Courier',
    color: '#FC0044',
    fontSize: 13,
  },
  baeList: {
    color: '#EEEEEE',
    fontFamily: 'Courier',
    fontSize: 20,
    marginTop: 40,
    marginLeft: '30%'
  },
  heart: {
    marginLeft: 10,
    height: 30,
    width: 30,
    marginTop: 40,
  }
})

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    password: state.login.password,
    prospects: state.main.prospects,
    likes: state.login.likes,
    matches: state.login.matches,
    users: state.main.users
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    swipeYes: (username, liker, prospects) => dispatch(swipeYes(dispatch, username, liker, prospects)),
    swipeNo: (username, disliker, prospects) => dispatch(swipeNo(dispatch, username, disliker, prospects)),
    findMatches: (username, likes, matches, users, navigation) => dispatch(findMatches(dispatch, username, likes, matches, users, navigation))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SwipeScreen);
