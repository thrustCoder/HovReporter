describe("Launch page", () => {
    // beforeEach(() => {
    //     cy.visit("http://localhost:19006/");
    // });

    it("loads", () => {
        expect(true).to.equal(true);
        cy.visit('http://localhost:19006/')
            .then(() => {
                cy.document().toMatchImageSnapshot({
                    "imageConfig": {
                      "createDiffImage": true,                // Should a "diff image" be created, can be disabled for performance
                      "threshold": 0.01,                      // Amount in pixels or percentage before snapshot image is invalid
                      "thresholdType": "percent",             // Can be either "pixel" or "percent"
                    },
                    // "name": "custom image name",              // Naming resulting image file with a custom name rather than concatenating test titles
                    "separator": "-",  // Naming resulting image file with a custom separator rather than using the default ` #`
                  });
            });
    });
});
