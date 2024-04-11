import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import DataGrid from "./components/DataGrid";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import BatchView from "./components/BatchView";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`, //>1024px
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <GridItem area="nav">
          <Header />
        </GridItem>
        <GridItem area="aside">
          <NavBar />
        </GridItem>
        <GridItem area="main">
          <Routes>
            <Route path="/view-data" element={<DataGrid />} />
            <Route path="/view-batch" element={<BatchView />} />
          </Routes>
        </GridItem>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
