import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import Card from "../components/Card";

const Dashboard = () => {
  return (
    <Grid as="main" gridTemplateColumns={"250px auto"} h={"100vh"} overflow={"hidden"} bg={"app-bg"} p={3}>
      <Card w={"100%"} maxW={"600px"} px={5} py={5}>
        <Box textAlign={"center"} mb={3}>
          <Text fontSize={"lg"} color={'text.500'}>Inspection Report App by Correct Inspections</Text>
          <Heading as="h2">Welcome</Heading>
        </Box>
        <form>
          <VStack>
            
          </VStack>
        </form>
      </Card>
    </Grid>
  )
}

export default Dashboard;