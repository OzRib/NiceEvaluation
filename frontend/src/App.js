import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, HashRouter } from 'react-router-dom';
import * as Pages from './pages';

function App() {
  let Routes = []
  for(const x in Pages){
    Routes.push(Pages[x])
  }

  return (
    <div className="flexColumn">
      <HashRouter>
        {Routes.map((Obj, key)=>(
          <Route key={key} exact path={
            Obj.name === 'Login' ? '/': '/'+Obj.name
          } component={Obj}/>
        ))}
      </HashRouter>
    </div>
  );
}

export default App;
