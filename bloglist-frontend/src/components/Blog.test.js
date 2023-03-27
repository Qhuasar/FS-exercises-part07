import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("Blog tests", () => {
  const testBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 47,
    user: {
      name: "Uncle Bob",
    },
  }

  test("displays title and author", async () => {
    const { container } = render(<Blog blog={testBlog} />)
    const div = container.querySelector(".blog-cont")
    expect(div).toHaveTextContent("First class tests")
    expect(div).toHaveTextContent("Robert C. Martin")
  })

  test("doesn't display blog-info", async () => {
    const { container } = render(<Blog blog={testBlog} />)
    const div = container.querySelector(".togglable-cont")
    expect(div).toHaveStyle({ display: "none" })
  })

  test("display blog info after button click", async () => {
    const { container } = render(<Blog blog={testBlog} />)
    const div = container.querySelector(".togglable-cont")
    expect(div).toHaveStyle({ display: "none" })

    const button = screen.getByText("more info")
    userEvent.click(button)

    screen.debug(div)
    expect(div).toHaveStyle({ display: "block" })

    expect(div).toHaveTextContent(
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
    )
    expect(div).toHaveTextContent("47")
    expect(div).toHaveTextContent("Uncle Bob")
  })

  test("cicking button twice calls handler twice", async () => {
    const { container } = render(<Blog blog={testBlog} />)
    const div = container.querySelector(".togglable-cont")
    expect(div).toHaveStyle({ display: "none" })

    const button = screen.getByText("like")
    expect(div).toHaveTextContent("47")
    userEvent.click(button)
    screen.debug(div)
    expect(div).toHaveTextContent("48")
    userEvent.click(button)
    expect(div).toHaveTextContent("49")
  })
})

describe("blogForms tests", () => {

})