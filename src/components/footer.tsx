import * as React from 'react';

export interface FooterProps {
  icp: string;
}

export class Footer extends React.Component<FooterProps, {}> {
  render() {
    const imgStyle = {
      borderWidth: 0
    };
    return <div>
      <footer className='left'>
        <div>© {new Date().getFullYear()} iannar.com</div>
        <div>{this.props.icp}</div>
      </footer>
      <footer className='right'>
        <a rel='license' href='http://creativecommons.org/licenses/by-nc-sa/4.0/'>
          <img alt='Creative Commons License' style={imgStyle} src='/assets/images/cc-by-nc-sa-4.0-88x31.png' />
        </a>
      </footer>
    </div>;
  }
}
