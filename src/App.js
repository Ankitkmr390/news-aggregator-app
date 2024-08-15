import { useEffect, useState } from "react";
import useNewYorkTimesAPI from "./api/useNewYorkTimesData";
import useNewsAPI from "./api/useNewsData";
import useGuardianNewsAPI from "./api/useGuardianData";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import moment from 'moment';

import "./App.css";
import Header from "./component/header";



function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const { data: newsData, loading: newsLoading } = useNewsAPI();
  const { data: newsNewYorkTimesData, loading: newsCredLoading } = useNewYorkTimesAPI();
  const { data: newsGuardianData, loading: newsGuardianLoading } = useGuardianNewsAPI();


  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let combined = [];

    // Determine the data source based on the selected tab
    switch (tabIndex) {
      case 0: // "All News" tab
        combined = [          
          ...newsNewYorkTimesData,
          ...newsGuardianData,
          ...newsData,
        ];
        break;
      case 1:
        combined = newsData;
        break;
      case 2:
        combined = newsNewYorkTimesData;
        break;
      case 3:
        combined = newsGuardianData;
        break;
      
      default:
        combined = [];
    }

    // Filter the combined data based on user inputs
    const filtered = combined.filter((article) => {
      const matchesQuery =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || article.category === selectedCategory;
      const matchesSource =
        selectedSource === "" || article.source.name === selectedSource;
      const matchesAuthor =
        selectedAuthor === "" || article.author === selectedAuthor;

      return matchesQuery && matchesCategory && matchesSource && matchesAuthor;
    });

    setFilteredData(filtered);
  }, [
    tabIndex,
    newsData,
    newsNewYorkTimesData,
    newsGuardianData,
    searchQuery,
    selectedCategory,
    selectedSource,
    selectedAuthor,
  ]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Extract unique values for filtering
  const uniqueCategories = [...new Set(filteredData.map(article => article.category))];
  const uniqueSources = [...new Set(filteredData.map(article => article.source.name))];
  const uniqueAuthors = [...new Set(filteredData.map(article => article.author))];

  return (
    <>
      <Header />
      <Box sx={{ maxWidth: "1200px", mx: "auto", p: 2 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="All News" /> 
          <Tab label="News API" />
          <Tab label="New York Times" />
          <Tab label="The Guardian" />
          
        </Tabs>

        <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Search by keyword"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>All Categories</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="All Categories"
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {uniqueCategories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>All Sources</InputLabel>
              <Select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                label="All Sources"
              >
                <MenuItem value="">
                  <em>All Sources</em>
                </MenuItem>
                {uniqueSources.map((source, index) => (
                  <MenuItem key={index} value={source}>
                    {source}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>All Authors</InputLabel>
              <Select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                label="All Authors"
              >
                <MenuItem value="">
                  <em>All Authors</em>
                </MenuItem>
                {uniqueAuthors.map((author, index) => (
                  <MenuItem key={index} value={author}>
                    {author}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {newsLoading || newsCredLoading || newsGuardianLoading ? (
          <p>Loading...</p>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              alignItems="stretch"
              className="newsCardContainer"
            >
              {filteredData.map((article, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                  className="newsCard"
                >
                  <div
                    className="newsChildCard"
                    lg={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      padding: 2,
                      marginBottom: "35px",
                    }}
                  >
                    <img src="https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" alt="News" />
                    <div className="news-content">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      
                      <h3>{article.title}</h3>
                    </a>
                    <p>
                      <b>Category:</b> {article.category}
                    </p>
                    
                    <p>
                      <b>Data Source:</b> {article.source.name}
                    </p>
                    <p>
                      <b>Author:</b> {article.author || "N/A"} 
                    </p>
                    <p>
                      <b>Publish Date:</b> { moment(article.publishedAt).format('YYYY-MM-DD') || "N/A"}
                    </p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
}

export default App;
