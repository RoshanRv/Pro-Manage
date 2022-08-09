import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Header from "./components/Header";
import {ApolloProvider , ApolloClient , InMemoryCache} from '@apollo/client'
import Home from "./pages/Home";
import Project from "./pages/Project";

function App() {


  const cache = new InMemoryCache({
    typePolicies:{
      Query:{
        fields:{
          clients:{
            merge(existing,incoming){
              return incoming
            }
          },
          projects:{
            merge(existing,incoming){
              return incoming
            }
          }
        }
      }
    }
  })

  const client = new ApolloClient({
    uri:'http://localhost:5000/graphql',
    cache
  })

  return (
    <>
    <ApolloProvider client={client}>
      <Router>
        <div className="App w-full bg-sky-200 min-h-screen pb-10 px-4 md:px-20  ">
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/projects/:id" element={<Project/>} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
    </>
  );
}

export default App;
