import { useState } from 'react';
import { searchMedicines } from './services/api';

function App() {
  const [query, setQuery] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search function
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    const data = await searchMedicines(query);
    setMedicines(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Medicine Directory</h1>
      <p>Search for medicines in the FDA database</p>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter medicine name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
      </form>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Results List */}
      <div>
        {medicines.map((med, index) => (
          <div 
            key={index} 
            style={{ 
              border: '1px solid #ccc', 
              padding: '15px', 
              borderRadius: '5px', 
              marginBottom: '10px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <h3>{med.openfda?.brand_name?.[0] || 'Unknown Brand'}</h3>
            <p><strong>Generic Name:</strong> {med.openfda?.generic_name?.[0] || 'N/A'}</p>
            <p><strong>Manufacturer:</strong> {med.openfda?.manufacturer_name?.[0] || 'N/A'}</p>
            <p><strong>Purpose:</strong> {med.purpose?.[0] || med.indications_and_usage?.[0] || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;