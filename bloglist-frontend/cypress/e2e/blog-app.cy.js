describe("Blog App", () => {
  const testUser = {
    username: "root",
    password: "root123",
  }
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    cy.createUser(testUser)
  })
  it("loads frontPage", function () {
    cy.visit("")
    cy.contains("Login")
  })

  describe("Login", function () {
    it("login fails", function () {
      cy.visit("")
      cy.get("#username").type("root")
      cy.get("#password").type("root")
      cy.get("button").click()
      cy.contains("Wrong credentials")
      cy.get("#error-notf").should(
        "have.css",
        "background-color",
        "rgb(240, 65, 65)"
      )
    })
    it("login suceeds", function () {
      cy.visit("")
      cy.get("#username").type("root")
      cy.get("#password").type("root123")
      cy.get("button").click()
      cy.contains("blogs")
    })
  })
  describe("after login", function () {
    const testBlog = {
      title: "There are many test blogs but this one is mine!",
      author: "Me",
      url: "http://thislinkisonlyaviabletosubs.com",
    }
    const testBlog2 = {
      title: "Second most likes",
      author: "Me",
      url: "http://thislinkisonlyaviabletosubs.com",
    }
    beforeEach(function () {
      cy.login(testUser)
      cy.createBlog(testBlog)
    })

    it(" blogs are displayed", function () {
      cy.contains("blogs")
    })

    it("A blog can be created", function () {
      cy.get("#toggle-btn").click()
      cy.get("#title-inpt").type("Cypress is pertty cool and here is why!")
      cy.get("#url-inpt").type("http://supersecretwebsite.com")
      cy.get("#author-inpt").type("John Clean")
      cy.get("#create-blog-btn").click()
      cy.get("#green-notf")
        .should(
          "contain",
          "Cypress is pertty cool and here is why! by John Clean as been sucessfuly added"
        )
        .and("have.css", "background-color", "rgb(65, 240, 100)")
    })

    it("able to like a blog", function () {
      cy.visit("")
      cy.contains("There are many test blogs but this one is mine!")
        .contains("more info")
        .click()
      cy.contains("There are many test blogs but this one is mine!")
        .contains("like")
        .click()
      cy.contains("There are many test blogs but this one is mine!").contains(
        "1"
      )
    })

    it("able to remove blog", function () {
      cy.visit("")
      cy.contains("There are many test blogs but this one is mine!")
        .contains("more info")
        .click()
      cy.contains("There are many test blogs but this one is mine!")
        .contains("remove")
        .click()
      cy.contains(
        "There are many test blogs but this one is mine! John Clean"
      ).should("not.exist")
    })

    it.only("show blogs by the correct order(most likes)", function () {
      cy.createBlog(testBlog2)
      cy.visit("")
      cy.contains("There are many test blogs but this one is mine!")
        .contains("more info")
        .click()
      for (let i = 0; i < 10; i++) {
        cy.contains("There are many test blogs but this one is mine!")
          .contains("like")
          .click()
      }
      cy.get(".blog-cont")
        .eq(0)
        .should("contain", "There are many test blogs but this one is mine!")
      cy.get(".blog-cont").eq(1).should("contain", "Second most likes")
    })
  })
})
