import { useState } from "react";
import { Container, VStack, Input, Button, Textarea, Text, Box, useToast } from "@chakra-ui/react";

const Index = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const toast = useToast();

  const handleFetch = async () => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? JSON.stringify(JSON.parse(body)) : undefined,
      };

      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Input
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Input
          placeholder="Enter Method (GET, POST, PUT, DELETE)"
          value={method}
          onChange={(e) => setMethod(e.target.value.toUpperCase())}
        />
        {method !== "GET" && (
          <Textarea
            placeholder="Enter Body (JSON format)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        )}
        <Button colorScheme="blue" onClick={handleFetch}>
          Send Request
        </Button>
        <Box width="100%">
          <Text fontSize="xl" mb={2}>Response:</Text>
          <Textarea
            value={response}
            readOnly
            height="300px"
            bg="gray.100"
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;