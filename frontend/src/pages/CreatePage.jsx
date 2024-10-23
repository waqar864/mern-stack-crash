import { Box, Button, Container, Heading,Input,useColorModeValue, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/product.js';
import { useToast } from '@chakra-ui/react';

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const toast = useToast();
  const {createProduct} = useProductStore()
  const handleAddProduct = async() => {
    // console.log(newProduct);
    const {success,message} = await createProduct(newProduct);
    // console.log(success, message);
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    
  };
  return <Container maxW={"container.sm"}>
    <VStack
      spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}> Create Product</Heading>
        <Box
        w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} borderRadius={"md"}>
          <VStack
            spacing={4}>
              <Input
              placeholder="Product Name"
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
              <Input
                placeholder='Product Description'
                name='description'
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              <Input
                placeholder="Product Price"
                name='price'
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}

              />
              <Input
                placeholder="Product Image"
                name='image'
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              />
              
              <Button colorScheme='blue' onClick={handleAddProduct} w={"full"}>Add Product</Button>
            </VStack>
          </Box>
      </VStack>
    
    </Container>
  
}

export default CreatePage
