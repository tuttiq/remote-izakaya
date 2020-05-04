import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateEstablishment from '../establishment/CreateEstablishment';
import Establishment from '../establishment/Establishment';
import TmpEstablishment from '../TmpEstablishment';
import Footer from '../../components/Footer';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path='/' component={CreateEstablishment} exact />
        <Route path='/establishment/:id' component={Establishment} />
        <Route path='/videochat' component={TmpEstablishment} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </div>
  );
}
