import React from 'react';
import { Button } from 'react-native-paper';
import { Dimensions } from 'react-native';

let buttonSize = Dimensions.get('window').height * 0.13;

const StatusButton = ({ onPress, children, label, color, active, title }) => {
  let labelStyle = {
    color: '#000000'
  };

  if (label && label.toLowerCase() === 'white')
    labelStyle = {
      color: '#FFFFFF'
    };

  const icon = {
    source: 'check-circle-outline',
    direction: 'ltr'
  };

  return (
    <Button
      labelStyle={labelStyle}
      icon={active ? icon : null}
      contentStyle={{
        alignSelf: 'center',
        height: buttonSize,
        writingDirection: 'rtl'
      }}
      color={color}
      mode='contained'
      onPress={() => onPress()}
    >
      {title}
    </Button>
  );
};

export default StatusButton;
