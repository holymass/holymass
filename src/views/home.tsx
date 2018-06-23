import * as React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Header from '../components/header';
import Footer from '../components/footer';
import MassContent from '../components/mass/content';
import * as mass from '../../data/mass.json';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <MassContent massList={mass} />
        <Footer />
      </div>
    );
  }
}
