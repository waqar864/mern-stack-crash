import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useProductStore } from "../store/product.js"
import { useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx"


function HomePage() {

  const { fetchProducts, products } = useProductStore(); 

  useEffect(() => {
    fetchProducts();
    // console.log(products);
  },[fetchProducts]);

  console.log(products);
  return (
    <Container>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          font-weight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing={{ base: 5, lg: 8 }}
            w={"full"}
          >
            {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
            ))}

          </SimpleGrid>
        </Text>
          <Text fontSize='xl' textAlign={"center"} fontWeight={"bold"} color={"gray.600"}>No Product Found {""}
          <Link to={"/create"}>
          <Text as='span' color='blue.500' _hover={{ textDecoration: 'underline' }}>Create Product</Text>
          </Link>
          </Text>
      </VStack>
    </Container>
  )
}

export default HomePage
