import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import { act } from 'react-dom/test-utils'
import BlogForm from './BlogForm'


describe('<BlogForm />', () => {


  const mockHandler = jest.fn()
  const mockMakeMessage = jest.fn()

  const blog = {
    title: 'React is good',
    author: 'Pavel Test Author',
    url: 'wwww.pauli123.com',
    likes: 125,
    user: {
      username: 'TestUsername',
      name: 'TestName',
      id: '5f8abcccea9e0e2f2876cd87'
    },
    id: '5f8afc1d209c23270053b70d',
  }

  const user = {
    username: 'PauliCZ44',
    name: 'Pavel Happy',
    id: '5f8af3a92fcbf10adc70fc22'
  }

  let component

  beforeEach(() => {
    act(() => {
      component = render (
        <BlogForm blog={blog}  user={user} blogServiceCreate={mockHandler}  makeMessage={mockMakeMessage}/>
      )
    })
  })

  test('The form calls the event handler it received as props with the right details when a new blog is created.', () => {

    //component.debug()

    const title = component.container.querySelector('#inputTitle')
    const author = component.container.querySelector('#inputAuthor')
    const url = component.container.querySelector('#inputURL')
    const form = component.container.querySelector('form')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()
    expect(form).toBeDefined()

    fireEvent.change(title, {
      target: { value: blog.title }
    })

    fireEvent.change(author, {
      target: { value: blog.author }
    })

    fireEvent.change(url, {
      target: { value: blog.url }
    })

    fireEvent.submit(form)
    //const button = component.getByText('Save')
    //fireEvent.click(button)    //show Details
    /* EXAMLE */
    // The first argument of the second call to the function was 1
    //expect(mockCallback.mock.calls[1][0]).toBe(1);

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('React is good')
    expect(mockHandler.mock.calls[0][0].author).toBe('Pavel Test Author')
    expect(mockHandler.mock.calls[0][0].url).toBe( 'wwww.pauli123.com')

  })

})