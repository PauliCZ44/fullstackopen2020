import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import { act } from 'react-dom/test-utils'
import Blog from './Blog'

describe('<BLog />', () => {

  const mockHandler = jest.fn()

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
        <Blog blog={blog}  user={user} blogServiceUpdate={mockHandler} />
      )
    })
  })

  test ('Renders title and author', () => {
  // Method 1
    expect(component.container).toHaveTextContent(
      'React is good'
    )
    expect(component.container).toHaveTextContent(
      'Pavel Test Author'
    )

    // Method 2
    const element = component.getByText(
      'React is good'
    )
    const element2 = component.getByText(
      'by Pavel Test Author'
    )
    expect(element).toBeDefined()
    expect(element2).toBeDefined()

    // Method 3
    const div = component.container.querySelector('.blogHeader')

    //console.log(prettyDOM(testText))
    expect(div).toHaveTextContent(
      'React is good'
    )
    expect(div).toHaveTextContent(
      'by Pavel Test Author'
    )
  })


  test ('Does NOT renders URL or likes in default state', () => {

    // Method 1
    expect(component.container).not.toHaveTextContent(
      'wwww.pauli123.com'
    )
    expect(component.container).not.toHaveTextContent(
      '125'
    )

    // Method 3
    const div = component.container.querySelector('t_detailsDiv')
    //const testText = component.container.querySelector('.text-muted')
    //console.log(prettyDOM(testText))
    expect(div).toBe(null)
  })


  test ('After click on details btn renders URL or likes', () => {
  //get btn and click it
    const button = component.getByText('Show details')
    act(() => {
      fireEvent.click(button)
    })
    // Method 1
    expect(component.container).toHaveTextContent(
      'wwww.pauli123.com'
    )


    // Method 3
    const div = component.container.querySelector('t_detailsDiv')
    //const testText = component.container.querySelector('.text-muted')
    //console.log(prettyDOM(testText))
    expect(div).toBeDefined()
  })

  test ('When like button is clicked twice only 1 call is sended', () => {
    jest.useFakeTimers()
    const button = component.getByText('Show details')
    fireEvent.click(button)    //show Details

    const likeButton = component.container.querySelector('.t_LikeBtn')
    //console.log(prettyDOM(likeButton))
    act(() => {
      fireEvent.click(likeButton)
    })
    jest.runAllTimers()   //to bypass the like spam protection
    // like blog twice is not allowed in short period of time
    act(() => {
      fireEvent.click(likeButton)
    })
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})