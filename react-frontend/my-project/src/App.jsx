import Header from "./components/Header"
import Home from "./components/Home"
import './App.css';

export default function App() {
  return (
    <h1 className="font-serif text-center  ">
      <Header />
      <Home />
      Hello world!
    </h1>
  )
}