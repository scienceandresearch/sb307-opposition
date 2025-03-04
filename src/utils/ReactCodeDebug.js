// React Code Debug Utility

/**
 * Common React component issues and how to fix them
 */

// ISSUE 1: Components not rendering or displaying correctly

// Problem: Missing key prop in list items
// Original code:
function BadList() {
    const items = ['apple', 'orange', 'banana'];
    return (
      <ul>
        {items.map(item => (
          <li>{item}</li> // Missing key prop
        ))}
      </ul>
    );
  }
  
  // Fixed code:
  function GoodList() {
    const items = ['apple', 'orange', 'banana'];
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li> // Added key prop
        ))}
      </ul>
    );
  }
  
  // ISSUE 2: Styling issues with Tailwind
  
  // Problem: Using arbitrary values with brackets in Tailwind classes
  // Original code (will cause errors in Claude artifact):
  function BadTailwindComponent() {
    return (
      <div className="h-[600px] w-[42rem] mt-[27px]">
        Content
      </div>
    );
  }
  
  // Fixed code (use standard Tailwind classes):
  function GoodTailwindComponent() {
    return (
      <div className="h-screen w-full mt-6">
        Content
      </div>
    );
  }
  
  // ISSUE 3: State issues
  
  // Problem: Setting state multiple times in the same function
  // Original code:
  function BadStateComponent() {
    const [count, setCount] = useState(0);
    
    const handleClick = () => {
      setCount(count + 1); // This gets the current state value
      setCount(count + 1); // This gets the same state value again, not the updated one
      // Result: count only increases by 1, not 2
    };
    
    return (
      <button onClick={handleClick}>Count: {count}</button>
    );
  }
  
  // Fixed code:
  function GoodStateComponent() {
    const [count, setCount] = useState(0);
    
    const handleClick = () => {
      setCount(prevCount => prevCount + 1); // Use function form to get latest state
      setCount(prevCount => prevCount + 1); // This will correctly increment again
      // Result: count increases by 2
    };
    
    return (
      <button onClick={handleClick}>Count: {count}</button>
    );
  }
  
  // ISSUE 4: Prop drilling and component communication
  
  // Problem: Passing too many props down through multiple components
  // Solution: Use context for deeply nested components that need same data
  
  // Create a context
  const UserContext = React.createContext(null);
  
  // Provider component
  function UserProvider({ children }) {
    const [user, setUser] = useState({ name: 'John', isAuthenticated: true });
    
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  }
  
  // Consumer component (could be deeply nested)
  function UserProfile() {
    const { user } = useContext(UserContext);
    return <div>Hello, {user.name}</div>;
  }
  
  // ISSUE 5: Form handling without proper state management
  
  // Problem: Form with uncontrolled inputs
  function BadForm() {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Trying to access values directly from DOM is not the React way
      const name = document.getElementById('name').value;
      console.log(name);
    };
    
    return (
      <form onSubmit={handleSubmit}>
        <input id="name" type="text" />
        <button type="submit">Submit</button>
      </form>
    );
  }
  
  // Fixed code:
  function GoodForm() {
    const [name, setName] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(name); // Access from state
    };
    
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
  
  // ISSUE 6: Import errors and module resolution
  
  // Problem: Incorrect imports
  // Bad import example:
  // import AddressForm from '../components/AddressForm' // Missing .tsx extension or index file
  
  // Fixed imports:
  // import AddressForm from '../components/AddressForm' // Works if using webpack/babel with proper config
  // import AddressForm from '../components/AddressForm.tsx' // Explicit extension
  // import { AddressForm } from '../components' // Using index.ts barrel file
  
  // ISSUE 7: Not handling loading/error states properly
  
  // Problem: Not showing loading state or errors
  function BadDataFetcher() {
    const [data, setData] = useState(null);
    
    useEffect(() => {
      fetch('/api/data')
        .then(res => res.json())
        .then(data => setData(data));
      // Missing error handling and loading state
    }, []);
    
    return (
      <div>
        {data && data.map(item => <div key={item.id}>{item.name}</div>)}
      </div>
    );
  }
  
  // Fixed code:
  function GoodDataFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      setLoading(true);
      fetch('/api/data')
        .then(res => res.json())
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
      <div>
        {data && data.map(item => <div key={item.id}>{item.name}</div>)}
      </div>
    );
  }
  
  // ISSUE 8: Issues specific to your SB307 campaign site
  
  // Problem 1: Tailwind class conflicts or inconsistencies
  // In your components, there are places where Tailwind classes might conflict
  
  // Example (problematic):
  <div className="text-lg font-bold text-blue-600 text-gray-900">
    This has conflicting text colors
  </div>
  
  // Fixed:
  <div className="text-lg font-bold text-blue-600">
    Consistent styling
  </div>
  
  // Problem 2: Layout issues with flex and grid
  // Incorrect:
  <div className="flex">
    <div className="w-1/2">Left</div>
    <div className="w-full">Right</div> {/* This will wrap */}
  </div>
  
  // Fixed:
  <div className="flex">
    <div className="w-1/2">Left</div>
    <div className="w-1/2">Right</div> {/* Proper sizing */}
  </div>
  
  // Problem 3: Responsive considerations
  // Your mobile experience may have issues if not properly structured
  
  // Less responsive:
  <div className="grid grid-cols-3 gap-4">
    {/* Always 3 columns regardless of screen size */}
  </div>
  
  // More responsive:
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {/* Adapts to different screen sizes */}
  </div>
  
  // ISSUE 9: API handling in your SB307 site
  
  // Problem: API error handling is inconsistent
  // In your components, ensure consistent error handling:
  
  async function handleAddressSubmit(formData) {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetchRepresentatives(formData);
      
      if (response.success) {
        setRepresentatives(response.representatives);
        // Additional success handling
      } else {
        // This is good - explicit error handling
        setError(response.error || 'Failed to find representatives.');
      }
    } catch (err) {
      // This is good - catching unexpected errors
      setError('An unexpected error occurred.');
    } finally {
      // This is good - always reset loading state
      setIsLoading(false);
    }
  }