describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/tests/reset");
    const user = {
      name: "Mr. Mongo",
      username: "mrmongo",
      password: "secret",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input[name=Username]").type("mrmongo");
      cy.get("input[name=Password]").type("secret");
      cy.get("button[type=submit]").click();
      cy.contains("Mr. Mongo logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input[name=Username]").type("mrm");
      cy.get("input[name=Password").type("wrongpwd");
      cy.get("button[type=submit]").click();
      cy.get(".error").should("contain", "Wrong credentials");
    });
  });
});

describe("When logged in", function () {
  beforeEach(function () {
    cy.login({
      username: "mrmongo",
      password: "secret",
    });
  });

  it("A blog can be created", function () {
    cy.createBlog({
      title: "A test blog post created by a testing tool",
      author: "Cypress",
      url: "https://google.com",
    });
    cy.visit("http://localhost:3000/");
    cy.contains("A test blog post created by a testing tool");
  });

  it("A blog can be liked", function () {
    cy.createBlog({
      title: "A second blog post created by a testing tool",
      author: "Cypress",
      url: "https://google.com/second",
    });
    cy.contains("A second blog post created by a testing tool")
      .parent()
      .find("button")
      .click();
    cy.get("#like-btn").click();
  });

  it("A blog can be deleted", function () {
    cy.contains("A second blog post created by a testing tool")
      .parent()
      .find("button")
      .click();
    cy.get("#delete-btn").click();
    cy.get("html").should("contain", "Blog was removed");
  });

  it("The blogs are ordered by the amount of likes, from highest count to lowest", function () {
    cy.createBlog({
      title: "1: Lorem Ipsum",
      author: "Cypress",
      url: "https://www.google.com/search?q=lorem+ipsum",
    });
    cy.createBlog({
      title: "2: Dolor Sit Amet",
      author: "Cypress",
      url: "https://www.google.com/search?q=dolor+sit+amet",
    });
    cy.createBlog({
      title: "3: Consectetur Adipiscing Elit",
      author: "Cypress",
      url: "https://www.google.com/search?q=consectetur+adipiscing+elit",
    });

    // https://docs.cypress.io/api/commands/wait
    // wait 1s between the like clicks

    cy.contains("Consectetur Adipiscing Elit").parent().find("button").click(); // Open toggle menu
    cy.get("#like-btn")
      .click()
      .wait(1000)
      .click()
      .wait(1000)
      .click()
      .wait(1000)
      .click()
      .wait(1000); // like count = 4
    cy.contains("Consectetur Adipiscing Elit").parent().find("button").click(); // Close toggle menu

    cy.contains("Lorem Ipsum").parent().find("button").click(); // Open toggle menu
    cy.get("#like-btn").click().wait(1000).click(); // like count = 2
    cy.contains("Lorem Ipsum").parent().find("button").click(); // Close toggle menu

    cy.contains("Dolor Sit Amet").parent().find("button").click(); // Open toggle menu
    cy.get("#like-btn").click().wait(1000); // like count = 1
    cy.contains("Dolor Sit Amet").parent().find("button").click(); // Close toggle menu

    cy.get(".blog-details")
      .eq(0)
      .should("contain", "Consectetur Adipiscing Elit");
    cy.get(".blog-details").eq(1).should("contain", "Lorem Ipsum");
    cy.get(".blog-details").eq(2).should("contain", "Dolor Sit Amet");
  });
});
