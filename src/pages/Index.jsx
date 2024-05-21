import { useState } from "react";
import { Container, VStack, Input, Button, Textarea, Text, Box, useToast, List, ListItem, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const Index = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [urlList, setUrlList] = useState([]);
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
      addUrlToList(url);
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

  const addUrlToList = (url) => {
    setUrlList([...urlList, url]);
  };

  const removeUrlFromList = (index) => {
    const newList = urlList.filter((_, i) => i !== index);
    setUrlList(newList);
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
        <Box width="100%">
          <Text fontSize="xl" mb={2}>Stored URLs:</Text>
          <List spacing={3}>
            {urlList.map((url, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <Text flex="1">{url}</Text>
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => removeUrlFromList(index)}
                  size="sm"
                  colorScheme="red"
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;