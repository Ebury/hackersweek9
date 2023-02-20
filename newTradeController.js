({
    init: function (component) {
        var getNewTradeAction = component.get('c.getNewTrade');

        getNewTradeAction.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                var newTrade = response.getReturnValue();
                component.set('v.trade', newTrade);

            } else {
                console.log('[NewTradeController.js - init] ERROR: ',
                    response.getError()[0].message);
                console.log(response);

                var resultsToast = $A.get('e.force:showToast');
                resultsToast.setParams({
                    'type': 'error',
                    'title': 'Error',
                    'message': 'Ups! Something has gone wrong.'
                });
                resultsToast.fire();
            }
        });

        $A.enqueueAction(getNewTradeAction);
    },

    onChangeCurrency: function (component) {
        var trade = component.get('v.trade');
        var calculateRate = component.get('c.calculateRate');
        calculateRate.setParams({
                'trade': trade
            }
        );

        calculateRate.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                var newTrade = response.getReturnValue();
                component.set('v.trade', newTrade);

            } else {
                console.log('[NewTradeController.js - init] ERROR: ',
                    response.getError()[0].message);
                console.log(response);

                var resultsToast = $A.get('e.force:showToast');
                resultsToast.setParams({
                    'type': 'error',
                    'title': 'Error',
                    'message': 'Ups! Something has gone wrong.'
                });
                resultsToast.fire();
            }
        });

        $A.enqueueAction(calculateRate);
    },

    onCreateTrade: function (component) {
        var trade = component.get('v.trade');
        var createTrade = component.get('c.createTrade');
        createTrade.setParams({
                'trade': trade
            }
        );

        createTrade.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                var success = response.getReturnValue();
                if (success) {
                    var resultsToast = $A.get('e.force:showToast');
                    resultsToast.setParams({
                        'type': 'success',
                        'title': 'Success!',
                        'message': 'Trade created succesfully'
                    });
                    resultsToast.fire();
                } else {
                    var resultsToast = $A.get('e.force:showToast');
                    resultsToast.setParams({
                        'type': 'error',
                        'title': 'Error',
                        'message': 'Ups! Something has gone wrong.'
                    });
                    resultsToast.fire();
                }

            } else {
                console.log('[NewTradeController.js - init] ERROR: ',
                    response.getError()[0].message);
                console.log(response);

                var resultsToast = $A.get('e.force:showToast');
                resultsToast.setParams({
                    'type': 'error',
                    'title': 'Error',
                    'message': 'Ups! Something has gone wrong.'
                });
                resultsToast.fire();
            }
        });

        $A.enqueueAction(createTrade);
    },

    handleCancel: function(cmp, event, helper) {
        var navService = cmp.find("navService");

        var pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Trade__c',
                actionName: 'list'
            },
            state: {
                filterName: "All"
            }
        };

        event.preventDefault();
        navService.navigate(pageReference);
    }
})