const baseUrl = "http://localhost:3003";
const recursiveClick = (target, clicks) => {
  if (clicks === 0) return;
  target.click().then(() => {
    recursiveClick(target, clicks - 1);
  });
};

Cypress.Commands.add("addUser", (user) => {
  cy.request("POST", `${baseUrl}/api/users`, user);
});
Cypress.Commands.add("resetDB", (user) => {
  cy.request("POST", `${baseUrl}/api/testing/reset`);
  cy.addUser(user);
  cy.visit("http://localhost:3000");
});
Cypress.Commands.add("login", (userCredentials) => {
  cy.request("POST", `${baseUrl}/api/login`, userCredentials).then(
    (response) => {
      localStorage.setItem("user", JSON.stringify(response.body));
      cy.visit("http://localhost:3000");
    }
  );
});
Cypress.Commands.add("addBlog", ({ title, author, url }) => {
  cy.contains("New Blog").click();
  cy.get(".addBlog .title").type(title);
  cy.get(".addBlog .author").type(author);
  cy.get(".addBlog .url").type(url);
  cy.get(".create").click();
  cy.get("html").should("contain", title).and("contain", author);
  cy.get(".hide").eq(0).click();
});

describe("Blog app", function () {
  beforeEach(function () {
    cy.resetDB({
      name: "test",
      username: "test",
      password: "test",
    });
  });

  it("Login form is shown", function () {
    cy.contains("Login").click();
  });
  describe("Login", function () {
    /* beforeEach(function () {
      localStorage.removeItem("user");
    });*/
    it("succeeds with correct credentials", function () {
      cy.get(".username").type("test");
      cy.get(".password").type("test");
      cy.contains("Login").click();
      cy.contains("test logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get(".username").type("wrongusername");
      cy.get(".password").type("wrongpassword");
      cy.contains("Login").click();
      cy.contains("Wrong username or password");
    });
  });
  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "test",
        password: "test",
      });
    });

    it("A blog can be created", function () {
      cy.addBlog({
        title: "test title",
        author: "test author",
        url: "test url",
      });
    });
    it("The user can like a blog", function () {
      cy.addBlog({
        title: "test title",
        author: "test author",
        url: "test url",
      });
      cy.get(".blog").eq(0).contains("View").click();
      cy.contains("likes: 0");
      cy.get(".blog").eq(0).get(".like").click();
      cy.contains("likes: 1");
    });
    it("The user who created a blog can delete it", function () {
      cy.addBlog({
        title: "test title",
        author: "test author",
        url: "test url",
      });
      cy.get(".blog").eq(0).contains("View").click();
      cy.get(".blog").eq(0).get(".remove").click();
      cy.get("html").should("not.contain", "test title test author");
    });
    it("Users cannot delete blogs created by other users", function () {
      cy.addBlog({
        title: "test title",
        author: "test author",
        url: "test url",
      });
      cy.addUser({
        name: "anotherUser",
        username: "anotherUser",
        password: "anotherUser",
      });
      cy.login({
        username: "anotherUser",
        password: "anotherUser",
      });
      cy.visit("http://localhost:3000");
      cy.get(".blog").eq(0).contains("View").click();
      cy.get(".blog").eq(0).should("not.have.class", ".remove");
    });

    it.only("Blogs are ranked by number of likes", function () {
      cy.addBlog({
        title: "test title",
        author: "test author",
        url: "test url",
      });
      cy.addBlog({
        title: "test1 title",
        author: "test1 author",
        url: "test1 url",
      });
      cy.addBlog({
        title: "test2 title",
        author: "test2 author",
        url: "test2 url",
      });

      cy.contains("test title").find(".view").click();
      for (let i = 0; i < 15; ++i) {
        cy.contains("test title")
          .find(".like")
          .click()
          .parent()
          .contains(i + 1);
      }
      cy.contains("test1 title").find(".view").click();
      for (let i = 0; i < 10; ++i) {
        cy.contains("test1 title")
          .find(".like")
          .click()
          .parent()
          .contains(i + 1);
      }

      cy.contains("test2 title").find(".view").click();
      for (let i = 0; i < 20; ++i) {
        cy.contains("test2 title")
          .find(".like")
          .click()
          .parent()
          .contains(i + 1);
      }

      cy.get(".blog").eq(0).contains("test2 title");
      cy.get(".blog").eq(1).contains("test title");
      cy.get(".blog").eq(2).contains("test1 title");
    });
  });
});
