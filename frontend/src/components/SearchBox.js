import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const [keyword, setKeyword] = React.useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push("/");
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control type="text" name="q" onChange={(e) => setKeyword(e.target.value)} placeholder="Search Products..." className='mr-sm-2 ml-sm-5'>

      </Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
    </Form>
  )
}

export default SearchBox;
