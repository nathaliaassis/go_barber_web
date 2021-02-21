import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: {};
  icon?: React.ComponentType<IconBaseProps>; // ? significa não obrigatorio
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, containerStyle, ...rest }) => {
  //monitorar o input para fazer o registro dos dados
  //o HTMLINputElement indica que esse ref esta armazenado o valor de um input
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);
  //todas vez que utilizarmos uma funcao dentro de um componente não utilizaremos
  //mais function e sim o hook useCallback

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      hasError={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      style={containerStyle}
    >
      {Icon && <Icon size={20} color={error && '#666360'} />}
      <input
        name={name}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {!isFocused && error && <Error title={error}> <FiAlertCircle color="#c53030" size={20} /> </Error>}
    </Container>
  );
};

export default Input;
