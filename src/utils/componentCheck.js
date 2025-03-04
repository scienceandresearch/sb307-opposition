// File: src/utils/componentCheck.js

/**
 * Utility to check if React components are properly defined and imported
 * Use this to troubleshoot components that fail to render
 */

// Check if a component is properly defined
export const checkComponent = (Component, componentName) => {
    if (!Component) {
      console.error(`Component ${componentName} is not defined`);
      return false;
    }
    
    // Check if it's a valid React component (function or class)
    const isValidComponent = 
      typeof Component === 'function' || 
      (typeof Component === 'object' && Component !== null);
    
    if (!isValidComponent) {
      console.error(`Component ${componentName} is not a valid React component`, Component);
      return false;
    }
    
    return true;
  };
  
  // Fallback component to use when a component fails to load
  export const FallbackComponent = ({ name, error }) => {
    return (
      <div style={{
        border: '2px dashed #e53e3e',
        borderRadius: '0.5rem',
        padding: '1rem',
        margin: '1rem 0',
        backgroundColor: '#fff5f5'
      }}>
        <p style={{ fontWeight: 'bold', color: '#e53e3e' }}>
          Component Error: {name}
        </p>
        {error && (
          <p style={{ fontSize: '0.875rem', color: '#e53e3e' }}>
            {error.toString()}
          </p>
        )}
      </div>
    );
  };
  
  // Safe component renderer
  export const SafeComponent = ({ component: Component, name, props = {} }) => {
    try {
      if (!checkComponent(Component, name)) {
        return <FallbackComponent name={name} />;
      }
      return <Component {...props} />;
    } catch (error) {
      console.error(`Error rendering ${name}:`, error);
      return <FallbackComponent name={name} error={error} />;
    }
  };
  
  // Check imports
  export const validateImports = (imports) => {
    const results = {};
    
    Object.entries(imports).forEach(([name, component]) => {
      results[name] = checkComponent(component, name);
    });
    
    const failedImports = Object.entries(results)
      .filter(([_, isValid]) => !isValid)
      .map(([name]) => name);
    
    if (failedImports.length > 0) {
      console.error(`Failed imports: ${failedImports.join(', ')}`);
    } else {
      console.log('All imports validated successfully');
    }
    
    return results;
  };