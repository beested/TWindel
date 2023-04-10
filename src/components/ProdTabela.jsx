import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Img,
  IconButton,
  Button,
  Icon,
  Box,
  Text,
} from '@chakra-ui/react';

import axios from 'axios';

import { useState, useEffect } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import RiSortDesc from 'react-icons/ri';
import { FaSort } from 'react-icons/fa';

import ProductEditModal from './ProductsEditModal';

const API = 'https://windelweb.windel.com.br:3000';

export function ProdTabela(props) {
  const [produtos, setProdutos] = useState([]);
  const [ordem, setOrdem] = useState('asc');

  const handleSortByEstoque = () => {
    if (ordem === 'asc') {
      setProdutos([...produtos].sort((a, b) => a.estoque - b.estoque));
      setOrdem('desc');
    } else {
      setProdutos([...produtos].sort((a, b) => b.estoque - a.estoque));
      setOrdem('asc');
    }
  };

  const handleSortByVlrVenda = () => {
    if (ordem === 'asc') {
      setProdutos([...produtos].sort((a, b) => a.valorVenda - b.valorVenda));
      setOrdem('desc');
    } else {
      setProdutos([...produtos].sort((a, b) => b.valorVenda - a.valorVenda));
      setOrdem('asc');
    }
  };

  useEffect(() => {
    fetch(API + '/teste-front')
      .then(response => response.json())
      .then(data => setProdutos(data));
  }, []);

  //deletar produto
  const handleDelete = async id => {
    await axios
      .delete(API + '/teste-front/' + id)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    setProdutos(prevState => prevState.filter(todo => todo.id !== id));
  };

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const handleCloseEditModal = () => {
    setIsModalEditOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsModalEditOpen(true);
  };

  const PRODUTOS_POR_PAGINA = 4;
  const [paginaAtual, setPaginaAtual] = useState(1);

  const indiceUltimoProduto = paginaAtual * PRODUTOS_POR_PAGINA;
  const indicePrimeiroProduto = indiceUltimoProduto - PRODUTOS_POR_PAGINA;
  const produtosExibidos = produtos.slice(
    indicePrimeiroProduto,
    indiceUltimoProduto
  );

  return (
    <Flex border="1px solid gray" borderRadius="8px" padding="10px">
      <Table>
        <Thead>
          <Tr>
            <Th>Imagem</Th>
            <Th>Nome</Th>
            <Th>Referência</Th>
            <Th onClick={handleSortByVlrVenda} cursor="pointer">
              Valor de Venda <IconButton as={FaSort} mb="1" size={1} />
            </Th>
            <Th>Fabricante</Th>
            <Th onClick={handleSortByEstoque} cursor="pointer">
              Estoque <IconButton as={FaSort} mb="1" size={1} />
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {produtos.length === 0 && <p>Não há Produtos!</p>}
          {produtosExibidos.map(produto => (
            <Tr>
              <Td>
                <Img
                  maxWidth="100px"
                  maxHeight="100px"
                  src={produto.imagemProduto}
                  alt={produto.nome}
                />
              </Td>
              <Td>
                <Box maxW="300px" wordBreak="break-word">
                  {produto.nome}
                </Box>
              </Td>
              <Td>{produto.referencia}</Td>
              <Td>{produto.valorVenda}</Td>
              <Td>{produto.fabricante}</Td>
              <Td style={{ color: produto.estoque === 0 ? 'red' : 'black' }}>
                {produto.estoque === 0 ? 'ESGOTADO' : produto.estoque}
              </Td>
              <Td>
                <ProductEditModal
                  isOpen={isModalEditOpen}
                  onClose={handleCloseEditModal}
                />
                <IconButton
                  size="md"
                  colorScheme="red"
                  icon={<BsTrash />}
                  onClick={() => handleDelete(produto.id)}
                  _hover={{ transform: 'scale(1.2)' }}
                  style={{ margin: '0 4px' }} // adicionei uma margem horizontal de 4px
                />
                <IconButton
                  size="md"
                  colorScheme="blue"
                  icon={<BsPencil />}
                  onClick={handleOpenEditModal}
                  _hover={{ transform: 'scale(1.2)' }}
                  style={{ margin: '0 4px' }} // adicionei uma margem horizontal de 4px
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Flex justify="space-between" alignItems="center" marginTop="20px">
          <Button
            isDisabled={paginaAtual === 1}
            onClick={() => setPaginaAtual(paginaAtual - 1)}
          >
            Anterior
          </Button>
          <div>{`Página ${paginaAtual}`}</div>
          <Button
            isDisabled={produtosExibidos.length < PRODUTOS_POR_PAGINA}
            onClick={() => setPaginaAtual(paginaAtual + 1)}
          >
            Próxima
          </Button>
        </Flex>
      </Table>
    </Flex>
  );
}
