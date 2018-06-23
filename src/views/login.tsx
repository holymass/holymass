import * as React from 'react';
import Footer from '../components/footer';

export interface LoginProps {
  username: string;
}

export default class Login extends React.Component<LoginProps, {}> {
  render() {
    return (
      <div>
        <div>
          login
        </div>
        <Footer icp='苏ICP备14030758号' />
      </div>
    );
  }
}
