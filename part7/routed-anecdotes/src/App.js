import React, { useState } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useParams,
} from "react-router-dom";
import { useField } from "./hooks/useField";
import Footer from "./components/Footer";
import About from "./components/About";

const Menu = (props) => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <>
      <Link to="/anecdotes" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
      <p>{props.notification}</p>
    </>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const SingleAnecdote = ({ anecdote }) => {
  console.log("Anecs", anecdote);
  const id = useParams().id;
  console.log(anecdote, "id:", id);
  return (
    <>
      <h2>{anecdote.content}</h2>
      <p>Votes: {anecdote.votes}</p>
      <p>
        For more info see: <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </>
  );
};

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const history = useHistory();

  const handleReset = (e) => {
    e.preventDefault()
    content.resetValue()
    author.resetValue()
    info.resetValue()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    props.setNotification(`You created a anecdote "${content.value}"!`);
    setTimeout(() => {
      props.setNotification("");
    }, 10000);
    history.push("/");
  };

  const getAttrForBtn = ({resetValue, ...others}) => others   //helper function that returns only "others" which is all atributes except reset (that atrr result in err in console). As a parametr you have to pass a hook, that hook return values and functions, and you have to separete those

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"  {...getAttrForBtn(content)}
          />
        </div>
        <div>
          author
          <input name="author"  {...getAttrForBtn(author)}/>
        </div>
        <div>
          url for more info
          <input name="info" {...getAttrForBtn(info)} />
        </div>
        <button type = 'submit'>create</button>
        <button type = 'button' onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

const App = () => {
  const [notification, setNotification] = useState("");
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const match = useRouteMatch("/anecdotes/:id");
  console.log("match:", match);
  const anecdote = match
    ? anecdotes.find((a) => a.id === match.params.id)
    : null;

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu
        anecdotes={anecdotes}
        addNew={addNew}
        setNotification={setNotification}
        notification={notification}
      />
        <Switch>
        <Route path="/create">
          <CreateNew
            addNew={addNew}
            setNotification={setNotification}
          />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/anecdotes/:id">
          <SingleAnecdote anecdote={anecdote} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
