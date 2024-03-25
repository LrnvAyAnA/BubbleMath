import React, { createContext, useState, useContext } from 'react'
 const ClassContext = createContext();

 function changeClass() {
  const context = useContext(ClassContext);
  if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
 const ClassProvider = ({children}) => {
  const [classPath, setClassPath] = useState('c1');
  return (
    <ClassContext.Provider value={{ classPath, setClassPath }}>
    {children}
  </ClassContext.Provider>
  );
}
export { ClassProvider, changeClass };