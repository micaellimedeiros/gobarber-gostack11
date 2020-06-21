import React from 'react';
import { Image } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.png';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

      <Input />
      <Input />

      <Button>Entrar</Button>

      <Title>Faça seu logon</Title>
    </Container>
  );
};

export default SignIn;
