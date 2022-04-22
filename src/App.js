import Form from './components/form/Form'
import List from './components/list/List'
import ApiUrl from './components/apiUrl/ApiUrl'
import './App.scss'

function App() {

  return (
    <div className="App">
      <ApiUrl />
      <div className='flex'>
        <Form />
        <List />
      </div>
    </div>
  );
}

export default App;
