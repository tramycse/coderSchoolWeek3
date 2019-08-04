import React , { useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


const CHOICES = [
  {
    name: 'rock',
    uri: 'https://cdn0.iconfinder.com/data/icons/rock-paper-scissors-emoji/792/rock-paper-scissors-emoji-cartoon-027-512.png'
  },
  {
    name: 'paper',
    uri: 'https://cdn0.iconfinder.com/data/icons/rock-paper-scissors-emoji/792/rock-paper-scissors-emoji-cartoon-019-512.png'
  },
  {
    name: 'scissors',
    uri: 'http://ku.90sjimg.com/element_origin_min_pic/17/02/09/08ad61b612011dad5c3e220d1663cc28.jpg'
  },
];

const randomComputerChoice = () =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)];

const getRoundOutcome = userChoice => {
  const computerChoice = randomComputerChoice().name;
  let result;

  if (userChoice === 'rock') {
    result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'paper') {
    result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'scissors') {
    result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
  }

  if (userChoice === computerChoice) result = 'Tie game!';
  return [result, computerChoice];
};

const Button = props => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => props.onPress(props.name)}
  >
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);

const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>
        {player}
      </Text>
      <Image 
        source={{uri}} 
        resizeMode="contain" 
        style={styles.choiceImage} 
      />
      <Text style={styles.choiceCardTitle}>
        {title}
      </Text>
    </View>
  );
};

export default function App() {
  const [gamePrompt, setGamePrompt] = useState('Choose your weapon!');
  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});

  const onPress = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);

    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);

    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComputerChoice(newComputerChoice);
};
 
const getResultColor = () => {
  if (gamePrompt === 'Victory!') return 'green';
  if (gamePrompt === 'Defeat!') return 'red';
  if (gamePrompt === 'Tie game!') return 'blue'; 
  return null;
};

  return (
    <View style={styles.container}>
      <Text style = {{fontSize: 35, color: getResultColor(), margin: 50 , fontWeight: 'bold' }}>{gamePrompt}</Text>

      <View style = {styles.choicesContainer}>
        <ChoiceCard 
        player = "Player"
        choice = {userChoice}>
        </ChoiceCard>
        
        <Text style = {styles.TextVS}>vs</Text>

        <ChoiceCard 
        player = "Computer"
        choice = {computerChoice}>
        </ChoiceCard>
        </View>
        {CHOICES.map(choice => {
          return (
            <Button 
              key={choice.name} 
              name={choice.name} 
              onPress={onPress} 
            />
          )
      })}
          
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 25,
  },
  choiceImage: {
    width: 150,
    height: 150,
  },
  TextVS: {
    color: '#250902', 
    textAlign: 'center', 
    fontSize: 20, 
    alignItems: 'center',
    flexDirection: 'row',
  },
  choicesContainer: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
  choiceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  choiceCardTitle: {
    fontSize: 20,
  }
});
 