import * as React from 'react';

export interface FooterProps {
  icp: string;
}

export default class Footer extends React.Component<FooterProps, {}> {
  render() {
    const imgStyle = {
      borderWidth: 0
    };
    return (
      <footer className='footer'>
        <div className='container'>
          <div className='left'>
            <div>&copy; {new Date().getFullYear()} iannar.com</div>
            <div>{this.props.icp}</div>
          </div>
          <div className='right'>
            <a rel='license' href='http://creativecommons.org/licenses/by-nc-sa/4.0/'>
              <img alt='Creative Commons License' style={imgStyle} src='/assets/images/cc-by-nc-sa-4.0-88x31.png' />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
