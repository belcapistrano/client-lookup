import { useState, useEffect } from 'react';
// Import the custom CSS file
import '../ClientSearch.css';

// Sample client data - in a real application, this would come from an API
const clientsData = [
  { controlNumber: "12345", clientName: "ABC Corporation" },
  { controlNumber: "23456", clientName: "ABC Aperture Science" },
  { controlNumber: "34567", clientName: "ABC Stark Industries" },
  { controlNumber: "45678", clientName: "Wayne Enterprises" },
  { controlNumber: "56789", clientName: "Wayne Corporation" },
  { controlNumber: "67890", clientName: "Cyberdyne Systems" },
  { controlNumber: "78901", clientName: "Weyland-Yutani" },
  { controlNumber: "89012", clientName: "Tyrell Corporation" },
  { controlNumber: "90123", clientName: "Massive Dynamic" },
  { controlNumber: "10234", clientName: "Abstergo Industries" },
  // Clients starting with "Wal"
  { controlNumber: "22001", clientName: "Walmart Inc." },
  { controlNumber: "22002", clientName: "Walgreens Co." },
  { controlNumber: "22003", clientName: "Wallace Industries" },
  { controlNumber: "22004", clientName: "Walton Enterprises" },
  { controlNumber: "22005", clientName: "Walcorp Global" },
  { controlNumber: "22006", clientName: "Walden Investments" },
  { controlNumber: "22007", clientName: "WalTech Solutions" }
];

const ClientSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('auto');
  const [detectedSearchType, setDetectedSearchType] = useState('');
  const [searchResults, setSearchResults] = useState<{ controlNumber: string; clientName: string }[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  // Automatically detect search type based on input
  useEffect(() => {
    if (searchTerm.length >= 5 && /^\d+$/.test(searchTerm)) {
      setDetectedSearchType('controlNumber');
    } else if (searchTerm.length >= 3 && /^[a-zA-Z\s]+$/.test(searchTerm)) {
      setDetectedSearchType('clientName');
    } else {
      setDetectedSearchType('');
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (!searchTerm) {
      setSearchResults([]);
      setIsSearched(false);
      return;
    }

    setIsSearched(true);

    // When in auto mode, use the detected search type
    const currentSearchType = searchType === 'auto' ? detectedSearchType : searchType;

    if (currentSearchType === 'controlNumber') {
      // Search by control number - exact match
      if (searchTerm.length >= 5 && /^\d+$/.test(searchTerm)) {
        const result = clientsData.filter(client => 
          client.controlNumber === searchTerm
        );
        setSearchResults(result);
      } else {
        setSearchResults([]);
      }
    } else if (currentSearchType === 'clientName') {
      // Search by client name - first 3 characters match
      if (searchTerm.length >= 3) {
        const result = clientsData.filter(client => 
          client.clientName.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setSearchResults(result);
      } else {
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="client-search-container">
      <div className="client-search-header">
        <h1 className="client-search-title">Client Search</h1>
        <p className="client-search-subtitle">Search by control number or client name</p>
      </div>
      
      <div className="search-controls">
        <div className="search-type-selector">
          <div className="search-type-option">
            <input
              type="radio"
              id="auto"
              name="searchType"
              value="auto"
              checked={searchType === 'auto'}
              onChange={() => setSearchType('auto')}
            />
            <label htmlFor="auto">Auto Detect</label>
          </div>

          <div className="search-type-option">
            <input
              type="radio"
              id="controlNumber"
              name="searchType"
              value="controlNumber"
              checked={searchType === 'controlNumber'}
              onChange={() => setSearchType('controlNumber')}
            />
            <label htmlFor="controlNumber">Control Number</label>
          </div>
          
          <div className="search-type-option">
            <input
              type="radio"
              id="clientName"
              name="searchType"
              value="clientName"
              checked={searchType === 'clientName'}
              onChange={() => setSearchType('clientName')}
            />
            <label htmlFor="clientName">Client Name</label>
          </div>
        </div>
        
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            className="search-input"
          />
          <button
            onClick={handleSearch}
            className="search-button"
          >
            Search
          </button>
        </div>

        {/* Search Type Indicator */}
        {searchTerm.length > 0 && (
          <div className="search-type-indicator">
            <span className="search-type-label">Currently searching by: </span>
            {searchType === 'auto' ? (
              detectedSearchType === 'controlNumber' ? 'Control Number (Auto)' : 
              detectedSearchType === 'clientName' ? 'Client Name (Auto)' : 
              'Auto (Waiting for valid input)'
            ) : (
              searchType === 'controlNumber' ? 'Control Number' : 'Client Name'
            )}
          </div>
        )}
        
        {searchType === 'controlNumber' && searchTerm && searchTerm.length < 5 && (
          <p className="validation-message">Control number must be at least 5 digits</p>
        )}
        {(searchType === 'controlNumber' || (searchType === 'auto' && detectedSearchType === 'controlNumber')) && 
          searchTerm && !/^\d+$/.test(searchTerm) && (
          <p className="validation-message">Control number must contain only numbers</p>
        )}
        {searchType === 'clientName' && searchTerm && searchTerm.length < 3 && (
          <p className="validation-message">Client name must be at least 3 characters</p>
        )}
      </div>

      {isSearched && (
        <div className="results-section">
          <h2 className="results-header">Search Results</h2>
          
          {searchResults.length === 0 ? (
            <p className="no-results-message">No clients found matching your search criteria.</p>
          ) : (
            <div className="results-table-container">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Control Number</th>
                    <th>Client Name</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((client) => (
                    <tr key={client.controlNumber}>
                      <td>{client.controlNumber}</td>
                      <td>{client.clientName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientSearchApp;