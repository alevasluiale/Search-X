import styled from 'styled-components';
import {useEffect, useState} from "react";
import API from "./api";

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
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  color: ${(props) => (props.visited ? 'darkblue' : 'black')};
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
  //state to hide autocomplete smoother
  const [showAutoComplete, setShowAutoComplete] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [duration,setDuration] = useState(0);

  useEffect(() => {
    fetchAutoComplete();
  }, [query]);

  const handleInputChange = (event) => {
    setShowAutoComplete(true);
    setQuery(event.target.value);
  };

  const handleResultClick = (url) => {
    console.log(url)
  };

  const handleAutocompleteClick = (query,id) => {
    setQuery(query);
    setShowAutoComplete(false);
    fetchResults(query);
    updateVisited(id,true);
  };

  const fetchAutoComplete = () => {
    API.get("/api/search-title",{
      params: {
        query
      }
    }).then(res => {
      setAutocompleteResults(res.data.slice(0,10));
    })
  }

  const fetchResults = (query) => {
    setShowAutoComplete(false);
    API.get("/api/search-title",{
      params: {
        query
      }
    }).then(res => {
      setDuration(res.duration);
      setSearchResults(res.data);
    })
  }


  const updateVisited = (id,visited) => {
    API.post("/api/update-visited",{
      id,
      visited: visited ? 1 : 0
    }).then(() => {
      fetchAutoComplete();
    })
  }

  const removeItemFromHistory = (id) => {
      updateVisited(id, false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchResults(query);
    }
  }

  return (
    <SearchContainer>
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        autoFocus
        onKeyPress={handleKeyPress}
      />
      {showAutoComplete && autocompleteResults.length > 0 && (
        <AutocompleteList>
          {autocompleteResults.map((item, index) => (
            <AutocompleteItem visited={item.visited} key={index} onClick={() => handleAutocompleteClick(item.title,item.id)}>
              {item.title}
              {item.visited > 0 && (
                <RemoveButton
                  onClick={(ev) => {
                    ev.stopPropagation();
                    removeItemFromHistory(item.id)
                  }}
                >
                  Remove
                </RemoveButton>
              )}
            </AutocompleteItem>
          ))}
        </AutocompleteList>
      )}
      {searchResults.length > 0 && (
        <div style={{marginTop: "10px"}}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <ResultMeta>Found {searchResults.length} results.</ResultMeta>
            <ResultMeta>{duration} Milliseconds</ResultMeta>
          </div>
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