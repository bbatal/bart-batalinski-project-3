import { useAuthValue } from '../AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebaseSetup'

// styling
import styled from 'styled-components';

function Profile() {
  const { currentUser } = useAuthValue()
  
  return (
    <Div className='profile'>
      <h3>Welcome {currentUser?.email}</h3>
      <Button onClick={() => signOut(auth)}>Sign Out</Button>
    </Div>
  )
}

const Div = styled.div`
  display: flex;
  position: absolute;
  left: 20px;
  top: 20px;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
`

export default Profile