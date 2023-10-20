import styled from 'styled-components';
import {useEffect, useState} from "react";
import axios from "axios";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  height: 20%;
  width: 50%;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AutocompleteList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
  max-height: 200px;
  overflow-y: auto;
`;

const AutocompleteItem = styled.li`
  cursor: pointer;
  padding: 10px;
  &:hover {
    background: #f0f0f0;
  }
`;

const ResultMeta = styled.div`
  font-size: 14px;
  margin: 10px 0;
`;

const SearchResult = styled.li`
  margin: 20px 0;
`;

const ResultLink = styled.a`
  color: #333;
  font-weight: bold;
  text-decoration: none;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #777;
  cursor: pointer;
  margin-left: 10px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const StyledSearchEngine = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([{title: "Google", description: "Search engine", url: "www.google.com"}]);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3000/api/search-title",{
      params: {
        query
      }
    }).then(res => {
      console.log(res.data);
      const result = res.data;
      // const autocompleteResults = result
      //   .slice(0, 10);

      setAutocompleteResults(res.data);
    })
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleResultClick = (url) => {
    console.log(url)
  };

  const handleAutocompleteClick = (query) => {
    setQuery(query);
  };

  const removeItemFromHistory = (item) => {

  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        autoFocus
      />
      {autocompleteResults.length > 0 && (
        <AutocompleteList>
          {autocompleteResults.map((item, index) => (
            <AutocompleteItem key={index} onClick={() => handleAutocompleteClick(item.title)}>
              {item.title}
              {searchHistory.includes(item.title) && (
                <RemoveButton onClick={() => removeItemFromHistory(item.title)}>Remove</RemoveButton>
              )}
            </AutocompleteItem>
          ))}
        </AutocompleteList>
      )}
      {searchResults.length > 0 && (
        <div className="search-results">
          <ResultMeta>Found {searchResults.length} results.</ResultMeta>
          <ul>
            {searchResults.map((item, index) => (
              <SearchResult key={index}>
                <ResultLink href={item.url} onClick={() => handleResultClick(item.url)}>{item.title}</ResultLink>
                <Description>{item.description}</Description>
              </SearchResult>
            ))}
          </ul>
        </div>
      )}
    </SearchContainer>
  );
};

export default StyledSearchEngine;