import React from 'react';
import { ChakraProvider, theme, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { ProdTabela } from './components/ProdTabela';

function App() {
  return (
    <ChakraProvider theme={theme} m="10px">
      <Flex display="flex" flexDirection="column" m="25px" p="10px">
        <Header mb="10px" />
        <Filter mb="10px" />
        <ProdTabela mb="10px" />
        <ColorModeSwitcher justifySelf="flex-end" />
        <footer style={{ textAlign: 'center', margin: 'auto' }}>
          <h3>Teste para programação Web em React, Chakra UI e Axios</h3>
          <p>&copy; Bruno Paim</p>
        </footer>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
