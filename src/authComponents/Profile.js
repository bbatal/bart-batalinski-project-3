import { useAuthValue } from '../AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebaseSetup'
import { trimEmail } from '../utils';

// styling
import styled from 'styled-components';

function Profile() {
  const { currentUser } = useAuthValue();

  return (
    <Div className='profile'>
      <h2>Welcome</h2>
      <h3> {currentUser?.email === 'bartbatalinski@gmail.com' ? 'Guest' : trimEmail(currentUser?.email)}</h3>
      <Button onClick={() => signOut(auth)}>Sign Out</Button>
    </Div>
  )
}

const Div = styled.div`
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  display: flex;
  background-color: rgb(249,249,249);
  padding: 2em;
  min-width: 200px;
  position: absolute;
  top: 0px;
`;

const Button = styled.button`
  padding: 0.3em 1em;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid black;
  color: black;
  text-transform: uppercase;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: black;
    color: white;
  }
`;


export default Profile