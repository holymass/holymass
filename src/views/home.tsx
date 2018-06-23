import * as React from 'react';
import Footer from '../components/footer';

export interface HomeProps {
  username: string;
}

export default class Home extends React.Component<HomeProps, {}> {
  render() {
    return (
      <div>
        <div>
          home
        </div>
        <Footer icp='苏ICP备14030758号' />
      </div>
    );
  }
}
