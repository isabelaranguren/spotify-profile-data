import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import { Login, Profile } from "./pages";
import { GlobalStyle } from "./styles";
import styled from "styled-components/macro";

// TODO: FIX SCROLL TO TOP FUNCTION

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
    transform: scale(1.1);
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }

`;

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };
    catchErrors(fetchData());
  }, []);
   return (
     <div className="App">
       <GlobalStyle />
       <header className="App-header">
         {!token ? (
           <Login />
         ) : (
           <>
             <StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton>
             <Router>
               <Switch>
                 <Route path="/top-artists">
                   <h1>Top Artists</h1>
                 </Route>
                 <Route path="/top-tracks">
                   <h1>Top Tracks</h1>
                 </Route>
                 <Route path="/playlists/:id">
                   <h1>Playlist</h1>
                 </Route>
                 <Route path="/playlists">
                   <h1>Playlists</h1>
                 </Route>
                 <Route path="/">
                   <Profile />
                 </Route>
               </Switch>
             </Router>
           </>
         )}
       </header>
     </div>
   );
}
export default App;
