describe("Happy case exhaustive", () => {
    beforeEach(() => {
        cy.visit('http://localhost:19006/')
            .then(() => {
                cy.wait(2000);
                cy.document().toMatchImageSnapshot({
                    // Does not do what it is supposed to do.
                    threshold: 0.003
                });
            });
    });

    it("runs", () => {
        // #1: Click Let's Report btn.
        cy.get('[data-i9n-btn="Report"]').click();
        cy.wait(2000);
        cy.document().toMatchImageSnapshot();

        // #2: Click No btn for not driving.
        cy.get('[data-i9n-btn="DriverCheck.No"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();

        // #3: Enter details for License check and click Next.
        cy.get('[data-i9n-input="LicenseCheck.Plate"]')
            .type('FAKE1234').should('have.value', 'FAKE1234');
        cy.get('[data-i9n-picker="LicenseCheck.State"]')
            .find('select').eq(0)
            .select('Oregon').should('have.value', 'OR');
        cy.get('[data-i9n-btn="LicenseCheck.Next"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();
    
        // #4: Click No btn for seeing incident in past 15 mins.
        cy.get('[data-i9n-btn="TimeCheck.No"]').click();
        cy.wait(1000);
        cy.get('[data-i9n-capture="true"]').toMatchImageSnapshot();

        // #5: Set the time and click Next btn.
        cy.get('[data-i9n-picker="TimeSetPast.Date"]')
            .find('select').eq(0)
            .select('28').should('have.value', '28');
        cy.get('[data-i9n-picker="TimeSetPast.Date"]')
            .find('select').eq(1)
            .select('Aug').should('have.value', '8');
        cy.get('[data-i9n-picker="TimeSetPast.Date"]')
            .find('select').eq(2)
            .select('2020').should('have.value', '2020');
        cy.get('[data-i9n-picker="TimeSetPast.Time"]')
            .find('select').eq(0)
            .select('3').should('have.value', '3');
        cy.get('[data-i9n-picker="TimeSetPast.Time"]')
            .find('select').eq(1)
            .select('00').should('have.value', '0');
        cy.get('[data-i9n-btn="TimeSetPast.Next"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();

        // #6: Click 1 for occupancy check.
        cy.get('[data-i9n-btn="OccupancyCheck.One"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();

        // #7: Set highway details and click Next btn.
        cy.get('[data-i9n-picker="HighwayCheck.Highway"]')
            .find('select')
            .select('I-405 Southbound').should('have.value', 'I-405SB');
        cy.get('[data-i9n-input="HighwayCheck.Location"]')
            .type('Exit 420').should('have.value', 'Exit 420');
        cy.get('[data-i9n-btn="HighwayCheck.RampYes"]').click();
        cy.get('[data-i9n-btn="HighwayCheck.Next"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();

        // #8: Route to make and model of car.
        cy.get('[data-i9n-btn="DolPreCheck.Yes"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();

        // #9: Enter make, model, color and do Next.
        cy.get('[data-i9n-input="VehicleDetailsCheck.Make"]')
            .type('FAKE MAKE').should('have.value', 'FAKE MAKE');
        cy.get('[data-i9n-input="VehicleDetailsCheck.Model"]')
            .type('FAKE MODEL').should('have.value', 'FAKE MODEL');
        cy.get('[data-i9n-input="VehicleDetailsCheck.Color"]')
            .type('FAKE COLOR').should('have.value', 'FAKE COLOR');        
        cy.get('[data-i9n-btn="VehicleDetailsCheck.Next"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();

        // #10: Click Yes for comments.
        cy.get('[data-i9n-btn="DolPreCheckComments.Yes"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();

        // #11: Enter comments and finish report.
        cy.get('[data-i9n-input="CommentsCheck.Comments"]')
            .focus().type('FAKE COMMENT').should('have.value', 'FAKE COMMENT');        
        cy.get('[data-i9n-btn="CommentsCheck.FinishReport"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();

        // #12: For sure Finish the report.
        cy.get('[data-i9n-btn="DolPreLaunch.FinishReport"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();

        // #13: Skip to the final Success page.
        cy.get('[data-i9n-btn="DolForm.Skip"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();

        // #14: Go back to start
        cy.get('[data-i9n-btn="FinalSuccess.BackToStart"]').click();
        cy.wait(1000);
        cy.document().toMatchImageSnapshot();
    });
});
