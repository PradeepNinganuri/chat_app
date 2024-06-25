import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword ,signOut, signInWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc,getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log("got user",user);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid)
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

const updateUserData=async (userId)=>{
  const docRef=doc(db,'users',userId);//we get the reference of the document
  const docSnap=await getDoc(docRef);

  if(docSnap.exists()){
    let data=docSnap.data();
    setUser({...user,username:data.username,profileUrl:data.profileUrl,userId:data.userId})//we update the user
  }
}

  const login = async (email, password) => {
    // Implement login logic here
    try{
const response=await signInWithEmailAndPassword(auth,email,password);
return {success:true}
    }catch(e){
      let msg=e.message;
      if(msg.includes('(auth/invalid-email)')) msg='Invalid email'
      return { success: false, msg };
    }
  };

  const logout = async () => {
    // Implement logout logic here
    try{
await signOut(auth);
return {success:true}

    }catch(e){
return{success:false,msg:e.message,error:e};
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('response.user', response?.user);
     
      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid
      });
      return { success: true, data: response?.user };
    } catch (e) {
      let msg=e.message;
      if(msg.includes('(auth/invalid-email)')) msg='Invalid email'
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return value;
};
