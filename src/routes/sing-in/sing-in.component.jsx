import SignUpForm from '../../components/category-item/sing-up/sing-up-form.component';
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>SignIn Page</h1>
      <button onClick={logGoogleUser}> SingIn with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
