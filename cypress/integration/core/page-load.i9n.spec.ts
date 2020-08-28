describe("Launch page", () => {
    it("loads", () => {
        cy.visit('http://localhost:19006/')
            .then(() => {
                console.log("Waiting 3 secs for logo to load!");
                cy.wait(3000);

                cy.document().toMatchImageSnapshot();
            });
    });
});
