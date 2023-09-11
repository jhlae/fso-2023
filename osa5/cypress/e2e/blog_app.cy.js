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
