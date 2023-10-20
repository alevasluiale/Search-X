import styled from 'styled-components';
import {useEffect, useState} from "react";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
`;

const Input = styled.input`
  width: 100%;
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
  const [searchResults, setSearchResults] = useState([]);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const localDB = [
      { title: 'Example Result 1', description: 'Description for Result 1', url: 'https://example.com/result1' },
      { title: 'Example Result 2', description: 'Description for Result 2', url: 'https://example.com/result2' },
    ];

    // Simulate autocomplete functionality.
    const autocompleteResults = localDB
      .filter(item => item.title.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 10);

    setAutocompleteResults(autocompleteResults);
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleResultClick = (url) => {

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