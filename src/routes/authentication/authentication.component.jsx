import SignInForm from '../../components/sign-in/sign-in-form.component';
import SignUpFrom from '../../components/sing-up/sing-up-form.component';
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import './authentication.styles.scss';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpFrom />
    </div>
  );
};

export default SignIn;
